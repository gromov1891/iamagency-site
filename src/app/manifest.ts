import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "I AM AGENCY - SMM-агентство полного цикла",
    short_name: "I AM AGENCY",
    description: "Стратегия, ведение и продвижение социальных сетей, контент и digital-маркетинг под ключ.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#ffffff",
    lang: "ru",
    icons: [
      {
        src: "/apple-icon.png",
        sizes: "288x288",
        type: "image/png",
      },
    ],
  };
}
