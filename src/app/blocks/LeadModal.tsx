"use client";

import { FormEvent, KeyboardEvent as ReactKeyboardEvent, useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import styles from "./lead-modal.module.css";
import { trackAnalyticsGoal } from "@/lib/analytics";

const normalizeText = (value: string | null | undefined) =>
  (value || "")
    .replace(/[↘→↓]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .toLocaleLowerCase("ru-RU");

const getLeadLabel = (element: HTMLElement) => element.textContent?.trim() || element.getAttribute("aria-label");

const isLeadLabel = (value: string | null | undefined) => {
  const text = normalizeText(value);
  return [
    /^оставить заявку(?: на обучение)?$/,
    /^получить (?:бесплатную )?консультацию$/,
    /^записаться(?: на (?:(?:бесплатную )?консультацию|обучение))?$/,
    /^узнать условия и цену$/,
    /^начать работу$/,
    /^обсудить (?:мой )?проект$/,
    /^получить скидку$/,
    /^купить тариф$/,
    /^заказать (?:услугу|консультацию|продвижение)$/,
  ].some((pattern) => pattern.test(text));
};

const TARIFF_NAMES: Record<string, string> = {
  dvizhenie: "ДВИЖЕНИЕ",
  proryv: "ПРОРЫВ",
  triumf: "ТРИУМФ",
};

function getLeadContext(label: string, pathname: string) {
  const tariffSlug = pathname.match(/^\/tarify\/([^/]+)/)?.[1] || "";
  const tariff = TARIFF_NAMES[tariffSlug] || "";
  if (tariff) return { kind: "tariff" as const, source: `Тариф · ${tariff} · ${label}`, tariff };
  if (isCourseLeadLabel(label, pathname)) return { kind: "course" as const, source: "Школа SMM · заявка на обучение", tariff: "" };
  if (pathname.startsWith("/marketing")) return { kind: "business" as const, source: `Маркетинг · ${label}`, tariff: "" };
  if (pathname.startsWith("/uslugi/")) return { kind: "business" as const, source: `Услуга · ${label}`, tariff: "" };
  return { kind: "business" as const, source: `Главная · ${label}`, tariff: "" };
}

const isCourseLeadLabel = (value: string | null | undefined, pathname: string) => {
  const text = normalizeText(value);
  return text.includes("обучение") || pathname === "/shkola-smm";
};

function resolveLeadTrigger(start: HTMLElement | null) {
  let current = start;
  let trigger: HTMLElement | null = null;

  while (current && current !== document.body) {
    if (isLeadLabel(getLeadLabel(current))) trigger = current;
    else if (trigger) break;
    current = current.parentElement;
  }

  return trigger;
}

function resolveExactTextTrigger(start: HTMLElement, expected: string) {
  let current: HTMLElement | null = start;
  let trigger: HTMLElement = start;

  while (current?.parentElement && normalizeText(current.parentElement.textContent) === expected) {
    trigger = current.parentElement;
    current = current.parentElement;
  }

  return trigger;
}

export default function LeadModal() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [source, setSource] = useState("Оставить заявку");
  const [kind, setKind] = useState<"business" | "course" | "tariff">("business");
  const [tariff, setTariff] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const modalRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const openModal = useCallback((label: string) => {
    const context = getLeadContext(label, pathname);
    previousFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setSource(context.source);
    setKind(context.kind);
    setTariff(context.tariff);
    setSent(false);
    setError("");
    setOpen(true);
  }, [pathname]);

  const closeModal = () => {
    setOpen(false);
    requestAnimationFrame(() => previousFocusRef.current?.focus());
  };

  useEffect(() => {
    let decorateTimer: ReturnType<typeof setTimeout> | undefined;

    const decorate = () => {
      const triggers = new Set<HTMLElement>();
      document.querySelectorAll<HTMLElement>("a,button,div,span").forEach((element) => {
        if (isLeadLabel(getLeadLabel(element))) {
          const trigger = resolveLeadTrigger(element);
          if (trigger) triggers.add(trigger);
        }

        if (pathname === "/marketing" && normalizeText(element.textContent) === "консультация") {
          resolveExactTextTrigger(element, "консультация").classList.add("marketingConsultationHidden");
        }
      });

      triggers.forEach((trigger) => {
        trigger.dataset.leadTrigger = "true";
        trigger.style.cursor = "pointer";
        if (!(trigger instanceof HTMLAnchorElement) && !(trigger instanceof HTMLButtonElement)) {
          trigger.setAttribute("role", "button");
          trigger.setAttribute("tabindex", "0");
        }
        if (!trigger.getAttribute("aria-label")) {
          trigger.setAttribute("aria-label", `${getLeadLabel(trigger)?.trim()}. Открыть форму заявки`);
        }
      });
    };

    const queueDecorate = () => {
      if (decorateTimer) clearTimeout(decorateTimer);
      decorateTimer = setTimeout(decorate, 80);
    };

    const activate = (target: EventTarget | null, event: MouseEvent | globalThis.KeyboardEvent) => {
      const element = target instanceof HTMLElement ? target : target instanceof Node ? target.parentElement : null;
      const trigger = resolveLeadTrigger(element);
      if (!trigger) return;
      event.preventDefault();
      event.stopPropagation();
      openModal(getLeadLabel(trigger)?.trim() || "Оставить заявку");
    };

    const onClick = (event: MouseEvent) => activate(event.target, event);
    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Enter" || event.key === " ") activate(event.target, event);
    };

    decorate();
    const observer = new MutationObserver(queueDecorate);
    observer.observe(document.body, { childList: true, subtree: true });
    document.addEventListener("click", onClick, true);
    document.addEventListener("keydown", onKeyDown, true);

    return () => {
      if (decorateTimer) clearTimeout(decorateTimer);
      observer.disconnect();
      document.removeEventListener("click", onClick, true);
      document.removeEventListener("keydown", onKeyDown, true);
    };
  }, [openModal, pathname]);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusTimer = setTimeout(() => nameRef.current?.focus(), 40);

    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeModal();
        return;
      }
      if (event.key !== "Tab" || !modalRef.current) return;

      const focusable = [...modalRef.current.querySelectorAll<HTMLElement>("a[href],button,input,select,textarea")].filter(
        (element) => !element.hasAttribute("disabled") && element.offsetParent !== null,
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      clearTimeout(focusTimer);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (sending) return;
    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form).entries());
    setSending(true);
    setError("");
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          kind,
          source,
          tariff,
          page: `${window.location.pathname}${window.location.search}`,
        }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || "Не удалось отправить заявку");
      form.reset();
      trackAnalyticsGoal("lead_sent", { kind, source, tariff: tariff || undefined });
      setSent(true);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Не удалось отправить заявку");
    } finally {
      setSending(false);
    }
  };

  const stopControlPropagation = (event: ReactKeyboardEvent<HTMLElement>) => event.stopPropagation();
  const isCourse = kind === "course";
  const isTariff = kind === "tariff";

  return (
    <>
      {pathname === "/marketing" ? (
        <button className={styles.floatingButton} type="button" onClick={() => openModal("Оставить заявку")}>
          Оставить заявку
        </button>
      ) : null}

      {open ? (
        <div
          className={styles.backdrop}
          role="presentation"
          onMouseDown={(event) => event.target === event.currentTarget && closeModal()}
        >
          <section
            ref={modalRef}
            className={`${styles.modal} ${isCourse ? styles.courseModal : ""} ${isTariff ? styles.tariffModal : ""}`}
            role="dialog"
            aria-modal="true"
            aria-labelledby="lead-form-title"
            onKeyDown={stopControlPropagation}
          >
            <button className={styles.close} type="button" onClick={closeModal} aria-label="Закрыть форму">
              ×
            </button>

            {sent ? (
              <div className={styles.thanks} aria-live="polite">
                <p>{isCourse ? "ШКОЛА SMM · I AM AGENCY" : isTariff ? `ТАРИФ ${tariff} · I AM AGENCY` : "I AM AGENCY"}</p>
                <h2 id="lead-form-title">Спасибо!</h2>
                <span>
                  {isCourse
                    ? "Мы свяжемся с вами и расскажем о ближайшем потоке курса"
                    : isTariff
                      ? `Тариф ${tariff} выбран. Менеджер уточнит детали и подготовит предложение`
                    : "Мы свяжемся с вами в течение 15 минут"}
                </span>
                <button type="button" onClick={closeModal}>Закрыть</button>
              </div>
            ) : isCourse ? (
              <form onSubmit={submit}>
                <p className={styles.brand}>ШКОЛА SMM · I AM AGENCY</p>
                <p className={styles.source}>Заявка на обучение</p>
                <h2 id="lead-form-title">Записаться<br />на курс</h2>
                <label>Имя<input ref={nameRef} name="name" autoComplete="name" required /></label>
                <label>Телефон<input name="phone" type="tel" autoComplete="tel" required /></label>
                <label>Telegram / соцсеть<input name="contact" autoComplete="url" /></label>
                <label>
                  Ваш уровень в SMM
                  <select name="experience" defaultValue="" required>
                    <option value="" disabled>Выберите вариант</option>
                    <option value="beginner">Начинаю с нуля</option>
                    <option value="basic">Есть базовый опыт</option>
                    <option value="specialist">Уже работаю в SMM</option>
                    <option value="business">Развиваю свой бизнес</option>
                  </select>
                </label>
                <label>
                  Что хотите получить от обучения?
                  <textarea name="goal" rows={2} />
                </label>
                <label className={styles.consent}>
                  <input name="consent" type="checkbox" required />
                  <span>
                    Я согласен с <a href="/privacy-consent" target="_blank">обработкой персональных данных</a>
                  </span>
                </label>
                <input className={styles.honeypot} name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
                {error ? <p className={styles.error} role="alert">{error}</p> : null}
                <button className={styles.submit} type="submit" disabled={sending}>
                  {sending ? "Отправляем..." : "Записаться на курс"}
                </button>
              </form>
            ) : (
              <form onSubmit={submit}>
                <p className={styles.brand}>I AM AGENCY</p>
                <p className={styles.source}>{source}</p>
                <h2 id="lead-form-title">{isTariff ? <>Вы выбрали<br />тариф</> : <>Свяжитесь<br />с нами</>}</h2>
                {isTariff ? (
                  <div className={styles.tariffChoice}>
                    <span>Выбранный тариф</span>
                    <strong>{tariff}</strong>
                  </div>
                ) : null}
                <label>Имя<input ref={nameRef} name="name" autoComplete="name" required /></label>
                <label>Телефон<input name="phone" type="tel" autoComplete="tel" required /></label>
                {isTariff ? <label>Telegram / удобный способ связи<input name="contact" /></label> : null}
                <label>Сайт / соцсети проекта<input name="project" autoComplete="url" /></label>
                {isTariff ? (
                  <label>Комментарий<textarea name="message" rows={2} placeholder="Расскажите коротко о проекте" /></label>
                ) : (
                  <label>Бюджет<input name="budget" inputMode="numeric" /></label>
                )}
                <label className={styles.consent}>
                  <input name="consent" type="checkbox" required />
                  <span>
                    Я согласен с <a href="/privacy-consent" target="_blank">обработкой персональных данных</a>
                  </span>
                </label>
                <input className={styles.honeypot} name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
                {error ? <p className={styles.error} role="alert">{error}</p> : null}
                <button className={styles.submit} type="submit" disabled={sending}>
                  {sending ? "Отправляем..." : isTariff ? `Заявка на тариф ${tariff}` : "Отправить"}
                </button>
              </form>
            )}
          </section>
        </div>
      ) : null}
    </>
  );
}
