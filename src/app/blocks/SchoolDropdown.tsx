"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./ServicesDropdown.module.css";

type Position = { left: number; top: number; width: number };

const isSchoolTrigger = (target: EventTarget | null) => {
  const anchor = target instanceof Element ? target.closest<HTMLAnchorElement>("a") : null;
  if (!anchor) return null;
  const label = anchor.textContent?.trim().toLocaleLowerCase("ru-RU");
  if (label !== "школа smm" && label !== "школа смм") return null;
  const rect = anchor.getBoundingClientRect();
  return rect.top >= -2 && rect.bottom <= 150 ? anchor : null;
};

export default function SchoolDropdown() {
  const [position, setPosition] = useState<Position | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancelClose = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = null;
  }, []);

  const closeSoon = useCallback(() => {
    cancelClose();
    closeTimer.current = setTimeout(() => setPosition(null), 180);
  }, [cancelClose]);

  useEffect(() => {
    const openFor = (anchor: HTMLAnchorElement) => {
      cancelClose();
      anchor.setAttribute("href", "/shkola-smm");
      const rect = anchor.getBoundingClientRect();
      const width = Math.min(510, window.innerWidth - 32);
      const left = Math.max(16, Math.min(window.innerWidth - width - 16, rect.left - 28));
      setPosition({ left, top: rect.bottom + 12, width });
    };

    const over = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      const anchor = isSchoolTrigger(event.target);
      if (anchor) openFor(anchor);
    };
    const out = (event: PointerEvent) => {
      if (isSchoolTrigger(event.target)) closeSoon();
    };
    const focus = (event: FocusEvent) => {
      const anchor = isSchoolTrigger(event.target);
      if (anchor) openFor(anchor);
    };
    const key = (event: KeyboardEvent) => event.key === "Escape" && setPosition(null);
    const close = () => setPosition(null);

    document.addEventListener("pointerover", over);
    document.addEventListener("pointerout", out);
    document.addEventListener("focusin", focus);
    document.addEventListener("keydown", key);
    window.addEventListener("resize", close);
    window.addEventListener("scroll", close, { passive: true });
    return () => {
      cancelClose();
      document.removeEventListener("pointerover", over);
      document.removeEventListener("pointerout", out);
      document.removeEventListener("focusin", focus);
      document.removeEventListener("keydown", key);
      window.removeEventListener("resize", close);
      window.removeEventListener("scroll", close);
    };
  }, [cancelClose, closeSoon]);

  if (!position) return null;

  return (
    <nav
      className={styles.menu}
      aria-label="Обучение в школе SMM"
      style={position}
      onPointerEnter={cancelClose}
      onPointerLeave={closeSoon}
    >
      <p className={styles.label}>Школа SMM</p>
      <div className={styles.list}>
        <Link href="/shkola-smm/prikladnoy-intensiv" onClick={() => setPosition(null)}>
          <span className={styles.number}>01</span>
          <span>Прикладной интенсив по Claude</span>
          <span className={styles.arrow} aria-hidden="true">↗</span>
        </Link>
      </div>
    </nav>
  );
}
