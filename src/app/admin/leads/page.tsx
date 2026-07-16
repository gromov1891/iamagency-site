import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getCmsSession } from "@/lib/cms-auth";
import LeadsDashboard from "./LeadsDashboard";

export const metadata: Metadata = { title: "Заявки — I AM AGENCY", robots: { index: false, follow: false } };

export default async function LeadsPage() {
  const session = await getCmsSession();
  if (!session) redirect("/admin");
  return <LeadsDashboard user={session.user} />;
}
