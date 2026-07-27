import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";

const manrope = Manrope({ variable: "--font-manrope", subsets: ["latin"], display: "swap" });

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
  return <html lang="pt-BR"><body className={manrope.variable}>{children}</body></html>;
}
