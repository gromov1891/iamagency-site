import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getCmsSession } from "@/lib/cms-auth";
import AdminLoginForm from "./AdminLoginForm";
import styles from "./admin.module.css";

export const metadata: Metadata = {
  title: "Вход в CMS",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage() {
  if (await getCmsSession()) redirect("/admin/blog");

  return (
    <main className={styles.loginPage}>
      <section className={styles.loginPanel} aria-labelledby="cms-login-title">
        <div className={styles.loginBrand}>I AM AGENCY</div>
        <p className={styles.eyebrow}>CMS блога</p>
        <h1 id="cms-login-title">Вход для менеджера</h1>
        <p className={styles.loginCopy}>Публикация статей, изображений и управление хэштегами.</p>
        <AdminLoginForm />
      </section>
    </main>
  );
}
