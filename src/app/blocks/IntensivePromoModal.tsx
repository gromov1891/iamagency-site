"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { trackAnalyticsGoal } from "@/lib/analytics";
import styles from "./intensive-promo-modal.module.css";

const CAMPAIGN_END = new Date("2026-09-12T17:00:00+03:00").getTime();
const TIME_TRIGGER_MS = 35_000;
const MIN_SCROLL_TIME_MS = 12_000;
const SCROLL_TRIGGER = 0.4;
const DISMISS_FOR_MS = 3 * 24 * 60 * 60 * 1000;
const SESSION_KEY = "iam_intensive_promo_seen_sep_2026";
const DISMISS_KEY = "iam_intensive_promo_dismissed_sep_2026";
const CONVERTED_KEY = "iam_intensive_promo_opened_sep_2026";

function storageGet(storage: Storage, key: string) {
  try {
    return storage.getItem(key);
  } catch {
    return null;
  }
}

function storageSet(storage: Storage, key: string, value: string) {
  try {
    storage.setItem(key, value);
  } catch {
    // The campaign should still work when browser storage is unavailable.
  }
}

function isExcludedPath(pathname: string, locale: "ru" | "en") {
  if (locale !== "ru") return true;

  return [
    "/shkola-smm/prikladnoy-intensiv",
    "/kontakty",
    "/tarify",
    "/privacy-policy",
    "/privacy-consent",
    "/admin",
  ].some((path) => pathname === path || pathname.startsWith(`${path}/`));
}

export default function IntensivePromoModal({ locale }: { locale: "ru" | "en" }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const openedRef = useRef(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const showModal = useCallback((trigger: "time" | "scroll") => {
    if (openedRef.current || Date.now() >= CAMPAIGN_END) return false;
    if (document.querySelector('[role="dialog"][aria-modal="true"]')) return false;

    openedRef.current = true;
    previousFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    storageSet(window.sessionStorage, SESSION_KEY, "1");
    setOpen(true);
    trackAnalyticsGoal("intensive_popup_view", {
      kind: "course",
      source: "site_promo",
      campaign: "claude_intensive_sep2026",
      trigger,
    });
    return true;
  }, []);

  useEffect(() => {
    openedRef.current = false;

    if (isExcludedPath(pathname, locale) || Date.now() >= CAMPAIGN_END) return;
    if (storageGet(window.sessionStorage, SESSION_KEY) || storageGet(window.localStorage, CONVERTED_KEY)) return;

    const dismissedAt = Number(storageGet(window.localStorage, DISMISS_KEY) || 0);
    if (dismissedAt > 0 && Date.now() - dismissedAt < DISMISS_FOR_MS) return;

    const startedAt = Date.now();
    let retryTimer: ReturnType<typeof setTimeout> | undefined;

    const tryShow = (trigger: "time" | "scroll") => {
      if (showModal(trigger)) return;
      if (!openedRef.current && Date.now() < CAMPAIGN_END) {
        window.clearTimeout(retryTimer);
        retryTimer = setTimeout(() => tryShow(trigger), 5_000);
      }
    };

    const checkScroll = () => {
      if (Date.now() - startedAt < MIN_SCROLL_TIME_MS) return;
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable > 0 && window.scrollY / scrollable >= SCROLL_TRIGGER) tryShow("scroll");
    };

    const timeTimer = setTimeout(() => tryShow("time"), TIME_TRIGGER_MS);
    const minimumTimeTimer = setTimeout(checkScroll, MIN_SCROLL_TIME_MS);
    window.addEventListener("scroll", checkScroll, { passive: true });

    return () => {
      clearTimeout(timeTimer);
      clearTimeout(minimumTimeTimer);
      if (retryTimer) clearTimeout(retryTimer);
      window.removeEventListener("scroll", checkScroll);
    };
  }, [locale, pathname, showModal]);

  const closeModal = useCallback((reason: "button" | "backdrop" | "escape") => {
    storageSet(window.localStorage, DISMISS_KEY, String(Date.now()));
    setOpen(false);
    trackAnalyticsGoal("intensive_popup_close", {
      kind: "course",
      source: "site_promo",
      campaign: "claude_intensive_sep2026",
      reason,
    });
    window.setTimeout(() => previousFocusRef.current?.focus(), 0);
  }, []);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const dialog = dialogRef.current;
    const focusable = dialog?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );
    focusable?.[0]?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeModal("escape");
        return;
      }
      if (event.key !== "Tab" || !focusable?.length) return;

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

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [closeModal, open]);

  if (!open) return null;

  const intensiveHref =
    "/shkola-smm/prikladnoy-intensiv?utm_source=iamagency_site&utm_medium=popup&utm_campaign=claude_intensive_sep2026";

  return (
    <div
      className={styles.backdrop}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) closeModal("backdrop");
      }}
    >
      <div
        ref={dialogRef}
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="intensive-promo-title"
        aria-describedby="intensive-promo-description"
      >
        <h2 id="intensive-promo-title" className={styles.srOnly}>Интенсив по Claude</h2>
        <p id="intensive-promo-description" className={styles.srOnly}>
          Прикладной интенсив для маркетологов, агентств и бизнеса за пять дней.
        </p>
        <button className={styles.close} type="button" onClick={() => closeModal("button")} aria-label="Закрыть">
          ×
        </button>
        <Image
          className={styles.poster}
          src="/intensive/intensive-promo-sep-2026.png"
          width={1280}
          height={1920}
          sizes="(max-width: 480px) calc(100vw - 24px), 380px"
          alt=""
        />
        <div className={styles.actions}>
          <Link
            className={styles.primary}
            href={intensiveHref}
            onClick={() => {
              setOpen(false);
              storageSet(window.localStorage, CONVERTED_KEY, "1");
              trackAnalyticsGoal("intensive_popup_click", {
                kind: "course",
                source: "site_promo",
                campaign: "claude_intensive_sep2026",
              });
            }}
          >
            Перейти на интенсив
          </Link>
          <button className={styles.secondary} type="button" onClick={() => closeModal("button")}>
            Не сейчас
          </button>
        </div>
      </div>
    </div>
  );
}
