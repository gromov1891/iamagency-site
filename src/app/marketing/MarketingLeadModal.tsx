"use client";

import { FormEvent, useEffect, useState } from "react";
import styles from "./marketing-lead-modal.module.css";

const OPEN_LABELS = ["оставить заявку", "обсудить мой проект ↘", "обсудить мой проект"];

export default function MarketingLeadModal() {
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const cleanups: Array<() => void> = [];
    const timer = setTimeout(() => {
      const elements = [...document.querySelectorAll<HTMLElement>("div,span")];

      elements.forEach((element) => {
        const text = element.textContent?.trim().toLocaleLowerCase("ru-RU");
        if (text === "консультация" && element.children.length === 0) {
          let button: HTMLElement | null = element;
          while (button?.parentElement && button.parentElement.textContent?.trim() === element.textContent?.trim()) {
            button = button.parentElement;
            if (button.style.position === "absolute" && parseFloat(button.style.width || "0") >= 200) break;
          }
          if (button) {
            button.classList.add("marketingConsultationHidden");
            button.style.display = "none";
          }
        }

        if (!text || !OPEN_LABELS.includes(text) || element.children.length > 1) return;
        const trigger = element.closest<HTMLElement>('div[style*="position:absolute"]') ?? element;
        trigger.style.cursor = "pointer";
        trigger.setAttribute("role", "button");
        trigger.setAttribute("tabindex", "0");
        trigger.setAttribute("aria-label", "Открыть форму заявки");
        const activate = () => setOpen(true);
        const onKey = (event: KeyboardEvent) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            activate();
          }
        };
        trigger.addEventListener("click", activate);
        trigger.addEventListener("keydown", onKey);
        cleanups.push(() => {
          trigger.removeEventListener("click", activate);
          trigger.removeEventListener("keydown", onKey);
        });
      });
    }, 250);

    return () => {
      clearTimeout(timer);
      cleanups.forEach((cleanup) => cleanup());
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
  };

  const close = () => {
    setOpen(false);
    setTimeout(() => setSent(false), 250);
  };

  return (
    <>
      <button className={styles.floatingButton} type="button" onClick={() => setOpen(true)}>
        Оставить заявку
      </button>
      {open ? (
        <div className={styles.backdrop} role="presentation" onMouseDown={(event) => event.target === event.currentTarget && close()}>
          <section className={styles.modal} role="dialog" aria-modal="true" aria-labelledby="marketing-form-title">
            <button className={styles.close} type="button" onClick={close} aria-label="Закрыть форму">×</button>
            {sent ? (
              <div className={styles.thanks}>
                <p>I AM AGENCY</p>
                <h2 id="marketing-form-title">Спасибо!</h2>
                <span>Мы свяжемся с вами в течение 15 минут</span>
                <button type="button" onClick={close}>Закрыть</button>
              </div>
            ) : (
              <form onSubmit={submit}>
                <p className={styles.brand}>I AM AGENCY</p>
                <h2 id="marketing-form-title">Свяжитесь<br />с нами</h2>
                <label>Имя<input name="name" autoComplete="name" required /></label>
                <label>Телефон<input name="phone" type="tel" autoComplete="tel" required /></label>
                <label>Сайт / соцсети проекта<input name="project" /></label>
                <label>Бюджет<input name="budget" /></label>
                <label className={styles.consent}>
                  <input name="consent" type="checkbox" required />
                  <span>
                    Я согласен с <a href="/privacy-consent" target="_blank">обработкой персональных данных</a>
                  </span>
                </label>
                <button className={styles.submit} type="submit">Отправить</button>
              </form>
            )}
          </section>
        </div>
      ) : null}
    </>
  );
}
