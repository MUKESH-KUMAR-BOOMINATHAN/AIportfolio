import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Outfit } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://a-iportfolio-sigma.vercel.app"),
  title: "Mukeshkumar Boominathan | Software & AI Engineer Portfolio",
  description: "Explore the portfolio of Mukeshkumar Boominathan, a Chennai-based Software Engineer, AI Engineer, and Full Stack Developer. Experience with LangGraph, FastAPI, Next.js, and RAG. Chat with HireMukeshkumar AI.",
  keywords: [
    "Mukeshkumar Boominathan",
    "Mukeshkumar B",
    "AI Engineer",
    "Software Engineer",
    "Full Stack Developer",
    "LangGraph",
    "FastAPI",
    "Next.js",
    "SRM Valliammai",
    "Chennai Developer",
    "RAG",
    "ChromaDB",
    "Python Developer"
  ],
  authors: [{ name: "Mukeshkumar Boominathan" }],
  creator: "Mukeshkumar Boominathan",
  openGraph: {
    title: "Mukeshkumar Boominathan | Software & AI Engineer Portfolio",
    description: "Explore Mukeshkumar Boominathan's projects, experience, and custom AI chatbot agent built with LangGraph, FastAPI, and Next.js.",
    url: "https://a-iportfolio-sigma.vercel.app",
    siteName: "Mukeshkumar Boominathan Portfolio",
    locale: "en_US",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Mukeshkumar Boominathan" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mukeshkumar Boominathan | Software & AI Engineer Portfolio",
    description: "Projects, experience and a custom RAG chatbot built with LangGraph, FastAPI and Next.js.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#050816",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${outfit.variable} h-full scroll-smooth`}
    >
      <body className="bg-noise min-h-full bg-background text-foreground antialiased selection:bg-accent/30 selection:text-white flex flex-col font-sans">
        {children}
      </body>
    </html>
  );
}
