import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "404 — страница не найдена",
};

const MENU = [
  { label: "Услуги", href: "/#uslugi" },
  { label: "Портфолио", href: "/#portfolio" },
  { label: "Маркетинг", href: "/marketing" },
  { label: "Школа SMM", href: "/#shkola" },
  { label: "Блог", href: "/#blog" },
  { label: "Контакты", href: "/#kontakty" },
];

const CONTACTS = [
  { label: "Telegram", href: "https://t.me/iam_smmagency", bg: "#0088cc" },
  { label: "WhatsApp", href: "https://wa.me/message/BPS3ETU5K3HZH1", bg: "#25D366" },
  { label: "+7 953 555 67 60", href: "tel:+79535556760", bg: "#ff5a00" },
  { label: "iamagencysmm@gmail.com", href: "mailto:iamagencysmm@gmail.com", bg: "#1C1C1C" },
];

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#ffffff",
        color: "#1C1C1C",
        fontFamily: "Inter, sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        padding: "calc(var(--header-h) + 32px) 20px 72px",
        gap: 18,
      }}
    >
      {/* зачёркнутое слово — как у Avito */}
      <h1 style={{ fontSize: "clamp(24px,3.6vw,44px)", fontWeight: 700, margin: 0, maxWidth: 760, lineHeight: 1.15 }}>
        Эта страница{" "}
        <span
          style={{
            color: "#b0b0b0",
            textDecoration: "line-through",
            textDecorationColor: "#ff3b30",
            textDecorationThickness: "3px",
          }}
        >
          ушла на съёмки
        </span>{" "}
        не работает
      </h1>
      <p style={{ color: "#7a7a7a", margin: 0, maxWidth: 520, fontSize: "clamp(15px,1.7vw,19px)" }}>
        Поэтому напишите нам ниже — поможем 👇
      </p>

      {/* объёмная 404 */}
      <img
        src="/blk/404.webp"
        alt="404"
        loading="lazy"
        decoding="async"
        style={{ width: "clamp(260px, 56vw, 540px)", height: "auto", margin: "8px 0 4px" }}
      />

      <div style={{ display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "center" }}>
        <Link
          href="/"
          style={{
            background: "linear-gradient(90deg,#90BEE9,#8992E4)",
            color: "#fff",
            textDecoration: "none",
            fontWeight: 600,
            padding: "14px 32px",
            borderRadius: 12,
            fontSize: 17,
          }}
        >
          На главную
        </Link>
        <Link
          href="/#kontakty"
          style={{
            color: "#1C1C1C",
            textDecoration: "none",
            fontWeight: 600,
            padding: "14px 32px",
            borderRadius: 12,
            fontSize: 17,
            border: "1px solid #1C1C1C",
          }}
        >
          Оставить заявку
        </Link>
      </div>

      <nav style={{ display: "flex", gap: "clamp(14px,2vw,28px)", flexWrap: "wrap", justifyContent: "center", marginTop: 4 }}>
        {MENU.map((m) => (
          <Link key={m.label} href={m.href} style={{ color: "#5b6bff", textDecoration: "none", fontWeight: 500, fontSize: 16 }}>
            {m.label}
          </Link>
        ))}
      </nav>

      <div
        style={{
          marginTop: 14,
          width: "min(420px, 100%)",
          border: "1px solid #e6e6e6",
          borderRadius: 18,
          padding: 22,
          textAlign: "left",
          boxShadow: "0 8px 30px rgba(0,0,0,.06)",
        }}
      >
        <div style={{ fontWeight: 700, fontSize: 20, marginBottom: 16 }}>Свяжитесь с нами</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {CONTACTS.map((c) => (
            <a
              key={c.label}
              href={c.href}
              target={c.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              style={{
                display: "block",
                background: c.bg,
                color: "#fff",
                textDecoration: "none",
                textAlign: "center",
                fontWeight: 600,
                padding: "13px 16px",
                borderRadius: 10,
                fontSize: 16,
              }}
            >
              {c.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
