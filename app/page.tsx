import { SalesPage } from "./components/SalesPage";

const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Emprego Rápido",
  description: "Guia digital de recolocação profissional, currículo, LinkedIn, plataformas de vagas e entrevistas.",
  image: "/capa.png",
  brand: { "@type": "Brand", name: "Carolina Moura" },
  offers: {
    "@type": "Offer",
    priceCurrency: "BRL",
    price: "19.90",
    availability: "https://schema.org/InStock",
    url: "https://pay.cakto.com.br/xzi9krb_1005370",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    ["É um curso ou um ebook?", "É um guia digital em PDF que pode ser acessado pelo celular, computador ou tablet."],
    ["Recebo o material na hora?", "Sim. O acesso é liberado após a confirmação do pagamento."],
    ["Serve para quem está procurando o primeiro emprego?", "Sim. O conteúdo ajuda a organizar competências, cursos, experiências acadêmicas e potencial profissional."],
    ["Serve para quem já tem experiência?", "Sim. O material mostra como transformar tarefas em resultados e melhorar o posicionamento profissional."],
    ["Como funciona a garantia?", "Você terá sete dias para solicitar o reembolso, conforme as condições informadas no momento da compra."],
  ].map(([name, text]) => ({
    "@type": "Question",
    name,
    acceptedAnswer: { "@type": "Answer", text },
  })),
};

export default function Home() {
  return <>
    <SalesPage />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
  </>;
}
