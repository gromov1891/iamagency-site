"use client";

import { usePathname } from "next/navigation";
import ResponsiveBlock from "@/app/blocks/ResponsiveBlock";
import { futerHtml, futerH } from "@/app/blocks/gen/futerHtml";
import { futerTabletHtml, futerTabletH } from "@/app/blocks/gen/futerTabletHtml";
import { futerMobileHtml, futerMobileH } from "@/app/blocks/gen/futerMobileHtml";
import { translateGeneratedHtml as en } from "@/lib/i18n/translate-generated-html";

export default function SiteEnglishFooter() {
  const pathname = usePathname();
  return pathname === "/en" ? null : (
    <ResponsiveBlock
      desktopHtml={en(futerHtml)}
      desktopH={futerH}
      tabletHtml={en(futerTabletHtml)}
      tabletH={futerTabletH}
      mobileHtml={en(futerMobileHtml)}
      mobileH={futerMobileH}
      overflow="hidden"
    />
  );
}
