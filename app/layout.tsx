import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import { headers } from "next/headers";
import Script from "next/script";
import "./globals.css";

const manrope = Manrope({ variable: "--font-manrope", subsets: ["latin"], display: "swap" });
const META_PIXEL_ID = "27561649656861064";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.includes("localhost") ? "http" : "https");
  const metadataBase = new URL(`${protocol}://${host}`);

  return {
    metadataBase,
    title: "Emprego Rápido | Aprenda a ser notado pelos recrutadores",
    description: "Aprenda a montar um currículo estratégico, melhorar seu LinkedIn e se preparar para entrevistas com um guia criado por psicóloga organizacional.",
    alternates: { canonical: "/" },
    icons: { icon: "/assets/favicon.png", shortcut: "/assets/favicon.png", apple: "/assets/favicon.png" },
    openGraph: {
      title: "Emprego Rápido | Aprenda a ser notado pelos recrutadores",
      description: "Currículo, LinkedIn e entrevistas com mais estratégia, por Carolina Moura.",
      type: "website",
      locale: "pt_BR",
      siteName: "Emprego Rápido",
      images: [{ url: "/og.png", width: 1200, height: 630, alt: "Emprego Rápido - Pare de enviar currículos sem resposta" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Emprego Rápido",
      description: "Aprenda a ser notado pelos recrutadores.",
      images: ["/og.png"],
    },
  };
}

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#1F4B3D" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body className={manrope.variable}>{children}<Script id="meta-pixel" strategy="afterInteractive">{`
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '${META_PIXEL_ID}');
    fbq('track', 'PageView');
  `}</Script><noscript><img height="1" width="1" style={{ display: "none" }} src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`} alt="" /></noscript></body></html>;
}
