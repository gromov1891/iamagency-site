// Mobile footer is semantic HTML so it stays sharp and does not carry decorative
// figures from desktop/tablet exports into narrow layouts.
export const futerMobileH = 920;

const menuLink = (href: string, label: string) =>
  `<a href="${href}" style="display:block;color:#FFF;text-decoration:none;font:400 18px/1.2 Inter,sans-serif;padding:7px 0">${label}</a>`;

const serviceLink = (href: string, number: string, label: string) =>
  `<a href="${href}" style="display:grid;grid-template-columns:28px 1fr 18px;gap:8px;color:#FFF;text-decoration:none;font:400 13px/1.15 Inter,sans-serif;text-transform:uppercase;padding:10px 0;border-bottom:1px solid #3C3C3C"><span style="color:#9A9895">${number}</span><span>${label}</span><span style="color:#90BEE9">↗</span></a>`;

const social = (href: string, label: string, image: string) =>
  `<a href="${href}" target="_blank" rel="noreferrer" aria-label="${label}" style="display:block;width:32px;height:32px"><img src="${image}" alt="" style="display:block;width:32px;height:32px" /></a>`;

export const futerMobileHtml = `<footer style="position:absolute;left:0;top:0;width:375px;height:920px;background:#1C1C1C;color:#FFF;overflow:hidden;padding:42px 22px 28px;box-sizing:border-box">
  <div style="font:400 44px/.9 Coolvetica,Inter,sans-serif;text-transform:uppercase;margin-bottom:27px"><span style="color:#9A9895">&gt;</span>&nbsp; Компания</div>
  <nav aria-label="Меню в подвале">
    ${menuLink("/#uslugi", "Услуги")}
    ${menuLink("/keisy", "Портфолио")}
    ${menuLink("/marketing", "Маркетинг")}
    ${menuLink("/blog", "Блог")}
    ${menuLink("/shkola-smm", "Школа SMM")}
  </nav>

  <div style="font:400 28px/.9 Coolvetica,Inter,sans-serif;text-transform:uppercase;margin:38px 0 14px"><span style="color:#9A9895">&gt;</span>&nbsp; Услуги</div>
  <nav aria-label="Направления услуг">
    ${serviceLink("/uslugi/brendbuk-i-smm-strategiya", "01", "Брендбук и SMM-стратегия")}
    ${serviceLink("/uslugi/vedenie-sotssetey", "02", "Ведение соцсетей")}
    ${serviceLink("/uslugi/marketing-i-prodvizhenie", "03", "Маркетинг и продвижение")}
    ${serviceLink("/marketing/razrabotka-saytov", "04", "Создание сайтов")}
    ${serviceLink("/uslugi/kontent-syomki", "05", "Контент / Съёмки")}
  </nav>

  <div style="font:400 28px/.9 Coolvetica,Inter,sans-serif;text-transform:uppercase;margin:38px 0 16px"><span style="color:#9A9895">&gt;</span>&nbsp; Контакты</div>
  <div style="display:flex;gap:10px">
    ${social("https://t.me/iam_smmagency", "Telegram", "/blk/figma-mobile/mobile-social-telegram.png")}
    ${social("https://max.ru/u/f9LHodD0cOKbELAJKi1eVN5Rai5cGNxNIP3VB781r1iMvNZdUyuic3sD9U8", "Max", "/blk/figma-mobile/mobile-social-max.png")}
    ${social("https://www.instagram.com/iamagency.smm", "Instagram", "/blk/figma-mobile/mobile-social-instagram.png")}
    ${social("https://wa.me/message/BPS3ETU5K3HZH1", "WhatsApp", "/blk/figma-mobile/mobile-social-whatsapp.png")}
  </div>

  <div style="position:absolute;left:22px;right:22px;bottom:28px;padding-top:20px;border-top:1px solid #666;display:grid;grid-template-columns:1fr 1fr;gap:9px 16px;color:#9A9895;font:400 10px/1.25 Inter,sans-serif">
    <span>I AM AGENCY © 2019–2026</span><span>ИП Громова М. А.</span>
    <a href="/privacy-policy" style="color:inherit;text-decoration:none">Политика конфиденциальности</a><a href="/privacy-consent" style="color:inherit;text-decoration:none">Согласие на обработку данных</a>
  </div>
</footer>`;
