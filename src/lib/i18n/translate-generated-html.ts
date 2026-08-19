import autoTranslations from "./auto-translations.json";
import { CASE_TRANSLATIONS } from "./case-translations";

const PATH_REPLACEMENTS: Array<[string, string]> = [
  ['href="/shkola-smm/prikladnoy-intensiv"', 'href="/en/smm-school/applied-claude-intensive"'],
  ['href="/uslugi/brendbuk-i-smm-strategiya"', 'href="/en/services/brand-social-strategy"'],
  ['href="/uslugi/vedenie-sotssetey"', 'href="/en/services/social-media-management"'],
  ['href="/uslugi/marketing-i-prodvizhenie"', 'href="/en/services/social-media-marketing"'],
  ['href="/uslugi/kontent-syomki"', 'href="/en/services/content-production"'],
  ['href="/tarify/dvizhenie"', 'href="/en/packages/momentum"'],
  ['href="/tarify/proryv"', 'href="/en/packages/breakthrough"'],
  ['href="/tarify/triumf"', 'href="/en/packages/triumph"'],
  ['href="/privacy-consent"', 'href="/en/personal-data-consent"'],
  ['href="/privacy-policy"', 'href="/en/privacy-policy"'],
  ['href="/sitemap"', 'href="/en/sitemap"'],
  ['href="/#uslugi"', 'href="/en#uslugi"'],
  ['href="/#tarify"', 'href="/en#tarify"'],
  ['href="/#portfolio"', 'href="/en#portfolio"'],
  ['href="/#kontakty"', 'href="/en#kontakty"'],
  ['href="/kontakty"', 'href="/en/contacts"'],
  ['href="/keisy"', 'href="/en/cases"'],
  ['href="/marketing"', 'href="/en/marketing"'],
  ['href="/shkola-smm"', 'href="/en/smm-school"'],
  ['href="/blog"', 'href="/en/blog"'],
  ['href="/blog?tag=', 'href="/en/blog?tag='],
  ['href="/marketing/razrabotka-saytov"', 'href="/en/marketing/web-development"'],
  ["location.href='/marketing'", "location.href='/en/marketing'"],
  ['href="/"', 'href="/en"'],
];

const TEXT_REPLACEMENTS: Array<[string, string]> = [
  ["Прикладной интенсив по Claude", "Applied Claude Intensive"],
  ["Прикладной интенсив", "Applied intensive"],
  ["Одна команда на все задачи — превращаем ваши соцсети в источник клиентов", "One team for every task — turning your social media into a source of customers"],
  ["подробно расскажем, что нужно вашему бизнесу, а что нет", "We will explain what your business actually needs — and what it does not"],
  ["Записаться на бесплатную консультацию", "Book a free consultation"],
  ["Получить бесплатную консультацию", "Get a free consultation"],
  ["узнайте, какой тариф вам подходит", "Find the package that fits your goals"],
  ["Записаться на консультацию", "Book a consultation"],
  ["от анализа до результатов:", "From analysis to measurable results:"],
  ["все, что необходимо на запуске проекта и при его масштабировании", "Everything needed to launch and scale your project"],
  ["для тех, кто хочет присутствовать в медиаполе и иметь визуал, достойный своего бренда", "For brands that need a consistent presence and visuals worthy of their identity"],
  ["Для тех, кто хочет наращивать охваты, вовлекать аудиторию и получать лиды", "For brands ready to grow reach, engage audiences and generate leads"],
  ["Для тех, кто хочет вывести контент на новый уровень и привлекать клиентов не только через соцсети", "For brands ready to elevate content and attract customers beyond social media"],
  ["доказательства эффективности нашей работы", "Proof that our work delivers"],
  ["кейсы в различных нишах", "Case studies across industries"],
  ["Мы помогаем как крупному, так и малому бизнесу решать задачи", "We help both established companies and growing businesses solve real challenges"],
  ["Детально погружаемся в бизнес и предлагаем стратегию и инструменты, которые работают именно в вашей нише", "We immerse ourselves in your business and build a strategy with tools that work for your category"],
  ["От контекстной рекламы и таргета до influence-кампаний, разработки сайтов и BTL-активаций", "From paid search and social ads to influencer campaigns, websites and brand activations"],
  ["почему наш курс лучший на рынке", "Why our course stands out"],
  ["Истории учеников", "Student stories"],
  ["Кому подойдет", "Who it is for"],
  ["Программа", "Programme"],
  ["Оставить заявку на обучение", "Apply for the course"],
  ["обучение профессии с нуля", "Learn the profession from scratch"],
  ["школа SMM", "SMM school"],
  ["Свяжитесь", "Get in touch"],
  ["с нами", "with us"],
  ["Сайт / соцсети проекта", "Website / social profiles"],
  ["Мы свяжемся с вами в течение 15 минут", "We will get back to you within 15 minutes"],
  ["Политика конфиденциальности", "Privacy policy"],
  ["Согласие на обработку персональных данных", "Personal data consent"],
  ["ИП Громова М. А. ИНН 420545021010 ОГРНИП 324420500100030", "Sole proprietor M. A. Gromova · Tax ID 420545021010 · Registration No. 324420500100030"],
  ["Стратегия", "Strategy"],
  ["Брендинг", "Branding"],
  ["Ведение соцсетей", "Social media management"],
  ["Контент и съёмки", "Content production"],
  ["Продвижение", "Growth"],
  ["SMM-агентство", "FULL-SERVICE"],
  ["полного цикла", "SMM AGENCY"],
  ["Оставить заявку", "Start a project"],
  ["УСЛУГИ", "SERVICES"],
  ["Услуги", "Services"],
  ["Портфолио", "Portfolio"],
  ["Маркетинг", "Marketing"],
  ["Школа SMM", "SMM School"],
  ["Школа СММ", "SMM School"],
  ["Блог", "Blog"],
  ["Контакты", "Contacts"],
  ["Карта сайта", "Sitemap"],
  ["7 лет", "7 years"],
  ["работаем в нише", "in the industry"],
  ["потоков авторского курса", "cohorts of our course"],
  ["на первый месяц сотрудничества", "off the first month"],
  ["довольных клиентов", "happy clients"],
  ["Брендбук и SMM-стратегия", "Brand book & SMM strategy"],
  ["Маркетинг и продвижение", "Marketing & growth"],
  ["Создание сайтов", "Web development"],
  ["Контент / Съёмки", "Content / Production"],
  ["подробнее", "details"],
  ["от", "from"],
  ["ДВИЖЕНИЕ", "MOMENTUM"],
  ["ПРОРЫВ", "BREAKTHROUGH"],
  ["ТРИУМФ", "TRIUMPH"],
  ["ТАРИФЫ", "PACKAGES"],
  ["Узнать больше", "Learn more"],
  ["Начать работу", "Start a project"],
  ["Отзывы", "Testimonials"],
  ["смотреть проект", "view project"],
  ["Категории", "Categories"],
  ["смм", "smm"],
  ["маркетинг", "marketing"],
  ["нейросети", "AI"],
  ["визуал", "visuals"],
  ["тренды", "trends"],
  ["социальные сети", "social media"],
  ["продвижение", "growth"],
  ["Что реально влияет на продажи в 2026", "What Really Drives Sales in 2026"],
  ["В 2026 продажи больше не зависят только от продукта. Сильный продукт...", "In 2026, sales no longer depend on the product alone. A strong offer..."],
  ["Claude для бизнеса простым языком", "Claude for Business, Explained Simply"],
  ["ИИ перестаёт быть просто «чатом для вопросов». В 2026 году такие...", "AI is becoming more than a chat for occasional questions. In 2026..."],
  ["Instagram больше не хочет, чтобы вы росли по старым правилам", "Instagram Growth Rules Have Changed"],
  ["За последние месяцы многие бизнесы начали...", "Over the past few months, many businesses have started..."],
  ["4 сервиса для создания визуала", "Four Tools for Better Social Media Visuals"],
  ["Хороший визуал больше не требует сложного продакшена...", "Strong visuals no longer require overly complex production..."],
  ["читать", "read"],
  ["новое", "new"],
  ["Имя", "Name"],
  ["Телефон", "Phone"],
  ["Бюджет", "Budget"],
  ["Отправить", "Send"],
  ["Спасибо!", "Thank you!"],
  ["Закрыть", "Close"],
  ["компания", "company"],
  ["full-book", "Full occupancy:"],
  ["Sold Out", "Sold out"],
  ["×2", "2× growth in the"],
  ["×3", "3× growth in"],
  ["×4", "4× growth in"],
];

function fallbackEnglishText(content: string) {
  if (!/[А-Яа-яЁё]/.test(content)) return content;
  const text = content.replaceAll("&nbsp;", " ").replace(/\s+/g, " ").trim();
  const lower = text.toLowerCase();

  const caseTranslation = CASE_TRANSLATIONS[text];
  if (caseTranslation) return caseTranslation;

  const short: Record<string, string> = {
    "контент": "Content",
    "и съёмки": "& production",
    "агентство": "agency",
    "полного": "full",
    "цикла": "service",
    "в источник клиентов": "into a source of customers",
    "работаем": "working",
    "в нише": "in the industry",
    "работаем в нише": "in the industry",
    "подробнее →": "Details →",
    "узнайте, какой тариф вам подходит": "Find the package that fits your goals",
    "компания": "Company",
    "компания:": "Company:",
    "услуги": "Services",
    "контакты": "Contacts",
    "юлия": "Yulia",
    "максим": "Maxim",
    "антон": "Anton",
    "наталья": "Natalia",
    "анастасия": "Anastasia",
    "елена и георгий": "Elena & Georgiy",
    "личный экспертный": "Personal expert",
    "блог": "blog",
    "сайтов": "websites",
    "кампаний, разработки": "campaigns and development of",
    "и btl-активаций": "and BTL activations",
    "от": "from",
  };
  if (short[lower]) return short[lower];

  // The mobile Figma export splits these compact labels around slashes,
  // so they do not always match the exact text map above.
  if (text.length < 60 && lower.includes("стратегия")) return "Strategy";
  if (text.length < 60 && lower.includes("брендинг")) return "Branding";
  if (text.length < 60 && lower.includes("ведение соцсетей")) return "Social media management";
  if (text.length < 60 && lower.includes("контент") && lower.includes("съём")) return "Content & production";
  if (text.length < 60 && lower.includes("продвижение")) return "Growth";

  if (lower.includes("одна команда на все задачи")) return "One team for every task — turning your social media";
  if (lower.includes("фундамент, на котором держится")) return "A complete communication system: positioning, tone of voice, visual direction and content rules your team can use consistently.";
  if (lower.includes("ведём соцсети под ключ")) return "End-to-end social media management: strategy, content, design, publishing and reporting adapted to your platform, audience and business goals.";
  if (lower.includes("растим охваты")) return "We grow reach, strengthen engagement and attract new audiences through paid growth and genuine community work.";
  if (lower.includes("корпоративные сайты")) return "Corporate websites, landing pages and ecommerce experiences — from structure and prototype to design, development and launch.";
  if (lower.includes("снимаем фото и видео")) return "Photography and video production for social media, brands and events — from the initial concept to a ready-to-use content library.";

  if (lower.includes("всё, что необходимо на запуске") || lower.includes("все, что необходимо на запуске")) return "Everything needed to launch and scale your project";
  if (lower.includes("от анализа до результатов")) return "From analysis to measurable results:";
  if (lower.includes("для тех, кто хочет присутствовать")) return "For brands that need a consistent presence and visuals worthy of their identity.";
  if (lower.includes("для тех, кто хочет наращивать")) return "For brands ready to grow reach, engage audiences and generate leads.";
  if (lower.includes("для тех, кто хочет вывести контент")) return "For brands ready to elevate content and attract customers beyond social media.";

  if (lower.includes("мы помогаем как крупному")) return "We help established companies";
  if (lower.includes("так и малому бизнесу")) return "and growing businesses solve real challenges";
  if (lower.includes("детально погружаемся в бизнес")) return "We immerse ourselves in your business";
  if (lower.includes("и предлагаем стратегию")) return "and build a focused strategy";
  if (lower.includes("и инструменты, которые работают")) return "using tools that work";
  if (lower.includes("именно в вашей нише")) return "for your category";
  if (lower.includes("инструменты, которые работают") && lower.includes("вашей нише")) return "with tools that work for your category";
  if (lower.includes("от контекстной рекламы")) return "From paid search and social ads";
  if (lower.includes("таргета до influence")) return "to influencer campaigns and web development";

  if (lower.includes("мы работаем с командой smm-специалистов")) return "The team quickly understood our goals, built a clear content plan and helped us grow reach and engagement. Communication has been fast, thoughtful and consistently professional.";
  if (lower.includes("работаем уже продолжительное время")) return "I AM AGENCY created a distinctive product and a system that genuinely separates us from competitors. The team combines strong creative judgement with reliable delivery.";
  if (lower.includes("smm-команда, с которой легко работать")) return "An SMM team that is easy to work with — and whose results are easy to see.";
  if (lower.includes("мы перепробовали несколько подходов")) return "After trying freelancers, in-house specialists and other agencies, we found the right balance of structure, professionalism and human communication.";
  if (lower.includes("больше всего ценим прозрачность")) return "We value the team's transparency and speed. The work, reasoning and expected effect are always clear, while edits and reporting arrive on time.";
  if (lower.includes("с агентством работаем каждый сезон")) return "We work with the agency every concert season in Bali. Strong production and paid media support helped us achieve sold-out events.";
  if (lower.includes("крутой продакшен")) return "Strong production and execution, with paid media that supported sold-out events.";
  if (lower.includes("работаем с командой больше 3 лет")) return "We have worked with the team for more than three years and remain very happy with the partnership.";
  if (lower.includes("ребята разработали стратегию")) return "The team developed our strategy and now covers the full scope of online marketing.";
  if (lower.includes("хочу поблагодарить вашу команду")) return "I want to thank the team for their work.";
  if (lower.includes("когда вы приступили к нашему проекту")) return "From the start, the team brought clarity to our content direction, proposed strong ideas and immersed themselves deeply in a complex project.";
  if (lower.includes("при этом вы лояльно относитесь")) return "The team handles feedback with care and shows the confidence of experienced professionals.";
  if (lower.includes("спасибо вам большое")) return "Thank you very much!";
  if (lower.includes("если вам нужны настоящие профессионалы")) return "If you need genuine social media professionals";
  if (lower.includes("для работы с соцсетями")) return "for your social media, you are in the right place.";
  if (lower.includes("мне создали уникальный продукт")) return "The team created a distinctive product that stands apart from competitors.";
  if (lower.includes("не верится, что это было возможно")) return "It still feels remarkable that this result was possible.";
  if (lower.includes("честно говоря, долго подбираю слова")) return "It is difficult to put the result into words.";
  if (lower.includes("не могу полностью выразить")) return "I AM is a rare team — creative, committed and genuinely valuable.";
  if (lower.includes("отдельно хочется отметить")) return "Communication is easy and responsive, and every request is handled with care.";
  if (lower.includes("спасибо вам за отличную работу")) return "Thank you for the excellent work — we look forward to continuing together.";
  if (lower.includes("от этого ожидать эффект")) return "and the expected impact is always clear. Edits, posts and reports arrive on time.";
  if (lower.includes("и солд аут на все мероприятия")) return "and helped every event sell out.";
  if (lower.includes("очень довольны сотрудничеством")) return "and remain very happy with the partnership.";
  if (lower.includes("и полностью закрывают все услуги")) return "and cover our full online marketing scope.";
  if (lower.includes("в наш проект") && lower.includes("нестандартный")) return "into our unusual, fast-changing project.";
  if (lower.includes("и изменениям") && lower.includes("профессионализм")) return "and changes with the confidence of experienced professionals.";

  if (lower.includes("fancy decor")) return "Fancy Decor · Full-service event design";
  if (lower.includes("belousov studio")) return "BELOUSOV STUDIO · Architecture bureau";
  if (lower.includes("travel times")) return "Travel Times · Family travel brand";
  if (lower.includes("семейный бренд путешествий")) return "Family travel brand with destinations around the world";
  if (lower.includes("connected show")) return "Connected Show · International concert production";
  if (lower.includes("организация концертов")) return "International concert production";
  if (lower.includes("altay village")) return "Altay Village · Project development director";
  if (lower.includes("директор по развитию")) return "Project development director";

  if (lower.includes("обучаем smm уже 7 лет")) return "We have taught SMM for seven years. More than 350 students now manage major brands, work remotely around the world and join the I AM team.";
  if (lower.includes("обучение подойдёт тем")) return "The course is designed for people changing careers, building a stable remote income or aiming to join a professional SMM team.";
  if (lower.includes("введение. запуск проекта")) return "Introduction. Project launch. Instagram. Reels. Influencer work. Telegram. VK. Marketing. Weekly masterminds and an online graduation project.";

  if (lower.includes("ип громова")) return "Sole proprietor M. A. Gromova · Tax ID 420545021010 · Registration No. 324420500100030";
  if (lower.includes("согласие на обработку")) return "Personal data consent";
  if (lower.includes("личный экспертный") && lower.includes("блог")) return "Personal expert blog";

  const automatic = (autoTranslations as Record<string, string>)[text];
  if (automatic) return automatic;

  // Unknown copy must stay visible for QA. Replacing it with the brand name
  // created plausible-looking but nonsensical English sentences on production.
  return content;
}

export function translateGeneratedHtml(source: string) {
  let translated = source.replace(/&#(\d+);/g, (entity, code: string) => {
    const value = Number(code);
    return value >= 1024 && value <= 1279 ? String.fromCharCode(value) : entity;
  });
  for (const [from, to] of PATH_REPLACEMENTS.sort((a, b) => b[0].length - a[0].length)) {
    translated = translated.replaceAll(from, to);
  }
  const textMap = new Map(TEXT_REPLACEMENTS);
  return translated.replace(/>([^<>]*)</g, (match, text: string) => {
    const leading = text.match(/^\s*/)?.[0] || "";
    const trailing = text.match(/\s*$/)?.[0] || "";
    const content = text.slice(leading.length, text.length - trailing.length);
    const replacement = textMap.get(content) ?? fallbackEnglishText(content);
    return replacement === content ? match : `>${leading}${replacement}${trailing}<`;
  });
}
