import type { Metadata } from "next";
import { VT323, JetBrains_Mono } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Navbar from "@/components/layout/Navbar";
import { Chatbot } from "@/components/sections/Chatbot";
import "../globals.css";

const vt323 = VT323({
  variable: "--font-vt323",
  subsets: ["latin"],
  weight: "400",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  title: "drgn.dev | AI Engineer Portfolio",
  description: "Portfolio Kacpra — AI Engineer i fullstack developer z Kętrzyna. Projekty Python, RAG, systemy multi-agentowe.",
};

// Tell Next.js which locale segments to pre-render at build time
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Reject unknown locale segments — prevents rendering garbage routes
  if (!routing.locales.includes(locale as "pl" | "en")) {
    notFound();
  }

  // Must be called before any translations are used in this subtree
  setRequestLocale(locale);

  // Fetch messages server-side and forward to NextIntlClientProvider for Client Components
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${vt323.variable} ${jetbrainsMono.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          {children}
          <Chatbot />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
