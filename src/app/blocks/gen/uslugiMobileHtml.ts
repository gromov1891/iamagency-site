// Services mobile frame #365:3003. The accordion copy and Twister are taken from Figma.
export const uslugiMobileH = 541;

const service = (num: string, title: string, text: string, href: string) => `
<details name="mobile-services" style="width:362px;border:1px solid #9A9895;border-radius:12px;background:#1C1C1C;color:#FFF;overflow:hidden">
  <summary style="height:31px;display:flex;align-items:center;gap:8px;padding:0 13px;list-style:none;cursor:pointer;font-family:Inter,-apple-system,Roboto,Helvetica,sans-serif;font-size:19.91px;line-height:86%;letter-spacing:-0.995px;text-transform:uppercase;white-space:nowrap">
    <span style="color:#9A9895">${num}</span><span>${title}</span>
  </summary>
  <div style="padding:2px 13px 10px 41px;font-family:Inter,-apple-system,Roboto,Helvetica,sans-serif;font-size:8px;line-height:105%;letter-spacing:0;color:#FFF">
    ${text}<br/><a href="${href}" style="display:inline-block;margin-top:6px;color:#FFF;text-decoration:underline;text-underline-offset:2px">Подробнее →</a>
  </div>
</details>`;

export const uslugiMobileHtml = `<div style="position:absolute;left:0;top:0;width:375px;height:541px;background:#1C1C1C;overflow:visible">
<style>.mobile-services summary::-webkit-details-marker{display:none}.mobile-services details[open] summary{padding-top:2px}</style>
<img layer-name="twisted-side-1 1" style="width:400px;height:400px;object-fit:contain;position:absolute;left:-151px;top:238px" src="/blk/figma-mobile/mobile-twister.png" alt="" />

<div style="position:absolute;left:20px;top:49px;font-family:Coolvetica,-apple-system,Roboto,Helvetica,sans-serif;font-size:26.88px;line-height:86%;text-transform:uppercase;color:#FFF">УСЛУГИ</div>

<div class="mobile-services" style="position:absolute;left:13px;top:114px;width:362px;display:flex;flex-direction:column;gap:1px">
${service("01", "Брендбук и SMM-стратегия", "Фундамент, на котором держится весь контент: что говорить, как выглядеть и чем отличаться от конкурентов. Подойдёт брендам и экспертным блогам, которые планируют вести соцсети самостоятельно или передать их другим подрядчикам, — вы получаете готовую систему, по которой легко работать без нас", "/uslugi/brendbuk-i-smm-strategiya")}
${service("02", "Ведение соцсетей", "Ведём соцсети под ключ: стратегия, контент, оформление и регулярные публикации. У каждой площадки своя специфика и формат контента, поэтому работаем не по шаблону, а под логику конкретной сети и вашу аудиторию. Тариф «Движение» рассчитан на ведение любой одной площадки — не только Instagram*", "/uslugi/vedenie-sotssetey")}
${service("03", "Маркетинг и продвижение", "Растим охваты, поднимаем просмотры и привлекаем новых подписчиков через продвижение и живое общение с аудиторией", "/uslugi/marketing-i-prodvizhenie")}
${service("04", "Создание сайтов", "Корпоративные сайты, лендинги и интернет-магазины разрабатывает наша партнёрская команда — от структуры и прототипа до дизайна, вёрстки и запуска. Сайт собирается в единой логике с вашим брендом и соцсетями, поэтому всё выглядит цельно", "/marketing")}
${service("05", "Контент / Съёмки", "Снимаем фото и видео на выбранной вами локации или мероприятии. Подходит экспертам и проектам, которым нужен поток настоящего контента для соцсетей: будни, процессы, события", "/uslugi/kontent-syomki")}
</div>

<div style="display:flex;width:141.85px;height:21.75px;align-items:center;justify-content:center;border-radius:20px;border:.51px solid #9A9895;background:#1C1C1C;position:absolute;left:213px;top:346px"><div style="width:116px;text-align:right;font-family:Inter,-apple-system,Roboto,Helvetica,sans-serif;font-size:7.84px;line-height:86%;letter-spacing:-.392px;text-transform:lowercase;color:#FFF">подробно расскажем, что нужно вашему бизнесу, а что нет</div></div>
<a href="/#kontakty" style="display:flex;width:238.46px;height:19.33px;align-items:center;justify-content:center;border-radius:28px;background:linear-gradient(90deg,#8992E4 0%,#90BEE9 100%);position:absolute;left:117px;top:380px;text-decoration:none;color:#FFF;text-align:right;font-family:Inter,-apple-system,Roboto,Helvetica,sans-serif;font-size:11.56px;line-height:86%;letter-spacing:-.578px;white-space:nowrap">Записаться на бесплатную консультацию</a>
<div style="position:absolute;left:246px;top:470px;width:109.1px;text-align:justify;font-family:Inter,-apple-system,Roboto,Helvetica,sans-serif;font-size:7.84px;line-height:86%;letter-spacing:-.392px;color:#FFF"><span style="font-weight:600">от анализа до результатов:</span> всё, что необходимо на запуске проекта и при его масштабировании</div>
</div>`;
