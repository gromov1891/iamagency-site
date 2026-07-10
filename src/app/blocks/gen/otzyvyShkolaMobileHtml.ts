// Reviews + school teaser mobile version from Figma file 197KqVv6GjBDHHypLH55K9, frame #365:2734.
export const otzyvyShkolaMobileH = 874;

const card = (
  x: number,
  title: string,
  subtitle: string,
  text: string,
  accent: string,
  avatar: string,
  textTop: number,
  textH: number,
  titleW: number,
  subtitleW = 83.32
) => `
<div style="width:247.76px;height:231.81px;position:absolute;left:${x}px;top:123px">
  <div style="width:247.76px;height:231.81px;border-radius:16.21px;background:rgba(255,255,255,.27);box-shadow:0 -1.755px 1.755px 1.316px rgba(255,255,255,.39) inset;position:absolute;left:0;top:0"></div>
  <div style="width:227.15px;height:43.85px;border-radius:21.925px;background:linear-gradient(90deg, ${accent} 27.88%, #FFF 100%);position:absolute;left:10.96px;top:10.52px"></div>
  <img style="width:39.56px;height:39.07px;border-radius:21.925px;position:absolute;left:195.34px;top:12.7px;object-fit:cover" src="${avatar}" alt="" />
  <div layer-name="${title}" style="color:#FFF;font-family:Inter;font-size:16.69px;font-weight:500;line-height:86%;letter-spacing:-0.835px;position:absolute;left:25.43px;top:15.79px;width:${titleW}px;height:15px;white-space:nowrap"><span style="font-family:Inter, -apple-system, Roboto, Helvetica, sans-serif;font-weight:500;font-size:16.69px;color:#FFF">${title}</span></div>
  <div layer-name="${subtitle}" style="width:${subtitleW}px;color:#FFF;font-family:Inter;font-size:7.11px;font-weight:400;line-height:86%;letter-spacing:-0.356px;position:absolute;left:25.43px;top:36.4px;height:12px"><span style="font-family:Inter, -apple-system, Roboto, Helvetica, sans-serif;font-weight:400;font-size:7.11px;color:#FFF">${subtitle}</span></div>
  <div layer-name="${text}" style="width:230.5px;color:#FFF;font-family:Inter;font-size:10.74px;font-weight:400;line-height:86%;letter-spacing:-0.537px;position:absolute;left:10.74px;top:${textTop}px;height:${textH}px"><span style="font-family:Inter, -apple-system, Roboto, Helvetica, sans-serif;font-weight:400;font-size:10.74px;color:#FFF">${text}</span></div>
</div>`;

const schoolRow = (top: number, num: string, title: string, titleW: number) => `
<div style="width:361.97px;height:288.75px;position:absolute;left:13px;top:${top}px">
  <div style="width:338.13px;height:242.78px;border-radius:10.83px;border:0.516px solid #9A9895;box-shadow:0 1.031px 1.031px 0 rgba(0,0,0,.25) inset;position:absolute;left:7.25px;top:0"></div>
  <div style="width:361.97px;height:255.42px;border-radius:10.83px;background:#1C1C1C;position:absolute;left:0;top:33.33px"></div>
  <div layer-name="${num}" style="color:#9A9895;font-family:Inter;font-size:14px;font-weight:400;line-height:86%;letter-spacing:-0.7px;text-transform:uppercase;position:absolute;left:14px;top:8px;width:20px;height:14px;white-space:nowrap"><span style="font-family:Inter, -apple-system, Roboto, Helvetica, sans-serif;font-weight:400;font-size:14px;color:#9A9895">${num}</span></div>
  <div layer-name="${title}" style="color:#FFF;font-family:Inter;font-size:14px;font-weight:400;line-height:86%;letter-spacing:-0.7px;text-transform:uppercase;position:absolute;left:41.47px;top:9px;width:${titleW}px;height:14px;white-space:nowrap"><span style="font-family:Inter, -apple-system, Roboto, Helvetica, sans-serif;font-weight:400;font-size:14px;color:#FFF">${title}</span></div>
</div>`;

export const otzyvyShkolaMobileHtml = `<div style="position:absolute;left:0;top:0;width:375px;height:874px;background:#1C1C1C;overflow:visible">
<img layer-name="55 2" style="width:199.42px;height:222px;object-fit:contain;position:absolute;left:-17.21px;top:332px" src="/blk/otzyvy/glass_top.png" alt="" />
<div layer-name="Отзывы" style="color:#FFF;font-family:Coolvetica;font-size:27.091px;font-weight:400;line-height:86%;text-transform:uppercase;position:absolute;left:20px;top:49px;width:98px;height:23px;white-space:nowrap"><span style="font-family:Coolvetica, -apple-system, Roboto, Helvetica, sans-serif;font-weight:400;font-size:27.091px;color:#FFF">Отзывы</span></div>

${card(
  61.17,
  "Юлия",
  "Fancy decor, оформление мероприятий под ключ",
  "Мы работаем с командой SMM-специалистов уже третий месяц и очень довольны результатом. За это время заметно выросли охваты и увеличилось число подписчиков,контент-план составляется на месяц вперёд именно так, как мы и хотели. Это очень удобно и помогает лучше планировать работу.<br/><br/>Отдельно хочется отметить, что с командой очень легко и приятно общаться всегда на связи, быстро реагируют и учитывают все пожелания.<br/><br/>Спасибо вам за отличную работу! Обязательно будем продолжать сотрудничество дальше.",
  "#FFAD19",
  "/blk/otzyvy/avatar-yulia-tablet.png",
  66.22,
  153,
  45
)}
${card(
  -225,
  "Максим",
  "BELOUSOV STUDIO архитектурное бюро",
  "Работаем уже продолжительное время, и хочу оставить объективный отзыв.<br/><br/>Если вам нужны настоящие профессионалы <br/>для работы с соцсетями, то вы по адресу. <br/>Мне создали уникальный продукт, который выделяется среди конкурентов. До сих пор <br/>не верится, что это было возможно!<br/><br/>Честно говоря, долго подбираю слова, но так <br/>и не могу полностью выразить свои эмоции. Команда I AM&nbsp; — это настоящий бриллиант, который мне удалось найти здесь",
  "#90BEE9",
  "/blk/otzyvy/avatar-maxim-tablet.png",
  73.74,
  117,
  62
)}
${card(
  347.35,
  "Елена и Георгий",
  "Travel Times<br/>Семейный бренд путешествий по всему миру",
  "SMM-команда, с которой легко работать и приятно видеть результат<br/><br/>Мы перепробовали несколько подходов к ведению соцсетей: были и фрилансеры, и внутренние сотрудники, и агентства. С текущей SMM-командой нашли то, что искали — системность, профессионализм и человеческое отношение.<br/>Больше всего ценим прозрачность и скорость Всегда понятно, что делается, зачем и какой <br/>от этого ожидать эффект.Правки в течение пары часов, посты — без опозданий, отчётность — вовремя.",
  "#8992E4",
  "/blk/otzyvy/avatar-elena-georgiy-tablet.png",
  73.74,
  126,
  123,
  152.85
)}
${card(
  633.52,
  "Антон",
  "Connected show<br/>организация концертов по всему миру",
  "С агентством работаем каждый сезон проведения концертов на о. Бали<br/><br/>Крутой продакшен и исполнение, специалисты из команды обеспечивали платный трафик <br/>и солд аут на все мероприятия",
  "#F55D1C",
  "/blk/otzyvy/avatar-anton-tablet.png",
  103.53,
  54,
  46,
  152.85
)}
${card(
  911.88,
  "Наталья",
  "Altay village <br/>директор по развитию проекта",
  "Работаем с командой больше 3 лет, <br/>очень довольны сотрудничеством!<br/><br/>Ребята разработали стратегию&nbsp;для нас <br/>и полностью закрывают все услуги онлайн маркетинга",
  "#90BEE9",
  "/blk/otzyvy/avatar-natalia-tablet.png",
  103.53,
  54,
  64,
  152.85
)}
${card(
  1190.24,
  "Анастасия",
  "Личный экспертный <br/>блог",
  "Хочу поблагодарить вашу команду за работу<br/><br/>Когда вы приступили к нашему проекту, стало намного понятнее, куда двигаться с точки зрения контента. Вы предложили очень хорошие варианты и глубоко погрузились <br/>в наш проект, хотя он достаточно нестандартный и всё постоянно меняется<br/><br/>При этом вы лояльно относитесь к правкам <br/>и изменениям. Чувствуется профессионализм и то, что вы давно на рынке <br/><br/>Спасибо вам большое!",
  "#FFAD19",
  "/blk/otzyvy/avatar-anastasia-tablet.png",
  75.69,
  126,
  81,
  152.85
)}

<a href="/#kontakty" style="display:flex;width:108.45px;height:19px;justify-content:center;align-items:center;border-radius:28.169px;border:0.731px solid #FFF;background:#FFF;position:absolute;left:247px;top:406px;text-decoration:none"><span style="font-family:Inter, -apple-system, Roboto, Helvetica, sans-serif;font-weight:400;font-size:11.398px;line-height:86%;letter-spacing:-0.57px;color:#1C1C1C;white-space:nowrap">Начать работу</span></a>

<div layer-name="обучение профессии с нуля" style="color:#9A9895;font-family:Coolvetica;font-size:24px;font-weight:400;line-height:100%;text-transform:uppercase;position:absolute;left:129px;top:509px;width:226px;height:48px;text-align:right"><span style="font-family:Coolvetica, -apple-system, Roboto, Helvetica, sans-serif;font-weight:400;font-size:24px;color:#9A9895">обучение профессии с нуля</span></div>
<div layer-name="школа SMM" style="color:#FFF;text-align:justify;font-family:Inter;font-size:13px;font-weight:400;line-height:86%;letter-spacing:-0.65px;text-transform:lowercase;position:absolute;left:287px;top:564px;width:68px;height:11px;white-space:nowrap"><span style="font-family:Inter, -apple-system, Roboto, Helvetica, sans-serif;font-weight:400;font-size:13px;color:#FFF">школа SMM</span></div>
${schoolRow(627, "01", "почему наш курс лучший на рынке", 293)}
${schoolRow(660, "02", "Истории учеников", 161)}
${schoolRow(693, "03", "Кому подойдет", 135)}
${schoolRow(726, "04", "Программа", 94)}
<a href="/shkola-smm" style="display:flex;width:169.22px;height:18.77px;justify-content:center;align-items:center;border-radius:27.722px;background:linear-gradient(90deg, #8992E4 0%, #F55D1C 100%);position:absolute;left:189px;top:815px;text-decoration:none"><span style="font-family:Inter, -apple-system, Roboto, Helvetica, sans-serif;font-weight:400;font-size:11.233px;line-height:86%;letter-spacing:-0.562px;color:#FFF;white-space:nowrap">Оставить заявку на обучение</span></a>
</div>`;

export const shkolaMobileEmptyHtml = `<div style="position:absolute;left:0;top:0;width:375px;height:0;background:#1C1C1C;overflow:visible"></div>`;
export const shkolaMobileEmptyH = 0;
