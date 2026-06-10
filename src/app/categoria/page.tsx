"use client";

import PhysicsLayout from "@/components/layout/PhysicsLayout";
import CategoriaContent from "@/components/pages/CategoriaContent";
import { useSearchPage } from "@/hooks/useSearchPage";

export default function CategoriaPage() {
  useSearchPage();

  return (
    <PhysicsLayout homeHref="/" cartMode="inner">
      <CategoriaContent />
    </PhysicsLayout>
  );
}
