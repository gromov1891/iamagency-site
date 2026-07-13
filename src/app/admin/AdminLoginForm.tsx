"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { FiArrowRight, FiLock, FiUser } from "react-icons/fi";
import styles from "./admin.module.css";

export default function AdminLoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    const data = new FormData(event.currentTarget);
    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user: data.get("user"), password: data.get("password") }),
    });
    const result = await response.json();
    setLoading(false);
    if (!response.ok) {
      setError(result.error || "Не удалось войти");
      return;
    }
    router.replace("/admin/blog");
    router.refresh();
  }

  return (
    <form className={styles.loginForm} onSubmit={submit}>
      <label>
        <span>Логин</span>
        <span className={styles.inputWithIcon}>
          <FiUser aria-hidden="true" />
          <input name="user" autoComplete="username" required autoFocus />
        </span>
      </label>
      <label>
        <span>Пароль</span>
        <span className={styles.inputWithIcon}>
          <FiLock aria-hidden="true" />
          <input name="password" type="password" autoComplete="current-password" required />
        </span>
      </label>
      {error && <p className={styles.formError} role="alert">{error}</p>}
      <button className={styles.primaryButton} disabled={loading}>
        <span>{loading ? "Входим…" : "Войти"}</span>
        <FiArrowRight aria-hidden="true" />
      </button>
    </form>
  );
}
