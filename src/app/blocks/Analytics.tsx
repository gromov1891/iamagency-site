"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

const metrikaId = Number(process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID || "99802137");
const gaId = process.env.NEXT_PUBLIC_GA_ID?.trim();

export default function Analytics() {
  const pathname = usePathname();
  const initialPath = useRef(pathname);

  useEffect(() => {
    if (pathname === initialPath.current) return;
    window.ym?.(metrikaId, "hit", pathname);
    if (gaId) window.gtag?.("config", gaId, { page_path: pathname });
  }, [pathname]);

  return (
    <>
      <Script
        id="yandex-metrika"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
            m[i].l=1*new Date();for(var j=0;j<document.scripts.length;j++){if(document.scripts[j].src===r){return;}}
            k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
            (window,document,"script","https://mc.yandex.ru/metrika/tag.js","ym");
            ym(${metrikaId},"init",{clickmap:true,trackLinks:true,accurateTrackBounce:true,webvisor:true});
          `,
        }}
      />
      {gaId ? (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
          <Script
            id="google-analytics"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)};window.gtag=gtag;gtag('js',new Date());gtag('config','${gaId}');`,
            }}
          />
        </>
      ) : null}
    </>
  );
}
