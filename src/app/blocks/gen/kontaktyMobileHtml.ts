// Contacts mobile version from Figma file 197KqVv6GjBDHHypLH55K9, frame #365:2501.
export const kontaktyMobileH = 874;

const label = (top: number, text: string, w: number) => `
<div style="position:absolute;left:20px;top:${top}px;width:${w}px;height:14px;color:#1C1C1C;font-family:Inter,-apple-system,Roboto,Helvetica,sans-serif;font-size:13px;font-weight:400;line-height:86%;letter-spacing:-0.65px;white-space:nowrap">${text}</div>`;

const line = (top: number) => `
<div style="position:absolute;left:20px;top:${top}px;width:335px;height:0;border-bottom:1.03px solid #9A9895"></div>`;

const social = (left: number, src: string, href: string, label: string) => `
<a href="${href}" target="_blank" rel="noreferrer" aria-label="${label}" style="position:absolute;left:${left}px;top:783px;width:20.8px;height:20.8px">
  <img src="${src}" style="width:20.8px;height:20.8px;display:block" alt="" />
</a>`;

export const kontaktyMobileHtml = `<div data-contact-variant="mobile" style="position:absolute;left:0;top:0;width:375px;height:874px;background:#FFF;overflow:visible">
<img src="/blk/figma-mobile/mobile-contact-logo.svg" style="position:absolute;left:20px;top:11px;width:335px;height:157.56px;display:block" alt="I AM AGENCY" />
<div style="position:absolute;left:211px;top:244px;width:144px;height:46px;color:#1C1C1C;font-family:Coolvetica,-apple-system,Roboto,Helvetica,sans-serif;font-size:27.091px;font-weight:400;line-height:86%;text-transform:uppercase;text-align:left">Свяжитесь<br/>с нами</div>
${label(327, "Имя", 32)}
${line(380.84)}
${label(401.78, "Телефон", 63)}
${line(455.62)}
${label(476.55, "Сайт / соцсети проекта", 170)}
${line(530.4)}
${label(551.33, "Бюджет", 61)}
${line(605.17)}
<div id="kf-submit" style="position:absolute;left:20px;top:641.06px;width:113.66px;height:24.79px;background:#1C1C1C;border-radius:36.46px;display:flex;align-items:center;justify-content:center;cursor:pointer;color:#fff;font-family:Inter,-apple-system,Roboto,Helvetica,sans-serif;font-size:14.82px;line-height:86%;letter-spacing:-0.741px">Отправить</div>
${social(20, "/blk/figma-mobile/mobile-social-telegram.png", "https://t.me/iam_smmagency", "Telegram")}
${social(44.47, "/blk/figma-mobile/mobile-social-max.png", "https://max.ru/u/f9LHodD0cOKbELAJKi1eVN5Rai5cGNxNIP3VB781r1iMvNZdUyuic3sD9U8", "Max")}
${social(69.05, "/blk/figma-mobile/mobile-social-instagram.png", "https://www.instagram.com/iamagency.smm", "Instagram")}
${social(93.32, "/blk/figma-mobile/mobile-social-whatsapp.png", "https://wa.me/message/BPS3ETU5K3HZH1", "WhatsApp")}
<img src="/blk/kontakty/blue_contact.png" style="position:absolute;left:113px;top:619px;width:376.65px;height:360.81px;object-fit:contain;pointer-events:none" alt="" />
<div id="kf-modal" style="position:absolute;left:20px;top:310px;width:335px;height:356px;display:none">
  <div style="position:absolute;left:0;top:0;width:335px;height:356px;background:#fff;box-shadow:0 2px 8px rgba(0,0,0,.18);border-radius:12px"></div>
  <div style="position:absolute;left:25px;top:98px;width:285px;text-align:center;color:#C9C9D2;font-family:Inter,-apple-system,Roboto,Helvetica,sans-serif;font-size:45px;line-height:86%">Спасибо!</div>
  <div style="position:absolute;left:42px;top:170px;width:250px;text-align:center;color:#1C1C1C;font-family:Inter,-apple-system,Roboto,Helvetica,sans-serif;font-size:18px;line-height:110%">Мы свяжемся с вами в течение 15 минут</div>
  <div style="position:absolute;left:154px;top:236px;font-size:22px">OK</div>
  <div id="kf-close" style="position:absolute;left:20px;top:305px;width:295px;height:28px;background:#F0F0F0;border-radius:32px;display:flex;align-items:center;justify-content:center;cursor:pointer;color:#9A9895;font-family:Inter,-apple-system,Roboto,Helvetica,sans-serif;font-size:13px">Закрыть</div>
</div>
</div>`;
