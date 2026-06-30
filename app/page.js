"use client";

import { useState } from "react";
import StarField from "./components/StarField";
import HeroSection from "./components/HeroSection";
import Timeline3D from "./components/Timeline3D";
import VideoWall from "./components/VideoWall";
import ReasonsSection from "./components/ReasonsSection";
import LoveLetterSection from "./components/LoveLetterSection";
import PrayerSection from "./components/PrayerSection";
import CountdownSection from "./components/CountdownSection";
import BackgroundMusic from "./components/BackgroundMusic";
import BasketballReveal from "./components/BasketballReveal";
import ScrollProgress from "./components/ScrollProgress";
import SectionDivider from "./components/SectionDivider";

export default function Home() {
  const [revealed, setRevealed] = useState(false);

  return (
    <main className="min-h-screen bg-[#050508]">
      {!revealed && <BasketballReveal onComplete={() => setRevealed(true)} />}
      <ScrollProgress />
      <BackgroundMusic />
      <StarField />
      <HeroSection />
      <SectionDivider color="gold" />
      <Timeline3D />
      <SectionDivider color="gold" />
      <VideoWall />
      <SectionDivider color="rose" />
      <ReasonsSection />
      <SectionDivider color="gold" />
      <LoveLetterSection />
      <SectionDivider color="rose" />
      <PrayerSection />
      <SectionDivider color="gold" />
      <CountdownSection />
    </main>
  );
}
