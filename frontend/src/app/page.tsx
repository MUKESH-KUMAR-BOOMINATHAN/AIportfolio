import React from "react";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Education from "@/components/sections/Education";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import BeyondTech from "@/components/sections/BeyondTech";
import Certifications from "@/components/sections/Certifications";
import Contact from "@/components/sections/Contact";
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
        <Education />
        <Skills />
        <Projects />
        <BeyondTech />
        <Certifications />
        <Contact />
      </main>

      {/* Footer block */}
      <Footer />

      {/* Floating Chat Assistant RAG Drawer */}
      <HireMukeshAI />
    </>
  );
}
