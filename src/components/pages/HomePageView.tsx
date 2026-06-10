"use client";

import PhysicsLayout from "@/components/layout/PhysicsLayout";
import HomeContent from "@/components/pages/HomeContent";

export default function HomePageView() {
  return (
    <PhysicsLayout homeHref="/">
      <HomeContent />
    </PhysicsLayout>
  );
}
