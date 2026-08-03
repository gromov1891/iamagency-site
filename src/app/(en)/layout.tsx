import SiteDocument, { englishSiteMetadata } from "@/app/SiteDocument";

export const metadata = englishSiteMetadata;

export default function EnglishLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <SiteDocument locale="en">{children}</SiteDocument>;
}
