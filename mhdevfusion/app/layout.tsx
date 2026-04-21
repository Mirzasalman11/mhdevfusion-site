import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeaderSpacer from "@/components/layout/HeaderSpacer";
import { ThemeProvider } from "@/components/theme-provider";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  title: "MHDEVFUSION Agency - Your Digital Growth Partner",
  description: "MHDEVFUSION Agency helps businesses grow online through innovative digital marketing strategies, cutting-edge web development, SEO optimization, and creative branding solutions. Partner with us to boost your online presence and drive measurable results.",
  keywords: [
    "digital agency",
    "SEO services",
    "web development",
    "digital marketing",
    "branding",
    "online growth"
  ],
  // authors: [{ name: "Muhammad Arslan", url: "https://marslanmustafa.com" }],
  openGraph: {
    title: "MHDEVFUSION Agency - Your Digital Growth Partner",
    description: "MHDEVFUSION Agency helps businesses grow online through innovative digital marketing strategies, web development, SEO, and branding solutions. Boost your online presence today.",
    url: "https://www.mhdevfusion.com",
    siteName: "MHDEVFUSION Agency",
    images: [
      {
        url: "https://www.mhdevfusion.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "MHDEVFUSION Agency",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MHDEVFUSION Agency - Your Digital Growth Partner",
    description: "Grow your business online with MHDEVFUSION Agency's digital marketing, web development, SEO, and branding solutions.",
    images: ["https://www.mhdevfusion.com/og-image.jpg"],
    site: "@mhdevfusion",
    creator: "@mhdevfusion",
  },
};

import ScrollToTop from "@/components/ui/ScrollToTop";
import ChatButton from "@/components/ChatButton";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${jakarta.variable} font-sans antialiased flex flex-col min-h-screen w-screen overflow-x-hidden`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ScrollToTop />
          <Header />

          {/* Header Spacer (Conditional) */}
          <HeaderSpacer />

          {/* Main Content */}
          <main className="flex-grow">
            {children}
          </main>

          <Footer />
          <ChatButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
