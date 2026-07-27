"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { CHECKOUT_URL, TRACKED_QUERY_PARAMS } from "../../lib/constants";

type IconName = "arrow" | "briefcase" | "check" | "file" | "filter" | "lock" | "profile" | "search" | "shield" | "target";

const pains = [
  ["search", "Envia currículo para várias vagas e não recebe retorno."],
  ["target", "Tem experiência, mas não consegue mostrar seu valor."],
  ["file", "Não sabe quais informações destacar no currículo."],
  ["filter", "Sente que seu perfil desaparece nas plataformas de emprego."],
  ["profile", "Fica inseguro nas entrevistas."],
  ["briefcase", "Não sabe por onde começar a procurar emprego."],
] as const;

const benefits = [
  ["file", "Currículo estratégico", "Organize suas informações para mostrar rapidamente quem você é e o que pode entregar."],
  ["filter", "Palavras-chave e filtros", "Entenda como tornar seu currículo mais compatível com as vagas."],
  ["profile", "LinkedIn", "Melhore seu perfil e aumente suas chances de ser encontrado."],
  ["target", "Candidaturas inteligentes", "Escolha as vagas e empresas certas sem desperdiçar energia."],
  ["briefcase", "Entrevistas", "Aprenda a apresentar suas experiências com mais clareza e confiança."],
  ["search", "Posicionamento profissional", "Mostre resultados, diferenciais e competências de forma estratégica."],
] as const;

const chapters = [
  "Defina seu objetivo profissional", "O currículo que o recrutador realmente lê",
  "Como aparecer no radar dos recrutadores", "Como mostrar seu valor no currículo",
  "Como escolher as empresas certas", "Onde buscar emprego com estratégia",
  "Como se preparar para entrevistas", "Como continuar crescendo após a recolocação",
];

const offerItems = ["Ebook Emprego Rápido", "40 páginas de conteúdo", "Estratégias para currículo e ATS", "LinkedIn e plataformas de emprego", "Preparação para entrevistas", "Exercícios práticos", "Acesso digital imediato"];

const faqItems = [
  ["É um curso ou um ebook?", "É um guia digital em PDF que pode ser acessado pelo celular, computador ou tablet."],
  ["Recebo o material na hora?", "Sim. O acesso é liberado após a confirmação do pagamento."],
  ["Serve para quem está procurando o primeiro emprego?", "Sim. O conteúdo ajuda a organizar competências, cursos, experiências acadêmicas e potencial profissional."],
  ["Serve para quem já tem experiência?", "Sim. O material mostra como transformar tarefas em resultados e melhorar o posicionamento profissional."],
  ["O ebook garante que vou conseguir um emprego?", "Não existe garantia de contratação. O material foi criado para ajudar você a melhorar sua estratégia e aumentar suas chances nos processos seletivos."],
  ["Como funciona a garantia?", "Você terá sete dias para solicitar o reembolso, conforme as condições informadas no momento da compra."],
] as const;

function Icon({ name }: { name: IconName }) {
  const labels: Record<IconName, string> = { arrow: "↗", briefcase: "▣", check: "✓", file: "CV", filter: "⌁", lock: "⌑", profile: "in", search: "◎", shield: "◇", target: "⊙" };
  return <span className={`icon icon--${name}`} aria-hidden="true">{labels[name]}</span>;
}

function Section({ children, className = "", id }: { children: React.ReactNode; className?: string; id?: string }) {
  return <section className={`section ${className}`} id={id}>{children}</section>;
}

function CheckoutButton({ children, className = "", location }: { children: React.ReactNode; className?: string; location: string }) {
  const [href, setHref] = useState("#oferta");
  useEffect(() => {
    if (CHECKOUT_URL === "INSERIR_URL_DO_CHECKOUT") return;
    const checkout = new URL(CHECKOUT_URL, window.location.origin);
    const current = new URLSearchParams(window.location.search);
    TRACKED_QUERY_PARAMS.forEach((param) => { const value = current.get(param); if (value) checkout.searchParams.set(param, value); });
    setHref(checkout.toString());
  }, []);
  function trackCheckout() {
    const payload = { event: "begin_checkout", product: "Emprego Rápido", value: 19.9, currency: "BRL", location };
    window.dataLayer?.push(payload);
    window.gtag?.("event", "begin_checkout", payload);
    window.fbq?.("track", "InitiateCheckout", { content_name: "Emprego Rápido", value: 19.9, currency: "BRL" });
  }
  return <a className={`button ${className}`} href={href} onClick={trackCheckout} data-checkout-location={location}><span>{children}</span><Icon name="arrow" /></a>;
}

function PainCard({ icon, children }: { icon: IconName; children: React.ReactNode }) {
  return <article className="pain-card reveal"><Icon name={icon} /><p>{children}</p></article>;
}

function BenefitCard({ icon, title, children }: { icon: IconName; title: string; children: React.ReactNode }) {
  return <article className="benefit-card reveal"><Icon name={icon} /><h3>{title}</h3><p>{children}</p></article>;
}

function BookMockup({ priority = false }: { priority?: boolean }) {
  return <div className="book-stage" aria-label="Capa do ebook Emprego Rápido"><div className="book-shadow" /><div className="book"><span className="book-spine" aria-hidden="true" /><Image src="/capa.png" alt="Capa do ebook Emprego Rápido, de Carolina Moura" width={628} height={842} priority={priority} sizes="(max-width: 767px) 58vw, 390px" /></div><div className="device" aria-hidden="true"><div className="device-notch" /><Image src="/assets/ebook-summary.webp" alt="" fill sizes="150px" /></div></div>;
}

function PriceBox() {
  return <div className="price-box" aria-label="Preço do Emprego Rápido"><div><span className="price-kicker">ACESSO IMEDIATO</span><span className="price-label">Por apenas</span></div><strong><small>R$</small> 19,90</strong></div>;
}

function AuthorSection() {
  return <Section className="author-section" id="autora"><div className="shell author-grid"><div className="author-photo reveal"><Image src="/hero.jpg" alt="Carolina Moura, psicóloga organizacional e autora do Emprego Rápido" fill loading="lazy" sizes="(max-width: 767px) 86vw, 430px" /><span className="author-photo-tag">Carolina Moura</span></div><div className="author-copy reveal"><p className="eyebrow eyebrow--light">Quem criou este material?</p><h2>Experiência de quem conhece os dois lados da seleção.</h2><div className="credentials"><strong>Carolina Moura</strong><span>Psicóloga Organizacional</span><span>Especialista em Recolocação Profissional</span><span>CRP 04/69578</span></div><p>Carolina iniciou sua vida profissional muito cedo e viveu de perto as dificuldades de quem busca crescimento e novas oportunidades.</p><p>Depois de se formar em Recursos Humanos e Psicologia, passou a atuar em processos seletivos e recrutamento para diferentes empresas. Foi a partir dessa experiência pessoal e profissional que criou o Emprego Rápido.</p><blockquote>“Eu aprendi, na prática, que conseguir um emprego não é apenas uma questão de sorte. É questão de estratégia, posicionamento e método.”</blockquote><span className="signature">Carolina Moura</span></div></div></Section>;
}

function Guarantee() {
  return <Section className="guarantee"><div className="shell guarantee-card reveal"><Icon name="shield" /><div><p className="eyebrow">Garantia de 7 dias</p><h2>Você tem 7 dias para conhecer o material</h2><p>Acesse, leia e avalie com tranquilidade. Caso entenda que o conteúdo não é adequado para você, poderá solicitar o reembolso dentro do prazo informado na compra.</p><strong>Compra sem risco.</strong></div></div></Section>;
}

function FAQ() {
  const [open, setOpen] = useState(0);
  return <div className="faq-list">{faqItems.map(([question, answer], index) => { const expanded = open === index; return <article className={`faq-item ${expanded ? "is-open" : ""}`} key={question}><h3><button type="button" aria-expanded={expanded} aria-controls={`faq-answer-${index}`} onClick={() => setOpen(expanded ? -1 : index)}><span>{question}</span><span className="faq-plus" aria-hidden="true">{expanded ? "−" : "+"}</span></button></h3><div id={`faq-answer-${index}`} className="faq-answer" role="region" hidden={!expanded}><p>{answer}</p></div></article>; })}</div>;
}

function StickyMobileCTA() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const hero = document.getElementById("inicio"), offer = document.getElementById("oferta"), final = document.getElementById("final");
    if (!hero || !offer || !final) return;
    let heroVisible = true, conversionVisible = false;
    const update = () => setVisible(!heroVisible && !conversionVisible);
    const heroObserver = new IntersectionObserver(([entry]) => { heroVisible = entry.isIntersecting; update(); }, { threshold: 0.08 });
    const conversionObserver = new IntersectionObserver((entries) => { conversionVisible = entries.some((entry) => entry.isIntersecting); update(); }, { threshold: 0.05 });
    heroObserver.observe(hero); conversionObserver.observe(offer); conversionObserver.observe(final);
    return () => { heroObserver.disconnect(); conversionObserver.disconnect(); };
  }, []);
  return <aside className={`sticky-cta ${visible ? "is-visible" : ""}`} aria-hidden={!visible}><div><span>Emprego Rápido</span><strong>R$ 19,90</strong></div><CheckoutButton className="button--small" location="sticky_mobile">Acessar agora</CheckoutButton></aside>;
}

function RevealInitializer() {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { nodes.forEach((node) => node.classList.add("is-visible")); return; }
    const observer = new IntersectionObserver((entries) => { entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); } }); }, { threshold: 0.12 });
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);
  return null;
}

export function SalesPage() {
  const year = useMemo(() => new Date().getFullYear(), []);
  useEffect(() => {
    const payload = { event: "page_view", page_title: "Emprego Rápido" };
    window.dataLayer?.push(payload); window.gtag?.("event", "page_view", payload); window.fbq?.("track", "PageView");
  }, []);

  return <>
    <RevealInitializer />
    <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
    <main id="conteudo">
      <section className="hero" id="inicio" aria-labelledby="hero-title">
        <div className="hero-orb hero-orb--one" aria-hidden="true" /><div className="hero-orb hero-orb--two" aria-hidden="true" />
        <div className="shell hero-grid">
          <div className="hero-copy">
            <p className="hero-badge"><Icon name="check" /> Guia prático criado por psicóloga organizacional</p>
            <h1 id="hero-title">Pare de enviar currículos <span>sem resposta</span></h1>
            <p className="hero-lead">Aprenda a montar um currículo estratégico, aparecer no radar dos recrutadores e se preparar melhor para os processos seletivos.</p>
            <div className="hero-mobile-product"><BookMockup priority /></div>
            <div className="hero-action"><PriceBox /><CheckoutButton className="button--primary" location="hero">Quero acessar o guia agora</CheckoutButton><p className="security-line"><Icon name="lock" /> Pagamento único <span>•</span> Acesso imediato <span>•</span> Garantia de 7 dias</p></div>
            <div className="trust-row" aria-label="Benefícios de compra"><span><Icon name="shield" /> Compra segura</span><span><Icon name="file" /> Acesso digital</span><span><Icon name="check" /> 7 dias de garantia</span></div>
          </div>
          <div className="hero-desktop-product"><BookMockup priority /></div>
        </div>
      </section>

      <Section className="pain-section" id="identificacao"><div className="shell"><div className="section-heading centered reveal"><p className="eyebrow">Se isso parece familiar</p><h2>Você se identifica com alguma dessas situações?</h2></div><div className="pain-grid">{pains.map(([icon, text]) => <PainCard icon={icon} key={text}>{text}</PainCard>)}</div><p className="pain-close reveal">O problema pode não ser a sua capacidade. Pode ser a <mark>forma como você está se apresentando</mark> ao mercado.</p></div></Section>

      <Section className="filter-section"><div className="shell filter-grid"><div className="section-heading reveal"><p className="eyebrow">O problema invisível</p><h2>Seu currículo pode nem estar chegando ao recrutador</h2><p>Muitas empresas utilizam filtros automáticos para analisar currículos antes que uma pessoa do RH veja o documento.</p><p>Esses sistemas procuram palavras-chave, competências e informações relacionadas à vaga.</p></div><div className="process-flow reveal" aria-label="Fluxo de seleção de currículo">{["Currículo", "Filtro automático", "Recrutador", "Entrevista"].map((item, index) => <div className="flow-item" key={item}><span>{index + 1}</span><strong>{item}</strong>{index < 3 ? <i aria-hidden="true">↓</i> : null}</div>)}</div></div><div className="shell"><div className="statement reveal">Não basta ter experiência. É preciso saber como ser <strong>encontrado, compreendido e valorizado.</strong></div></div></Section>

      <Section className="product-section" id="produto"><div className="shell product-grid"><div className="product-visual reveal"><BookMockup /></div><div className="product-copy reveal"><p className="eyebrow">Um plano claro para avançar</p><h2>Conheça o <span>Emprego Rápido</span></h2><p className="lead">Um passo a passo prático para organizar sua busca, melhorar seu posicionamento e aumentar suas chances nos processos seletivos.</p><div className="mini-badges">{["Conteúdo prático", "Leitura fácil", "Exemplos reais", "Exercícios", "Acesso imediato"].map((item) => <span key={item}><Icon name="check" /> {item}</span>)}</div><p>Você vai aprender o que fazer antes, durante e depois de uma candidatura, sem fórmulas mágicas e sem promessas irreais.</p><CheckoutButton className="button--primary button--inline" location="product">Quero começar agora</CheckoutButton></div></div></Section>

      <Section className="benefits-section"><div className="shell"><div className="section-heading centered reveal"><p className="eyebrow">Prático do início ao fim</p><h2>O que você vai aprender</h2></div><div className="benefit-grid">{benefits.map(([icon, title, text]) => <BenefitCard icon={icon} title={title} key={title}>{text}</BenefitCard>)}</div></div></Section>

      <Section className="chapters-section"><div className="shell chapters-grid"><div className="section-heading reveal"><p className="eyebrow">Da busca à recolocação</p><h2>Um guia para acompanhar toda a sua jornada</h2><p>Informação objetiva para você consultar no seu ritmo e voltar sempre que precisar.</p><div className="page-count"><strong>40</strong><span>páginas de conteúdo prático,<br />exemplos e exercícios.</span></div></div><div className="chapter-list reveal">{chapters.map((chapter, index) => <div key={chapter}><Icon name="check" /><span>{String(index + 1).padStart(2, "0")}</span><strong>{chapter}</strong></div>)}</div></div></Section>

      <AuthorSection />

      <Section className="material-section"><div className="shell"><div className="section-heading centered reveal"><p className="eyebrow">Material por dentro</p><h2>Veja o que você recebe</h2><p>Um material visual, organizado e feito para ser consultado com facilidade.</p></div><div className="material-showcase reveal"><figure className="material-page material-page--cover"><Image src="/capa.png" alt="Capa do ebook Emprego Rápido" fill loading="lazy" sizes="220px" /></figure><figure className="material-page material-page--summary"><Image src="/assets/ebook-summary.webp" alt="Sumário do ebook Emprego Rápido" fill loading="lazy" sizes="220px" /></figure><figure className="material-page material-page--ats"><Image src="/assets/ebook-ats.webp" alt="Página do ebook sobre erros que fazem o currículo ser ignorado" fill loading="lazy" sizes="220px" /></figure><figure className="material-page material-page--linkedin"><Image src="/assets/ebook-linkedin.webp" alt="Página do ebook sobre LinkedIn" fill loading="lazy" sizes="220px" /></figure><div className="material-device"><Image src="/assets/ebook-interview.webp" alt="Página sobre preparação para entrevistas exibida em um celular" fill loading="lazy" sizes="200px" /></div><span className="material-note note--one">passo a passo</span><span className="material-note note--two">exemplos práticos</span><span className="material-note note--three">leitura pelo celular</span></div><p className="material-copy reveal">Consulte o material sempre que precisar revisar seu currículo, adaptar uma candidatura ou se preparar para uma entrevista.</p></div></Section>

      <Section className="offer-section" id="oferta"><div className="shell offer-shell"><div className="section-heading centered reveal"><p className="eyebrow">Acesso imediato</p><h2>Comece hoje a buscar oportunidades com mais estratégia</h2></div><div className="offer-card reveal"><div className="offer-top"><div><span className="offer-label">Emprego Rápido</span><h3>Seu guia prático de recolocação profissional</h3></div><span className="offer-badge"><Icon name="check" /> Pagamento único</span></div><div className="offer-body"><div className="offer-list"><h4>Você recebe:</h4>{offerItems.map((item) => <span key={item}><Icon name="check" /> {item}</span>)}</div><div className="offer-buy"><span className="old-price">De R$ 47,00</span><span className="price-label">Por apenas</span><strong className="offer-price"><small>R$</small> 19,90</strong><p>Pagamento único. Sem mensalidade.</p><CheckoutButton className="button--primary" location="offer">Quero acessar o Emprego Rápido</CheckoutButton><span className="release-note"><Icon name="lock" /> Liberação após a confirmação do pagamento.</span><div className="payment-row" aria-label="Formas de pagamento"><span>PIX</span><span>Cartão</span><span>Pagamento seguro</span></div></div></div></div></div></Section>

      <Guarantee />
      <Section className="faq-section" id="faq"><div className="shell faq-grid"><div className="section-heading reveal"><p className="eyebrow">Perguntas frequentes</p><h2>Tudo o que você precisa saber antes de começar</h2><p>Respostas diretas para você fazer uma escolha tranquila.</p></div><div className="reveal"><FAQ /></div></div></Section>
      <section className="final-section" id="final" aria-labelledby="final-title"><div className="shell final-grid"><div><p className="eyebrow eyebrow--light">Um próximo passo possível</p><h2 id="final-title">Você não precisa continuar enviando currículos sem saber o que está dando errado</h2><p>Comece a organizar sua busca com mais clareza, estratégia e confiança.</p></div><div className="final-buy"><span>Emprego Rápido</span><strong>R$ 19,90</strong><CheckoutButton className="button--light" location="final">Quero acessar agora</CheckoutButton><small>Acesso imediato • Pagamento único • Garantia de 7 dias</small></div></div></section>
    </main>
    <footer className="footer"><div className="shell"><p><strong>Emprego Rápido</strong> por Carolina Moura</p><p>© {year}. Produto digital de orientação profissional.</p></div></footer>
    <StickyMobileCTA />
  </>;
}

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    gtag?: (command: string, event: string, payload: Record<string, unknown>) => void;
    fbq?: (command: string, event: string, payload?: Record<string, unknown>) => void;
  }
}
