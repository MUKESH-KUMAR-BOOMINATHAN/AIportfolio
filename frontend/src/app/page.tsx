import React from "react";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import BeyondTech from "@/components/sections/BeyondTech";
import Certifications from "@/components/sections/Certifications";
import Footer from "@/components/layout/Footer";
import HireMukeshAI from "@/components/ui/HireMukeshAI";

export default function Home() {
  return (
    <>
      {/* Navigation Navbar */}
      <Navbar />

      {/* Main content wrapper */}
      <main className="relative flex flex-col w-full z-10 pt-16 pb-24">
        {/* Sections */}
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <BeyondTech />
        <Certifications />
      </main>

      {/* Footer block */}
      <Footer />

      {/* Floating Chat Assistant RAG Drawer */}
      <HireMukeshAI />
    </>
  );
}
