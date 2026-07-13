import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  async redirects() {
    return [
      { source: "/imagency", destination: "/", permanent: true },
      { source: "/schoolsmm", destination: "/shkola-smm", permanent: true },
      { source: "/blog", destination: "/#blog", permanent: true },
      { source: "/smm_bisnes", destination: "/uslugi/vedenie-sotssetey", permanent: true },
      { source: "/cases", destination: "/keisy", permanent: true },
      { source: "/services", destination: "/#uslugi", permanent: true },
      { source: "/smm-strategies", destination: "/uslugi/brendbuk-i-smm-strategiya", permanent: true },
      { source: "/channels-and-vk-sites", destination: "/uslugi/marketing-i-prodvizhenie", permanent: true },
      { source: "/cross-hosting", destination: "/uslugi/vedenie-sotssetey", permanent: true },
      { source: "/bot", destination: "/uslugi/marketing-i-prodvizhenie", permanent: true },
      { source: "/shooting", destination: "/uslugi/kontent-syomki", permanent: true },
      { source: "/mobileshooting", destination: "/uslugi/kontent-syomki", permanent: true },
      { source: "/vkontakte", destination: "/uslugi/vedenie-sotssetey", permanent: true },
      { source: "/telegram", destination: "/uslugi/vedenie-sotssetey", permanent: true },
      { source: "/instagram", destination: "/uslugi/vedenie-sotssetey", permanent: true },
      { source: "/website", destination: "/marketing/razrabotka-saytov", permanent: true },
      { source: "/target", destination: "/marketing/target-reklama", permanent: true },
      { source: "/privacy", destination: "/privacy-consent", permanent: true },
      { source: "/page65742163.html", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
