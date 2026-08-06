import SiteDocument, { englishSiteMetadata } from "@/app/SiteDocument";
import EnglishHomeLinks from "./EnglishHomeLinks";

export const metadata = englishSiteMetadata;

export default function EnglishLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <SiteDocument locale="en">
      <EnglishHomeLinks />
      {children}
    </SiteDocument>
  );
}
