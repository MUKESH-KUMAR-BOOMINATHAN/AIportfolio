import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Outfit } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
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
    url: "https://mukesh-portfolio.vercel.app",
    siteName: "Mukeshkumar Boominathan Portfolio",
    locale: "en_US",
    type: "website",
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
      <body className="min-h-full bg-background text-foreground antialiased selection:bg-accent/30 selection:text-white flex flex-col font-sans">
        {children}
      </body>
    </html>
  );
}
