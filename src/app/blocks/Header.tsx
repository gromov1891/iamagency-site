"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { SERVICE_CATALOG } from "../uslugi/serviceCatalog";
import { EN_SERVICES } from "@/lib/i18n/en-content";
import { findTranslationRoute, getLocaleFromPath, getTranslatedPath } from "@/lib/i18n/routes";
import styles from "./Header.module.css";

/* Липкий хедер — ТОЧНАЯ КОПИЯ родного меню из hero: тот же холст 1440,
   те же позиции пунктов, тот же шрифт (Inter 23.42px / 500 / -1.171px).
   Масштабируется как страница (clientWidth/1440), поэтому при скролле выглядит
   один-в-один с верхним меню. На главной вверху прячется (родное меню видно). */
const RU_LINKS = [
  { label: "УСЛУГИ", href: "/#uslugi", left: 313 },
  { label: "ПОРТФОЛИО", href: "/keisy", left: 483 },
  { label: "МАРКЕТИНГ", href: "/marketing", left: 698 },
  { label: "ШКОЛА SMM", href: "/shkola-smm", left: 905 },
  { label: "БЛОГ", href: "/blog", left: 1121 },
  { label: "КОНТАКТЫ", href: "/#kontakty", left: 1252 },
];
const EN_LINKS = [
  { label: "SERVICES", href: "/en#uslugi", left: 313 },
  { label: "PORTFOLIO", href: "/en/cases", left: 483 },
  { label: "MARKETING", href: "/en/marketing", left: 698 },
  { label: "SMM SCHOOL", href: "/en/smm-school", left: 905 },
  { label: "BLOG", href: "/en/blog", left: 1121 },
  { label: "CONTACTS", href: "/en#kontakty", left: 1252 },
];
const CANVAS_H = 80;

const linkStyle: React.CSSProperties = {
  position: "absolute",
  top: 31,
  color: "#1C1C1C",
  textDecoration: "none",
  fontSize: "23.423px",
  fontWeight: 500,
  lineHeight: 1,
  letterSpacing: "-1.171px",
  textTransform: "uppercase",
  whiteSpace: "nowrap",
};

export default function Header() {
  const pathname = usePathname();
  const locale = getLocaleFromPath(pathname);
  const isEnglish = locale === "en";
  const links = isEnglish ? EN_LINKS : RU_LINKS;
  const translationRoute = findTranslationRoute(pathname);
  const exactTranslatedPath = getTranslatedPath(pathname, isEnglish ? "ru" : "en");
  const englishFallback = pathname.startsWith("/en/services")
    ? "/#uslugi"
    : pathname.startsWith("/en/packages")
      ? "/#tarify"
      : pathname.startsWith("/en/blog/")
        ? "/blog"
        : "/";
  const translatedPath = exactTranslatedPath || (isEnglish ? englishFallback : undefined);
  const showLanguageSwitcher = Boolean(
    translatedPath &&
    (!translationRoute || translationRoute.status === "published" || (translationRoute.status === "preview" && isEnglish))
  );
  const isHome = pathname === "/" || pathname === "/en";
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const innerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setMenuOpen(false);
      setServicesOpen(false);
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [menuOpen]);

  useEffect(() => {
    const updateLegacyServiceLinks = () => {
      document.querySelectorAll<HTMLAnchorElement>('a[href="/uslugi"]').forEach((link) => {
        if (link.textContent?.trim().toLocaleLowerCase("ru-RU") === "услуги") {
          link.setAttribute("href", "/#uslugi");
        }
      });
      document.querySelectorAll<HTMLAnchorElement>('a[href="/#blog"]').forEach((link) => {
        link.setAttribute("href", isEnglish ? "/en/blog" : "/blog");
      });
    };
    updateLegacyServiceLinks();
    const observer = new MutationObserver(updateLegacyServiceLinks);
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [isEnglish, pathname]);

  useEffect(() => {
    const el = innerRef.current;
    if (!el) return;
    const update = () => setScale(el.clientWidth / 1440);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const solid = isMobile || !isHome || scrolled;

  return (
    <>
      {isHome && !scrolled && !isMobile && showLanguageSwitcher && translatedPath ? (
        <Link href={translatedPath} hrefLang={isEnglish ? "ru" : "en"} className={styles.homeLanguage}>
          {isEnglish ? "RU" : "EN"}
        </Link>
      ) : null}
      <header
      className={styles.header}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        height: "var(--header-h)",
        background: solid ? "#fff" : "transparent",
        boxShadow: scrolled ? "0 2px 16px rgba(0,0,0,.10)" : "none",
        opacity: solid ? 1 : 0,
        pointerEvents: solid ? "auto" : "none",
        transition: "opacity .3s ease, background .3s ease, box-shadow .3s ease",
      }}
    >
      <div
        ref={innerRef}
        className={styles.desktopInner}
        style={{ maxWidth: 2560, margin: "0 auto", position: "relative", height: "100%", overflow: "hidden" }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 1440,
            height: CANVAS_H,
            transformOrigin: "top left",
            transform: `scale(${scale})`,
            visibility: scale ? "visible" : "hidden",
            fontFamily: "Inter, sans-serif",
          }}
        >
          {/* пилюля «I AM AGENCY» — 1:1 как в макете */}
          <Link
            href={isEnglish ? "/en" : "/"}
            style={{
              position: "absolute",
              left: 40,
              top: 22,
              width: 192,
              height: 40,
              boxSizing: "border-box",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "59.274px",
              border: "1.538px solid #90BEE9",
              background: "linear-gradient(90deg,#90BEE9 0%,#8992E4 100%)",
              color: "#FFF",
              textDecoration: "none",
              fontSize: "23.42px",
              fontWeight: 400,
              letterSpacing: "-1.171px",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
            }}
          >
            I AM AGENCY
          </Link>

          {links.map((l) => (
            <Link key={l.label} href={l.href} style={{ ...linkStyle, left: l.left }}>
              {l.label}
            </Link>
          ))}
          {showLanguageSwitcher && translatedPath ? (
            <Link href={translatedPath} className={styles.desktopLanguage} hrefLang={isEnglish ? "ru" : "en"}>
              {isEnglish ? "RU" : "EN"}
            </Link>
          ) : null}
        </div>
      </div>

      <div className={styles.mobileBar}>
        <Link href={isEnglish ? "/en" : "/"} className={styles.mobileLogo} onClick={() => setMenuOpen(false)}>
          I AM AGENCY
        </Link>
        <button
          type="button"
          className={`${styles.menuButton} ${menuOpen ? styles.menuButtonOpen : ""}`}
            aria-label={menuOpen ? (isEnglish ? "Close menu" : "Закрыть меню") : (isEnglish ? "Open menu" : "Открыть меню")}
          aria-expanded={menuOpen}
          aria-controls="mobile-site-menu"
          onClick={() => setMenuOpen((value) => !value)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <nav
        id="mobile-site-menu"
        className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ""}`}
        aria-label={isEnglish ? "Mobile menu" : "Мобильное меню"}
      >
        <div className={styles.mobileMenuScroll}>
          {showLanguageSwitcher && translatedPath ? (
            <Link href={translatedPath} hrefLang={isEnglish ? "ru" : "en"} className={styles.mobileLanguage} onClick={() => setMenuOpen(false)}>
              <span>{isEnglish ? "LANGUAGE" : "ЯЗЫК"}</span>
              <strong>{isEnglish ? "RU" : "EN"} ↗</strong>
            </Link>
          ) : null}
          <div className={styles.mobileMenuRow}>
            <Link href={links[0].href} onClick={() => setMenuOpen(false)}>{links[0].label}</Link>
            <button
              type="button"
              aria-label={
                servicesOpen
                  ? isEnglish ? "Hide services" : "Скрыть направления услуг"
                  : isEnglish ? "Show services" : "Показать направления услуг"
              }
              aria-expanded={servicesOpen}
              onClick={() => setServicesOpen((value) => !value)}
            >
              {servicesOpen ? "−" : "+"}
            </button>
          </div>
          <div className={`${styles.mobileServices} ${servicesOpen ? styles.mobileServicesOpen : ""}`}>
            {(isEnglish
              ? EN_SERVICES.map((service, index) => ({
                  id: service.slug,
                  href: `/en/services/${service.slug}`,
                  number: String(index + 1).padStart(2, "0"),
                  title: service.name,
                }))
              : SERVICE_CATALOG
            ).map((service) => (
              <Link key={service.id} href={service.href} onClick={() => setMenuOpen(false)}>
                <span>{service.number}</span>
                <span>{service.title}</span>
                <span aria-hidden="true">↗</span>
              </Link>
            ))}
          </div>
          {links.slice(1).map((link) => (
            <Link key={link.label} href={link.href} className={styles.mobileMainLink} onClick={() => setMenuOpen(false)}>
              {link.label}
              <span aria-hidden="true">↗</span>
            </Link>
          ))}
        </div>
      </nav>
      </header>
    </>
  );
}
