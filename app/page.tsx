"use client";

import { CONTENT_A } from "@/content/copy";
import { Hero } from "@/components/Hero";
import dynamic from "next/dynamic";
import { Navbar } from "@/components/Navbar";
import { ProofStrip } from "@/components/ProofStrip";
import Preloader from "@/components/ui/Preloader";

// Lazy-load below-the-fold components
const BioAuthority = dynamic(() => import("@/components/BioAuthority").then(mod => mod.BioAuthority));
const FeaturesEcosystem = dynamic(() => import("@/components/FeaturesEcosystem").then(mod => mod.FeaturesEcosystem));
const SuccessStories = dynamic(() => import("@/components/SuccessStories").then(mod => mod.SuccessStories));
const EliteAccess = dynamic(() => import("@/components/EliteAccess").then(mod => mod.EliteAccess));
const FAQ = dynamic(() => import("@/components/FAQ").then(mod => mod.FAQ));
const Footer = dynamic(() => import("@/components/Footer").then(mod => mod.Footer));

export default function LandingPage() {
  const content = CONTENT_A;

  return (
    <>
      <Preloader />
      <main className="min-h-screen bg-brand-background relative">
        <div className="noise-overlay" />
        <Navbar />
        <Hero content={content.hero} />
        <ProofStrip content={content.proof} />
        <BioAuthority />
        <FeaturesEcosystem content={content.ecosystem} />
        <SuccessStories />
        <EliteAccess />
        {/* <HowItWorks /> */}
        {/* <TrialModule content={content.trial} /> */}
        {/* <GuaranteeModule content={content.guarantee} /> */}
        <FAQ />
        {/* <FinalCTA /> */}
        <Footer />
      </main>
    </>
  );
}
