import SiteDocument, { siteMetadata } from "@/app/SiteDocument";

export const metadata = siteMetadata;

export default function RussianLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <SiteDocument locale="ru">{children}</SiteDocument>;
}
