"use client";

import { useEffect } from "react";
import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { WhatItIs } from "@/components/sections/WhatItIs";
import { StoryBible } from "@/components/sections/StoryBible";
import { Structure } from "@/components/sections/Structure";
import { Maestro } from "@/components/sections/Maestro";
import { ThreeMinds } from "@/components/sections/ThreeMinds";
import { TwoAgents } from "@/components/sections/TwoAgents";
import { ReviewTools } from "@/components/sections/ReviewTools";
import { Interventions } from "@/components/sections/Interventions";
import { Export } from "@/components/sections/Export";
import { LocalFirst } from "@/components/sections/LocalFirst";
import { Pricing } from "@/components/sections/Pricing";
import { Beta } from "@/components/sections/Beta";
import { Footer } from "@/components/sections/Footer";

export default function HomePage() {
  // Scroll-triggered reveal via IntersectionObserver — niente librerie.
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    if (els.length === 0) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 },
    );
    for (const el of els) io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <WhatItIs />
        <StoryBible />
        <Structure />
        <Maestro />
        <ThreeMinds />
        <TwoAgents />
        <ReviewTools />
        <Interventions />
        <Export />
        <LocalFirst />
        <Pricing />
        <Beta />
      </main>
      <Footer />
    </>
  );
}
