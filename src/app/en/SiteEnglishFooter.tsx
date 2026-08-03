"use client";

import { usePathname } from "next/navigation";
import { EnglishFooter } from "./EnglishPages";

export default function SiteEnglishFooter() {
  const pathname = usePathname();
  return pathname === "/en" ? null : <EnglishFooter />;
}
