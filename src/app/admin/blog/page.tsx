import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getCmsSession } from "@/lib/cms-auth";
import CmsEditor from "./CmsEditor";

export const metadata: Metadata = {
  title: "CMS блога",
  robots: { index: false, follow: false },
};

export default async function CmsBlogPage() {
  const session = await getCmsSession();
  if (!session) redirect("/admin");
  return <CmsEditor user={session.user} />;
}
