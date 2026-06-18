import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { Phone, MessageCircle, ArrowUp, Menu, X, Plus, Minus } from "lucide-react";
import heroImg from "@/assets/nen-construction.png.asset.json";
import factoryImg from "@/assets/nen-factory.png.asset.json";
import jbiFsAsset from "@/assets/fs-fo.jpeg.asset.json";
import jbiFoAsset from "@/assets/fo-fm.jpeg.asset.json";
import jbiFm2Asset from "@/assets/fm2-new.webp.asset.json";
const jbiFm2 = jbiFm2Asset.url;
import jbiFbsAsset from "@/assets/fbs-block.jpeg.asset.json";
import jbiFbs2466Asset from "@/assets/fbs-2466.jpeg.asset.json";
import jbiPkAsset from "@/assets/pk-plate.jpeg.asset.json";
import jbiPileAsset from "@/assets/pile-c.jpeg.asset.json";
import jbiLvAsset from "@/assets/lv-l205.jpeg.asset.json";
import jbiKsAsset from "@/assets/ks-zk1100.jpeg.asset.json";
import jbiKtAsset from "@/assets/kt-kks.jpeg.asset.json";
const jbiFs = jbiFsAsset.url;
const jbiFo = jbiFoAsset.url;
const jbiFbs = jbiFbsAsset.url;
const jbiFbs2466 = jbiFbs2466Asset.url;
const jbiPk = jbiPkAsset.url;
const jbiPile = jbiPileAsset.url;
const jbiLv = jbiLvAsset.url;
const jbiKs = jbiKsAsset.url;
const jbiKt = jbiKtAsset.url;
import productionImg from "@/assets/nen-production.png.asset.json";
import pipelineImg from "@/assets/nen-project-pipeline.png.asset.json";
import yardImg from "@/assets/nen-project-yard.png.asset.json";
import roadImg from "@/assets/nen-project-road.png.asset.json";
import craneImg from "@/assets/nen-project-crane.png.asset.json";
import yard2Img from "@/assets/nen-project-yard2.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NEN GROUP KZ — Железобетонные изделия в Шымкенте | ЖБИ от производителя" },
      { name: "description", content: "Производство и поставка железобетонных изделий в Шымкенте. Фундаментные блоки, плиты перекрытий, сваи, кольца, лотки. Прямые цены завода. +7 775 314-41-41" },
      { property: "og:title", content: "NEN GROUP KZ — Железобетонные изделия в Шымкенте" },
      { property: "og:description", content: "Производство и поставка ЖБИ в Шымкенте и Туркестанской области." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Page,
});

const PHONE = "+7 (775) 314-41-41";
const TEL = "tel:+77753144141";
const WA = "https://wa.me/77753144141";

/* ---------- fade-up observer ---------- */
function useFadeUp() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".fade-up");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e, i) => {
          if (e.isIntersecting) {
            setTimeout(() => e.target.classList.add("fade-up-in"), i * 60);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ---------- number counter ---------- */
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [v, setV] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver((es) => {
      es.forEach((e) => {
        if (e.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const dur = 1400;
          const step = (t: number) => {
            const p = Math.min(1, (t - start) / dur);
            setV(Math.round(to * (1 - Math.pow(1 - p, 3))));
            if (p < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      });
    });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [to]);
  return <span ref={ref}>{v}{suffix}</span>;
}

/* ---------- section header ---------- */
function SectionHead({ num, title, subtitle, center = false, white = false }: { num?: string; title: string; subtitle?: string; center?: boolean; white?: boolean }) {
  return (
    <div className={`fade-up ${center ? "text-center mx-auto max-w-3xl" : "max-w-3xl"} mb-12`}>
      {num && <div className="section-label">{num}</div>}
      <hr className={`sage-rule ${center ? "mx-auto" : ""}`} />
      <h2 className={`font-serif text-3xl md:text-[40px] leading-tight ${white ? "text-white" : "text-darktext"}`}>{title}</h2>
      {subtitle && <p className={`mt-4 text-base md:text-[16px] ${white ? "text-warmgray" : "text-warmgray"}`}>{subtitle}</p>}
    </div>
  );
}

/* ============ DATA ============ */
const products = [
  { cat: "Фундаменты", title: "Фундамент стаканного типа ФС/ФО", concrete: "Бетон М300 (B22,5)", use: "Под колонны промышленных и гражданских зданий", img: jbiFs },
  { cat: "Фундаменты", title: "Фундамент под опору с гидроизоляцией ФО/ФМ", concrete: "Бетон М300–М400 (B22,5–B30)", use: "Опоры ЛЭП, освещения, контактных сетей", img: jbiFo },
  { cat: "Фундаменты", title: "Фундамент для дорожных знаков ФМ2", concrete: "Бетон М200 (B15)", use: "Установка дорожных знаков и указателей", img: jbiFm2 },
  { cat: "Фундаменты", title: "Фундаментный блок ФБС", concrete: "Бетон М200–М300 (B15–B22,5)", use: "Ленточные фундаменты, стены подвалов", img: jbiFbs },
  { cat: "Фундаменты", title: "Фундаментный блок ФБС 24.6.6", concrete: "Бетон М200 (B15)", use: "Ленточные фундаменты, стены подвалов и технических помещений. Размеры: 2380×600×580 мм", img: jbiFbs2466 },
  { cat: "Перекрытия", title: "Плита перекрытия ПК", concrete: "Бетон М300–М400 (B22,5–B30)", use: "Межэтажные перекрытия жилых и промышленных зданий", img: jbiPk },
  { cat: "Сваи", title: "Свая забивная квадратная С 200×200 / 300×300", concrete: "Бетон М300 (B22,5)", use: "Свайные фундаменты на слабых грунтах", img: jbiPile },
  { cat: "Трубы, лотки и колодцы", title: "Лоток Л 20.5", concrete: "Бетон М300 (B22,5)", use: "Лоток предотвращает контакт силового кабеля с землей", img: jbiLv },
  { cat: "Трубы, лотки и колодцы", title: "Кольцо колодезное КС 10.10 / ЗК 1.100", concrete: "Бетон М200–М300 (B15–B22,5)", use: "Канализационные и водопроводные колодцы", img: jbiKs },
  { cat: "Трубы, лотки и колодцы", title: "Камера тепловая / кабельная КТ/ККС", concrete: "Бетон М300 (B22,5)", use: "Тепловые сети и кабельные коммуникации", img: jbiKt },
];
const categories = ["Все", "Фундаменты", "Перекрытия", "Сваи", "Трубы, лотки и колодцы"];


const faqs = [
  { q: "Какой минимальный объём заказа?", a: "Минимальный заказ не ограничен. Работаем как с единичными изделиями, так и с крупными партиями. При объёмных заказах — оптовые условия." },
  { q: "Есть ли доставка?", a: "Да, организуем доставку по Шымкенту и Туркестанской области. Стоимость доставки рассчитывается отдельно в зависимости от объёма и расстояния." },
  { q: "Какие документы получает покупатель?", a: "Паспорт качества на продукцию, товарную накладную и счёт-фактуру. По запросу — сертификат соответствия." },
  { q: "Можно ли забрать продукцию самовывозом?", a: "Да, самовывоз доступен с нашего склада по адресу: г. Шымкент, Каратауский район, м-н Таскен, 1 этаж." },
  { q: "Какие марки бетона используются?", a: "Производим изделия из бетона марок М200–М400 в зависимости от требований нормативной документации на каждый вид изделия." },
  { q: "Работаете ли вы с физическими лицами?", a: "Да, работаем как с юридическими, так и с физическими лицами. Для физлиц — оплата наличными или переводом." },
  { q: "Как оформить заказ?", a: "Позвоните по номеру +7 (775) 314-41-41 или оставьте заявку на сайте. Уточним параметры, рассчитаем стоимость и согласуем сроки." },
  { q: "Каков срок изготовления нестандартных изделий?", a: "Срок изготовления нестандартных изделий согласовывается индивидуально в зависимости от сложности и объёма. Уточняйте при оформлении заказа." },
];

/* ============ HEADER ============ */
function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const nav = [
    { l: "О компании", h: "#about" },
    { l: "Продукция", h: "#products" },
    { l: "Производство", h: "#production" },
    { l: "Проекты", h: "#projects" },
    { l: "Контакты", h: "#contacts" },
  ];

  return (
    <header className="sticky top-0 z-50">
      <div className="bg-[#1C1C1C] text-[#A0A0A0]" style={{ height: 32 }}>
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-full flex items-center justify-between text-[12px]">
          <span className="truncate">г. Шымкент, Каратауский район, м-н Таскен, 1 этаж</span>
          <span className="hidden sm:block">Пн–Пт 9:00–18:00</span>
        </div>
      </div>
      <div className={`bg-white transition-shadow ${scrolled ? "shadow-[0_1px_8px_rgba(0,0,0,0.06)] border-b border-sage" : "border-b border-linecolor"}`}>
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-[68px] flex items-center justify-between">
          <a href="#top" className="flex flex-col leading-none">
            <span className="flex items-baseline gap-2">
              <span className="font-serif text-[26px] md:text-[28px] text-darktext">NEN</span>
              <span className="font-heading font-medium text-[13px] md:text-[14px] text-sage tracking-[0.2em]">GROUP KZ</span>
            </span>
            <span className="text-[11px] text-warmgray mt-1 hidden sm:block">Производство железобетонных изделий</span>
          </a>
          <nav className="hidden lg:flex items-center gap-7">
            {nav.map((n) => (
              <a key={n.h} href={n.h} className="font-heading font-medium text-[14px] text-darktext relative group">
                {n.l}
                <span className="absolute left-0 -bottom-1 w-0 h-px bg-sage transition-all group-hover:w-full" />
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3 md:gap-5">
            <a href={TEL} className="hidden md:block font-heading font-semibold text-[15px] text-darktext">{PHONE}</a>
            <a href="#contact-form" className="hidden md:inline-flex bg-sage text-white font-heading font-medium text-[13px] px-5 py-[10px] rounded hover:bg-sage-dark transition-colors">
              Оставить заявку
            </a>
            <button className="lg:hidden p-2" onClick={() => setOpen(!open)} aria-label="menu">
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
        {open && (
          <div className="lg:hidden border-t border-linecolor bg-white">
            <div className="px-4 py-4 flex flex-col gap-3">
              {nav.map((n) => (
                <a key={n.h} href={n.h} onClick={() => setOpen(false)} className="font-heading text-[14px] py-1">{n.l}</a>
              ))}
              <a href={TEL} className="font-heading font-semibold text-[15px] mt-2">{PHONE}</a>
              <a href="#contact-form" onClick={() => setOpen(false)} className="bg-sage text-white text-center font-heading font-medium text-[13px] px-5 py-3 rounded">Оставить заявку</a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

/* ============ MAP (client only) ============ */
function MapBlock() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let map: any;
    let cancelled = false;
    (async () => {
      const L = await import("leaflet");
      // fix icon paths
      // @ts-ignore
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });
      if (cancelled || !ref.current) return;
      map = L.map(ref.current).setView([42.2823, 69.6401], 14);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap",
      }).addTo(map);
      L.marker([42.2823, 69.6401]).addTo(map).bindPopup(
        "<b>NEN GROUP KZ</b><br>м-н Таскен, Каратауский район<br>+7 (775) 314-41-41"
      ).openPopup();
    })();
    return () => { cancelled = true; if (map) map.remove(); };
  }, []);
  return <div ref={ref} className="h-[400px] w-full rounded-md border border-linecolor" />;
}

/* ============ PAGE ============ */
function Page() {
  useFadeUp();
  const [activeCat, setActiveCat] = useState("Все");
  const [showTop, setShowTop] = useState(false);
  const [showFloat, setShowFloat] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    const t = setTimeout(() => setShowFloat(true), 2000);
    return () => { window.removeEventListener("scroll", onScroll); clearTimeout(t); };
  }, []);

  const filtered = useMemo(
    () => activeCat === "Все" ? products : products.filter((p) => p.cat === activeCat),
    [activeCat]
  );

  return (
    <div id="top" className="min-h-screen bg-cream text-darktext">
      <Header />

      {/* BLOCK 2 - HERO */}
      <section className="relative bg-cream linen">
        <div className="absolute left-0 top-1/4 bottom-1/4 w-[3px] bg-sage hidden md:block" />
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:pl-20 py-16 md:py-0 md:min-h-[calc(100vh-100px)] flex items-center">
          <div className="grid lg:grid-cols-[52%_48%] gap-10 lg:gap-14 items-center w-full">
            <div className="fade-up">
              <div className="section-label">ПРОИЗВОДСТВЕННО-ТОРГОВАЯ КОМПАНИЯ</div>
              <h1 className="font-serif text-[34px] sm:text-[42px] md:text-[60px] lg:text-[72px] leading-[1.05] text-darktext mt-4 break-words hyphens-auto">
                Железобетонные изделия высокой надёжности
              </h1>
              <hr className="sage-rule" style={{ margin: "28px 0" }} />
              <p className="text-warmgray text-[16px] md:text-[18px] leading-[1.7] max-w-[480px]">
                NEN GROUP KZ — производство и поставка железобетонных конструкций в Шымкенте и Туркестанской области. Проверено временем и строительной практикой.
              </p>
              <div className="flex flex-wrap gap-3 mt-9">
                <a href="#products" className="bg-sage text-white font-heading font-medium px-7 py-[14px] rounded hover:bg-sage-dark transition-colors">Смотреть продукцию</a>
                <a href="#contact-form" className="border border-darktext text-darktext font-heading font-medium px-7 py-[14px] rounded hover:bg-darktext hover:text-white transition-colors">Связаться с нами</a>
              </div>
            </div>
            <div className="fade-up">
              <img src={heroImg.url} alt="Производство ЖБИ" className="w-full h-[280px] sm:h-[380px] md:h-[520px] object-cover rounded-md" />
              <div className="grid grid-cols-3 gap-3 sm:gap-6 md:gap-12 mt-6 sm:justify-end">
                {[{n:10,s:"",l:"лет опыта"},{n:500,s:"+",l:"объектов"},{n:20,s:"+",l:"видов продукции"}].map((s,i)=>(
                  <div key={i} className="text-center sm:text-right">
                    <div className="font-serif text-[26px] sm:text-[32px] md:text-[36px] text-darktext leading-none"><Counter to={s.n} suffix={s.s} /></div>
                    <div className="text-[10px] sm:text-[11px] text-warmgray uppercase tracking-wider mt-2 leading-tight">{s.l}</div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* BLOCK 3 - О компании */}
      <section id="about" className="bg-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <SectionHead num="01" title="О компании NEN GROUP KZ" subtitle="Производство и поставка железобетонных изделий с опытом более 10 лет" />
          <div className="grid lg:grid-cols-[55%_45%] gap-10">
            <div className="fade-up">
              <div className="space-y-5 text-[16px] leading-[1.8] text-[#3A3A3A]">
                <p>NEN GROUP KZ — производственно-торговая компания, специализирующаяся на производстве железобетонных изделий для строительной отрасли Шымкента и Туркестанской области.</p>
                <p>Мы производим и поставляем широкий ассортимент ЖБИ: фундаментные блоки, плиты перекрытий, сваи, лотки, кольца и другие конструкции. Вся продукция соответствует действующим стандартам качества.</p>
                <p>За годы работы NEN GROUP KZ стала надёжным партнёром для строительных компаний, подрядчиков и застройщиков региона.</p>
              </div>
              <div className="grid sm:grid-cols-2 gap-4 mt-7">
                {[
                  { t: "Собственное производство", d: "Полный производственный цикл — от армирования до готового изделия." },
                  { t: "Гарантия качества", d: "Соответствие ГОСТ на каждое изделие. Документы по запросу." },
                ].map((c) => (
                  <div key={c.t} className="bg-cream border border-linecolor rounded-md p-5 border-l-[4px] border-l-sage">
                    <div className="font-heading font-semibold text-[14px] text-darktext mb-2">{c.t}</div>
                    <div className="text-[14px] text-warmgray">{c.d}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="fade-up">
              <img src={factoryImg.url} alt="Завод" className="w-full h-[300px] md:h-[360px] object-cover rounded-md" />
              <div className="bg-cream border border-linecolor rounded-md p-5 mt-4">
                <div className="font-heading font-semibold text-[14px] mb-2">Наш адрес</div>
                <div className="text-[14px] text-warmgray leading-relaxed">
                  г. Шымкент, Каратауский район<br/>
                  м-н Таскен, 1 этаж<br/>
                  <a href={TEL} className="hover:text-sage">+7 (775) 314-41-41</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BLOCK 4 - Преимущества */}
      <section className="bg-cream linen py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <SectionHead num="02" title="Почему выбирают нас" subtitle="Надёжность, подтверждённая годами работы на строительном рынке" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { n: "01", t: "Собственное производство", d: "Производим изделия на собственном предприятии без посредников. Прямые цены завода." },
              { n: "02", t: "Соответствие стандартам", d: "Вся продукция производится по действующим ГОСТ. Паспорт качества прилагается к каждой партии." },
              { n: "03", t: "Широкий ассортимент", d: "Более 20 видов железобетонных изделий для различных видов строительства." },
              { n: "04", t: "Опыт более 10 лет", d: "За годы работы накоплен опыт поставок для жилого, промышленного и инфраструктурного строительства." },
              { n: "05", t: "Работа по договору", d: "Оформляем договор поставки. Полный пакет закрывающих документов для юридических лиц." },
              { n: "06", t: "Доставка по региону", d: "Организуем доставку по Шымкенту и Туркестанской области. Крупный и малый тоннаж." },
            ].map((c) => (
              <div key={c.n} className="fade-up relative bg-white border border-linecolor rounded-md p-7 border-t-2 border-t-transparent hover:border-t-sage hover:border-sage transition-colors group overflow-hidden">
                <div className="absolute -top-3 right-4 font-serif text-[48px] text-sage-light leading-none select-none">{c.n}</div>
                <div className="relative">
                  <div className="font-heading font-semibold text-[15px] text-darktext mb-3">{c.t}</div>
                  <div className="text-[14px] text-warmgray leading-[1.6]">{c.d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BLOCK 5 - Каталог */}
      <section id="products" className="bg-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <SectionHead num="03" title="Железобетонные изделия" subtitle="Производим и поставляем полный ассортимент ЖБИ для строительства" />
          <div className="flex flex-wrap gap-2 mb-10">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActiveCat(c)}
                className={`font-heading font-medium text-[13px] px-4 py-2 rounded transition-colors ${
                  activeCat === c ? "bg-sage text-white" : "bg-cream border border-linecolor text-warmgray hover:border-sage"
                }`}
              >{c}</button>
            ))}
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((p) => (
              <div key={p.title} className="float-in bg-white border border-linecolor rounded-md overflow-hidden hover:border-sage transition-all hover:shadow-[0_4px_18px_rgba(0,0,0,0.05)] flex flex-col">
                <div className="h-[200px] bg-[#F0F0EC] overflow-hidden">
                  <img src={p.img} alt={p.title} className="w-full h-full object-cover" loading="lazy" width={800} height={600} />
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <div className="section-label mb-2">{p.cat}</div>
                  <div className="font-heading font-semibold text-[15px] text-darktext mb-3 min-h-[44px]">{p.title}</div>
                  <div className="space-y-2 mb-4 flex-1">
                    <div className="text-[13px] text-warmgray"><span className="text-darktext font-medium">Бетон: </span>{p.concrete.replace(/^Бетон\s*/, "")}</div>
                    <div className="text-[13px] text-warmgray"><span className="text-darktext font-medium">Применение: </span>{p.use}</div>
                  </div>
                  <a href="#contact-form" className="font-heading font-medium text-[13px] text-sage hover:text-sage-dark self-start">Запросить цену →</a>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <a href="#contact-form" className="inline-block border border-sage text-sage font-heading font-medium px-7 py-3 rounded hover:bg-sage hover:text-white transition-colors">Запросить полный прайс-лист</a>
          </div>
        </div>
      </section>

      {/* BLOCK 6 - Производство */}
      <section id="production" className="bg-[#1C1C1C] py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <SectionHead num="04" title="Наше производство" subtitle="Полный производственный цикл на собственном предприятии" white />
          <div className="grid lg:grid-cols-2 gap-10 items-stretch">
            <div className="fade-up relative">
              <div className="absolute left-[15px] top-4 bottom-4 w-px bg-sage/40" />
              <div className="space-y-8">
                {[
                  { n: 1, t: "Армирование", d: "Подготовка арматурных каркасов в соответствии с проектными нагрузками." },
                  { n: 2, t: "Бетонирование", d: "Заливка бетона марок М200–М400. Вибрирование для равномерного распределения смеси." },
                  { n: 3, t: "Твердение", d: "Выдержка изделий в условиях, обеспечивающих набор прочности по графику." },
                  { n: 4, t: "Контроль и маркировка", d: "Приёмочный контроль. Маркировка изделий. Оформление паспорта качества." },
                ].map((s) => (
                  <div key={s.n} className="flex gap-5 items-start relative">
                    <div className="w-8 h-8 rounded-full bg-sage text-white font-heading font-semibold flex items-center justify-center flex-shrink-0 relative z-10">{s.n}</div>
                    <div>
                      <div className="font-heading font-semibold text-white text-[15px] mb-2">{s.t}</div>
                      <div className="text-[14px] text-[#8A8A8A] leading-[1.6]">{s.d}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="fade-up">
              <img src={productionImg.url} alt="Производство" className="w-full h-full min-h-[400px] object-cover rounded-md" />
            </div>
          </div>
        </div>
      </section>

      {/* BLOCK 7 - Стандарты */}
      <section className="bg-cream linen py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <SectionHead num="05" title="Стандарты качества" subtitle="Вся продукция соответствует действующим государственным стандартам" />
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { t: "Бетон", list: ["Марки М200, М250, М300, М350, М400", "Класс прочности В15–В30", "Морозостойкость F100–F200", "Водонепроницаемость W4–W8"] },
              { t: "Арматура", list: ["Класс А-III (А400)", "Диаметр 8–32 мм", "Сталь по ГОСТ 5781-82", "Защитный слой по нормативу"] },
              { t: "Контроль", list: ["Входной контроль материалов", "Пооперационный контроль", "Приёмочные испытания", "Паспорт качества на партию"] },
            ].map((c) => (
              <div key={c.t} className="fade-up bg-white border border-linecolor rounded-md p-8">
                <div className="font-heading font-semibold text-[16px] text-darktext mb-5">{c.t}</div>
                <ul className="space-y-3">
                  {c.list.map((l) => (
                    <li key={l} className="text-[14px] text-warmgray flex gap-3">
                      <span className="text-sage flex-shrink-0">—</span><span>{l}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BLOCK 8 - Проекты */}
      <section id="projects" className="bg-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <SectionHead num="06" title="Реализованные проекты" subtitle="Наши изделия применены на объектах жилого, промышленного и инфраструктурного строительства" />
          <div className="grid md:grid-cols-2 gap-5">
            {[
              { cat: "ЖИЛОЕ СТРОИТЕЛЬСТВО", t: "Жилой комплекс, Каратауский район", d: "ФБС, плиты перекрытий · 2023", img: craneImg.url },
              { cat: "ИНФРАСТРУКТУРА", t: "Дорожное строительство, ЮКО", d: "Дорожные плиты ПД · 2022", img: roadImg.url },
              { cat: "ПРОМЫШЛЕННОЕ", t: "Производственный объект, Шымкент", d: "Сваи С-90, фундаментные блоки · 2023", img: yard2Img.url },
              { cat: "ИНФРАСТРУКТУРА", t: "Водоотводная система, Туркестанская обл.", d: "Кольца КС, лотки ЛВ · 2022", img: pipelineImg.url },
            ].map((p) => (
              <div key={p.t} className="fade-up bg-white border border-linecolor rounded-md overflow-hidden hover:border-sage transition-colors">
                <img src={p.img} alt={p.t} className="w-full h-[200px] object-cover" loading="lazy" />
                <div className="p-6">
                  <div className="section-label mb-2">{p.cat}</div>
                  <div className="font-heading font-semibold text-[15px] text-darktext mb-2">{p.t}</div>
                  <div className="text-[13px] text-warmgray">{p.d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BLOCK 9 - Прайс */}
      <PriceBlock />

      {/* BLOCK 10 - Калькулятор */}
      <CalculatorBlock />

      {/* BLOCK 11 - Документы */}
      <section className="bg-cream linen py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <SectionHead num="09" title="Документы" subtitle="Работаем официально. Полный пакет документов для юридических лиц." />
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              {[
                { t: "Паспорт качества", d: "Выдаётся на каждую партию продукции с указанием характеристик бетона и арматуры.", b: "Запросить образец" },
                { t: "Сертификат соответствия", d: "Продукция сертифицирована в соответствии с требованиями технических регламентов.", b: "Запросить копию" },
                { t: "Договор поставки", d: "Заключаем договор с юридическими лицами. Безналичный расчёт. Накладные и счёт-фактуры.", b: "Получить реквизиты" },
              ].map((c) => (
                <div key={c.t} className="fade-up bg-white border border-linecolor rounded-md p-6 border-l-[4px] border-l-sage">
                  <div className="font-heading font-semibold text-[15px] text-darktext mb-2">{c.t}</div>
                  <div className="text-[14px] text-warmgray mb-4">{c.d}</div>
                  <a href="#contact-form" className="inline-block border border-sage text-sage font-heading font-medium text-[13px] px-4 py-2 rounded hover:bg-sage hover:text-white transition-colors">{c.b}</a>
                </div>
              ))}
            </div>
            <div className="fade-up bg-[#1C1C1C] rounded-md p-8">
              <div className="font-serif text-white text-[20px] mb-4">Закрывающие документы</div>
              <hr className="sage-rule" />
              <ul className="space-y-2 mt-4">
                {["Договор поставки", "Товарная накладная", "Счёт-фактура", "Паспорт качества", "Сертификат соответствия", "Акт приёма-передачи"].map((l) => (
                  <li key={l} className="text-[14px] text-white flex gap-3 leading-[2]"><span className="text-sage">—</span>{l}</li>
                ))}
              </ul>
              <div className="text-[13px] text-[#6B6B6B] mt-5 mb-5">Работаем с ТОО, АО, ИП и физическими лицами</div>
              <a href="#contact-form" className="block text-center bg-sage text-white font-heading font-medium py-3 rounded hover:bg-sage-dark transition-colors">Оставить заявку</a>
            </div>
          </div>
        </div>
      </section>

      {/* BLOCK 12 - FAQ */}
      <FAQBlock />

      {/* BLOCK 13 - Команда */}
      <section className="bg-cream linen py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <SectionHead num="11" title="Специалисты компании" subtitle="Опытная команда с многолетней практикой в производстве ЖБИ" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { n: "Руководитель компании", p: "ГЕНЕРАЛЬНЫЙ ДИРЕКТОР", e: "Более 10 лет в строительной отрасли" },
              { n: "Главный технолог", p: "ТЕХНОЛОГ ПРОИЗВОДСТВА", e: "Специалист по производству ЖБИ" },
              { n: "Инженер ОТК", p: "КОНТРОЛЬ КАЧЕСТВА", e: "Приёмка и паспортизация продукции" },
              { n: "Менеджер по продажам", p: "КОММЕРЧЕСКИЙ ОТДЕЛ", e: "Работа с корпоративными клиентами" },
            ].map((m) => (
              <div key={m.n} className="fade-up bg-white border border-linecolor rounded-md p-6 text-center">
                <div className="w-[120px] h-[120px] bg-sage-light mx-auto rounded-md mb-5" />
                <div className="font-heading font-semibold text-[15px] text-darktext">{m.n}</div>
                <div className="text-[12px] text-sage uppercase tracking-wider mt-2">{m.p}</div>
                <div className="text-[12px] text-warmgray mt-2">{m.e}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BLOCK 14 - Клиенты */}
      <section className="bg-white py-20 md:py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center mb-10">
          <h2 className="font-serif text-[32px] text-darktext">Нам доверяют</h2>
          <p className="text-[15px] text-warmgray mt-3">Строительные компании и подрядчики Шымкента и Туркестанской области</p>
        </div>
        {[
          ["ТОО «Шымкент Курылыс»", "АО «Онтустик»", "ТОО «СтройМастер ЮКО»", "ГКП «Жилстрой»", "ТОО «Темп Строй»", "ТОО «КурылысГрупп»", "ТОО «ЮжКазСтрой»"],
          ["ТОО «Монолит Строй»", "ТОО «АлСтрой»", "ТОО «КазСтройКонтракт»", "ГКП «Коммунстрой»", "ТОО «МегаКурылыс»", "ТОО «ЖК Таскен»", "ТОО «Строй Инвест ЮКО»"],
        ].map((row, idx) => (
          <div key={idx} className="marquee-wrap overflow-hidden mb-3">
            <div className={`flex gap-3 w-max ${idx === 0 ? "marquee-track" : "marquee-track-reverse"}`}>
              {[...row, ...row, ...row].map((c, i) => (
                <div key={i} className="bg-cream border border-linecolor px-6 py-[10px] rounded font-heading font-medium text-[13px] text-darktext whitespace-nowrap hover:border-sage transition-colors">{c}</div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* BLOCK 15 - Карта и контакты */}
      <section id="contacts" className="bg-cream linen py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <SectionHead num="12" title="Как нас найти" />
          <div className="grid md:grid-cols-3 gap-5 mb-8">
            <div className="bg-white border border-linecolor rounded-md p-6 fade-up">
              <div className="font-heading font-semibold text-[14px] mb-3">Адрес</div>
              <div className="text-[14px] text-warmgray leading-relaxed mb-4">г. Шымкент<br/>Каратауский район<br/>м-н Таскен, 1 этаж</div>
              <a href="https://2gis.kz/shymkent/search/NEN%20GROUP%20KZ" target="_blank" rel="noopener" className="inline-block border border-sage text-sage font-heading text-[13px] px-4 py-2 rounded hover:bg-sage hover:text-white transition-colors">Маршрут</a>
            </div>
            <div className="bg-white border border-linecolor rounded-md p-6 fade-up">
              <div className="font-heading font-semibold text-[14px] mb-3">Телефон</div>
              <a href={TEL} className="block text-[14px] text-warmgray mb-4 hover:text-sage">{PHONE}</a>
              <a href={TEL} className="inline-block bg-sage text-white font-heading text-[13px] px-4 py-2 rounded hover:bg-sage-dark transition-colors">Позвонить</a>
            </div>
            <div className="bg-white border border-linecolor rounded-md p-6 fade-up">
              <div className="font-heading font-semibold text-[14px] mb-3">Режим работы</div>
              <div className="text-[14px] text-warmgray leading-relaxed">Понедельник — Пятница<br/>9:00 — 18:00</div>
            </div>
          </div>
          <div className="fade-up"><MapBlock /></div>
        </div>
      </section>

      {/* BLOCK 16 - Форма заявки */}
      <ContactForm />

      {/* BLOCK 17 - Форма вопроса */}
      <QuestionForm />

      {/* BLOCK 18 - Footer */}
      <Footer />

      {/* Floating */}
      {showFloat && (
        <div className="fixed right-4 bottom-20 md:bottom-4 z-40 flex flex-col gap-2 float-in">
          <a href={TEL} aria-label="Позвонить" className="w-12 h-12 bg-sage text-white rounded flex items-center justify-center hover:bg-sage-dark transition-colors"><Phone size={20} /></a>
          <a href={WA} target="_blank" rel="noopener" aria-label="WhatsApp" className="w-12 h-12 bg-[#25D366] text-white rounded flex items-center justify-center"><MessageCircle size={20} /></a>
          {showTop && (
            <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Наверх" className="w-12 h-12 bg-[#2A2A2A] border border-[#444] text-white rounded flex items-center justify-center"><ArrowUp size={20} /></button>
          )}
        </div>
      )}

      {/* Mobile bottom bar */}
      <div className="md:hidden fixed bottom-0 inset-x-0 z-40 h-[54px] bg-[#1C1C1C] border-t border-sage flex">
        <a href={TEL} className="flex-1 bg-sage text-white font-heading font-medium flex items-center justify-center">Позвонить</a>
        <a href={WA} target="_blank" rel="noopener" className="flex-1 bg-[#25D366] text-white font-heading font-medium flex items-center justify-center">WhatsApp</a>
      </div>
    </div>
  );
}

/* ============ BLOCK 9 PRICE ============ */
function PriceBlock() {
  const rows = [
    ["ФБС-24", "2400×600×600", "1,96 т"],
    ["ФБС-12", "1200×600×600", "0,96 т"],
    ["ФБС-9", "900×600×600", "0,70 т"],
    ["Подушка ФП-1", "1200×1600×300", "1,80 т"],
    ["Плита ПК 60-15", "6000×1500×220", "2,70 т"],
    ["Плита ПК 48-15", "4800×1500×220", "2,10 т"],
    ["Плита ПК 36-15", "3600×1500×220", "1,60 т"],
    ["Кольцо КС-10", "d1000 h900", "—"],
    ["Кольцо КС-15", "d1500 h900", "—"],
    ["Лоток ЛВ-30", "300×400×1000", "—"],
    ["Свая С-60", "6м, 300×300", "—"],
    ["Свая С-90", "9м, 300×300", "—"],
    ["Дорожная плита ПД-6", "6000×2000×180", "5,40 т"],
    ["Бордюрный камень БР", "1000×300×150", "0,11 т"],
  ];
  return (
    <section className="bg-cream linen py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <SectionHead num="07" title="Цены на продукцию" subtitle="Актуальные цены с производства. Оптовые условия при крупных заказах." />
        <div className="fade-up bg-white border border-linecolor rounded-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[600px]">
              <thead className="bg-[#1C1C1C] text-white font-heading font-semibold text-[13px]">
                <tr>
                  <th className="px-5 py-4">Наименование</th>
                  <th className="px-5 py-4">Размеры</th>
                  <th className="px-5 py-4">Вес</th>
                  <th className="px-5 py-4">Цена</th>
                </tr>
              </thead>
              <tbody className="text-[14px]">
                {rows.map((r, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-cream"}>
                    <td className="px-5 py-3 text-darktext">{r[0]}</td>
                    <td className="px-5 py-3 text-warmgray">{r[1]}</td>
                    <td className="px-5 py-3 text-warmgray">{r[2]}</td>
                    <td className="px-5 py-3 text-warmgray">по запросу</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <p className="text-[13px] text-warmgray italic mt-4">Цены уточняются при оформлении заявки. Возможны оптовые условия при заказе крупных партий.</p>
        <div className="text-center mt-8">
          <a href="#contact-form" className="inline-block bg-sage text-white font-heading font-medium px-7 py-3 rounded hover:bg-sage-dark transition-colors">Запросить прайс-лист</a>
        </div>
      </div>
    </section>
  );
}

/* ============ BLOCK 10 CALCULATOR ============ */
type Mode = "fbs" | "plate" | "pile" | "line";
const calcItems: { v: string; label: string; mode: Mode; weight?: number; unitArea?: number; unitLen?: number }[] = [
  { v: "fbs24", label: "Фундаментный блок ФБС-24 (2400×600×600)", mode: "fbs", weight: 1.96, unitLen: 2.4 },
  { v: "fbs12", label: "Фундаментный блок ФБС-12 (1200×600×600)", mode: "fbs", weight: 0.96, unitLen: 1.2 },
  { v: "fbs9", label: "Фундаментный блок ФБС-9 (900×600×600)", mode: "fbs", weight: 0.7, unitLen: 0.9 },
  { v: "pk6015", label: "Плита перекрытия ПК 60-15", mode: "plate", weight: 2.7, unitArea: 9 },
  { v: "pk4815", label: "Плита перекрытия ПК 48-15", mode: "plate", weight: 2.1, unitArea: 7.2 },
  { v: "pk3615", label: "Плита перекрытия ПК 36-15", mode: "plate", weight: 1.6, unitArea: 5.4 },
  { v: "ks10", label: "Кольцо КС-10", mode: "line", weight: 0.6, unitLen: 0.9 },
  { v: "ks15", label: "Кольцо КС-15", mode: "line", weight: 1.0, unitLen: 0.9 },
  { v: "lv30", label: "Лоток ЛВ-30", mode: "line", weight: 0.15, unitLen: 1 },
  { v: "s60", label: "Свая С-60", mode: "pile", weight: 1.35 },
  { v: "s90", label: "Свая С-90", mode: "pile", weight: 2.05 },
  { v: "pd6", label: "Дорожная плита ПД-6", mode: "plate", weight: 5.4, unitArea: 12 },
  { v: "br", label: "Бордюрный камень", mode: "line", weight: 0.11, unitLen: 1 },
];

function CalculatorBlock() {
  const [item, setItem] = useState("");
  const [a, setA] = useState("");
  const [b, setB] = useState("");

  const selected = calcItems.find((c) => c.v === item);
  const mode = selected?.mode;

  let qty = 0;
  let weight = 0;
  if (selected) {
    const A = parseFloat(a) || 0;
    const B = parseFloat(b) || 0;
    if (mode === "fbs" && selected.unitLen) {
      const lengthNeeded = A * (B || 1);
      qty = Math.ceil(lengthNeeded / selected.unitLen);
    } else if (mode === "plate" && selected.unitArea) {
      qty = Math.ceil(A / selected.unitArea);
    } else if (mode === "pile") {
      qty = Math.ceil(A);
    } else if (mode === "line" && selected.unitLen) {
      qty = Math.ceil(A / selected.unitLen);
    }
    weight = +(qty * (selected.weight || 0)).toFixed(2);
  }

  return (
    <section className="bg-white py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <SectionHead num="08" title="Расчёт объёма изделий" subtitle="Рассчитайте необходимое количество ЖБИ для вашего объекта" />
        <div className="grid lg:grid-cols-[55%_45%] gap-8">
          <div className="fade-up">
            <div className="space-y-5">
              <div>
                <label className="block text-[13px] font-heading font-medium mb-2">Тип изделия</label>
                <select value={item} onChange={(e) => { setItem(e.target.value); setA(""); setB(""); }} className="w-full border border-linecolor rounded px-4 py-3 text-[14px] bg-white focus:outline-none focus:ring-2 focus:ring-sage">
                  <option value="">— Выберите изделие —</option>
                  {calcItems.map((c) => <option key={c.v} value={c.v}>{c.label}</option>)}
                </select>
              </div>
              {mode === "fbs" && (
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[13px] font-heading font-medium mb-2">Длина периметра (м)</label>
                    <input type="number" value={a} onChange={(e) => setA(e.target.value)} className="w-full border border-linecolor rounded px-4 py-3 text-[14px] focus:outline-none focus:ring-2 focus:ring-sage" />
                  </div>
                  <div>
                    <label className="block text-[13px] font-heading font-medium mb-2">Высота кладки (рядов)</label>
                    <input type="number" value={b} onChange={(e) => setB(e.target.value)} className="w-full border border-linecolor rounded px-4 py-3 text-[14px] focus:outline-none focus:ring-2 focus:ring-sage" />
                  </div>
                </div>
              )}
              {mode === "plate" && (
                <div>
                  <label className="block text-[13px] font-heading font-medium mb-2">Площадь перекрытия (м²)</label>
                  <input type="number" value={a} onChange={(e) => setA(e.target.value)} className="w-full border border-linecolor rounded px-4 py-3 text-[14px] focus:outline-none focus:ring-2 focus:ring-sage" />
                </div>
              )}
              {mode === "pile" && (
                <div>
                  <label className="block text-[13px] font-heading font-medium mb-2">Количество свай (шт)</label>
                  <input type="number" value={a} onChange={(e) => setA(e.target.value)} className="w-full border border-linecolor rounded px-4 py-3 text-[14px] focus:outline-none focus:ring-2 focus:ring-sage" />
                </div>
              )}
              {mode === "line" && (
                <div>
                  <label className="block text-[13px] font-heading font-medium mb-2">Длина трассы (м)</label>
                  <input type="number" value={a} onChange={(e) => setA(e.target.value)} className="w-full border border-linecolor rounded px-4 py-3 text-[14px] focus:outline-none focus:ring-2 focus:ring-sage" />
                </div>
              )}
              <button className="w-full bg-darktext text-white font-heading font-medium h-12 rounded hover:bg-black transition-colors">Рассчитать</button>
            </div>
          </div>
          <div className="fade-up bg-cream border border-linecolor rounded-md p-8">
            <div className="section-label mb-4">РЕЗУЛЬТАТ РАСЧЁТА</div>
            <hr className="border-linecolor mb-4" />
            <div className="space-y-2 text-[14px] mb-4">
              <div className="flex justify-between"><span className="text-warmgray">Изделие:</span><span className="font-heading font-medium text-right max-w-[60%]">{selected?.label.split(" (")[0] || "—"}</span></div>
              <div className="flex justify-between"><span className="text-warmgray">Параметры:</span><span className="font-heading font-medium">{a ? `${a}${b ? " × " + b : ""}` : "—"}</span></div>
            </div>
            <hr className="border-linecolor mb-4" />
            <div className="space-y-3 mb-5">
              <div className="flex items-baseline justify-between"><span className="text-warmgray text-[14px]">Количество</span><span className="font-serif text-[28px] text-darktext">{qty || 0} <span className="text-[14px] text-warmgray">шт</span></span></div>
              <div className="flex items-baseline justify-between"><span className="text-warmgray text-[14px]">Общий вес</span><span className="font-serif text-[28px] text-darktext">{weight || 0} <span className="text-[14px] text-warmgray">т</span></span></div>
            </div>
            <hr className="border-linecolor mb-4" />
            <div className="text-[13px] text-warmgray mb-5">Цена: уточняется при оформлении заявки</div>
            <a href="#contact-form" className="block text-center bg-sage text-white font-heading font-medium py-3 rounded hover:bg-sage-dark transition-colors">Оставить заявку</a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============ BLOCK 12 FAQ ============ */
function FAQBlock() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        <SectionHead num="10" title="Часто задаваемые вопросы" subtitle="Ответы на типовые вопросы перед оформлением заказа" />
        <div className="space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={i} className="fade-up">
                <div className={`border border-linecolor rounded-md bg-white overflow-hidden ${isOpen ? "border-l-2 border-l-sage" : ""}`}>
                  <button onClick={() => setOpen(isOpen ? null : i)} className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left">
                    <span className="font-heading font-semibold text-[15px] text-darktext">{f.q}</span>
                    <span className="text-sage flex-shrink-0">{isOpen ? <Minus size={18} /> : <Plus size={18} />}</span>
                  </button>
                  <div className={`accordion-content ${isOpen ? "open" : ""} px-6`}>
                    <p className="text-[14px] text-warmgray leading-[1.7] pb-5">{f.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ============ BLOCK 16 CONTACT FORM ============ */
function ContactForm() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", product: "", volume: "", comment: "", agree: false });
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.agree) return;
    setSent(true);
  };
  return (
    <section id="contact-form" className="bg-white py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <SectionHead num="13" title="Оставить заявку" subtitle="Укажите параметры — свяжемся и рассчитаем стоимость" center />
        <div className="grid lg:grid-cols-2 border border-linecolor rounded-md overflow-hidden">
          <div className="bg-cream p-8 md:p-12 lg:border-r border-linecolor">
            <h3 className="font-serif text-[22px] text-darktext mb-4">Мы свяжемся с вами</h3>
            <p className="text-[15px] text-warmgray leading-[1.8] mb-6">Оставьте контактные данные и опишите потребность — наш менеджер перезвонит в рабочее время и подберёт оптимальное решение.</p>
            <ul className="space-y-2 mb-8">
              {["Консультация по продукции", "Расчёт объёма и стоимости", "Оформление договора поставки", "Согласование сроков и доставки"].map((l) => (
                <li key={l} className="text-[14px] text-warmgray flex gap-3"><span className="text-sage">—</span>{l}</li>
              ))}
            </ul>
            <a href={TEL} className="font-heading font-semibold text-[16px] text-darktext">{PHONE}</a>
          </div>
          <div className="p-8 md:p-12">
            {sent ? (
              <div>
                <hr className="sage-rule" />
                <div className="font-heading font-semibold text-darktext text-[18px] leading-relaxed">Заявка принята.<br/>Свяжемся с вами в течение рабочего дня.</div>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-4">
                <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Имя и организация" className="w-full border border-linecolor rounded px-4 py-3 text-[14px] focus:outline-none focus:ring-2 focus:ring-sage" />
                <input required type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+7 ___ ___ __ __" className="w-full border border-linecolor rounded px-4 py-3 text-[14px] focus:outline-none focus:ring-2 focus:ring-sage" />
                <select value={form.product} onChange={(e) => setForm({ ...form, product: e.target.value })} className="w-full border border-linecolor rounded px-4 py-3 text-[14px] bg-white focus:outline-none focus:ring-2 focus:ring-sage">
                  <option value="">Вид продукции</option>
                  {products.map((p) => <option key={p.title}>{p.title}</option>)}
                  <option>Другое</option>
                </select>
                <input value={form.volume} onChange={(e) => setForm({ ...form, volume: e.target.value })} placeholder="Примерный объём (шт, тонн, м²)" className="w-full border border-linecolor rounded px-4 py-3 text-[14px] focus:outline-none focus:ring-2 focus:ring-sage" />
                <textarea rows={4} value={form.comment} onChange={(e) => setForm({ ...form, comment: e.target.value })} placeholder="Опишите задачу или дополнительные требования" className="w-full border border-linecolor rounded px-4 py-3 text-[14px] focus:outline-none focus:ring-2 focus:ring-sage" />
                <label className="flex items-start gap-2 text-[13px] text-warmgray">
                  <input type="checkbox" checked={form.agree} onChange={(e) => setForm({ ...form, agree: e.target.checked })} className="mt-1 accent-sage" required />
                  <span>Согласен на обработку персональных данных</span>
                </label>
                <button type="submit" className="w-full bg-darktext text-white font-heading font-medium h-12 rounded hover:bg-black transition-colors">Отправить заявку</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============ BLOCK 17 QUESTION FORM ============ */
function QuestionForm() {
  const [sent, setSent] = useState(false);
  const [f, setF] = useState({ name: "", phone: "", q: "" });
  return (
    <section className="bg-cream linen py-20 md:py-24">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-10 max-w-2xl mx-auto">
          <h3 className="font-serif text-[28px] text-darktext">Есть вопрос?</h3>
          <p className="text-[15px] text-warmgray mt-3">Напишите — ответим в рабочее время</p>
        </div>
        <div className="bg-white border border-linecolor rounded-md max-w-[560px] mx-auto p-9">
          {sent ? (
            <div className="text-center">
              <hr className="sage-rule mx-auto" />
              <div className="font-heading font-semibold text-[16px]">Вопрос отправлен. Ответим в рабочее время.</div>
            </div>
          ) : (
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); if (f.name && f.phone) setSent(true); }}>
              <input required value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} placeholder="Ваше имя" className="w-full border border-linecolor rounded px-4 py-3 text-[14px] focus:outline-none focus:ring-2 focus:ring-sage" />
              <input required type="tel" value={f.phone} onChange={(e) => setF({ ...f, phone: e.target.value })} placeholder="Телефон" className="w-full border border-linecolor rounded px-4 py-3 text-[14px] focus:outline-none focus:ring-2 focus:ring-sage" />
              <textarea rows={4} value={f.q} onChange={(e) => setF({ ...f, q: e.target.value })} placeholder="Вопрос" className="w-full border border-linecolor rounded px-4 py-3 text-[14px] focus:outline-none focus:ring-2 focus:ring-sage" />
              <button type="submit" className="w-full bg-sage text-white font-heading font-medium h-12 rounded hover:bg-sage-dark transition-colors">Отправить</button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

/* ============ BLOCK 18 FOOTER ============ */
function Footer() {
  return (
    <footer className="bg-[#1C1C1C] border-t border-sage pb-16 md:pb-0">
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-14 pb-7">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="flex items-baseline gap-2 mb-2">
              <span className="font-serif text-[26px] text-white">NEN</span>
              <span className="font-heading font-medium text-[13px] text-sage tracking-[0.2em]">GROUP KZ</span>
            </div>
            <div className="text-[12px] text-warmgray">Производство железобетонных изделий</div>
            <p className="text-[13px] text-warmgray mt-4">Шымкент, Казахстан. Работаем с 2016 года.</p>
          </div>
          <div>
            <div className="font-heading font-semibold text-[13px] text-white mb-4">Продукция</div>
            <ul className="space-y-2 text-[13px] text-warmgray">
              {["Фундаментные блоки ФБС","Плиты перекрытий ПК","Колодезные кольца КС","Лотки водоотводные ЛВ","Сваи забивные","Дорожные плиты ПД","Полный каталог"].map((l) => (
                <li key={l}><a href="#products" className="hover:text-sage transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <div className="font-heading font-semibold text-[13px] text-white mb-4">Навигация</div>
            <ul className="space-y-2 text-[13px] text-warmgray">
              {[["О компании","#about"],["Продукция","#products"],["Производство","#production"],["Проекты","#projects"],["Контакты","#contacts"],["FAQ","#"]].map(([l,h]) => (
                <li key={l}><a href={h} className="hover:text-sage transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <div className="font-heading font-semibold text-[13px] text-white mb-4">Контакты</div>
            <div className="text-[14px] text-warmgray space-y-2">
              <a href={TEL} className="block text-white hover:text-sage">{PHONE}</a>
              <div>г. Шымкент, Каратауский район<br/>м-н Таскен, 1 этаж</div>
              <div>Пн–Пт 9:00–18:00</div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#111111] py-[14px]">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row justify-between gap-2 text-[12px] text-[#4A4A4A]">
          <span>© 2025 NEN GROUP KZ. Все права защищены.</span>
          <span>Шымкент, Казахстан</span>
        </div>
      </div>
    </footer>
  );
}
