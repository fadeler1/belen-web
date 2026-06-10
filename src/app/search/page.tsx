"use client";

import PhysicsLayout from "@/components/layout/PhysicsLayout";
import SearchContent from "@/components/pages/SearchContent";
import { useSearchPage } from "@/hooks/useSearchPage";

export default function SearchPage() {
  useSearchPage();

  return (
    <PhysicsLayout homeHref="/" cartMode="inner">
      <SearchContent />
    </PhysicsLayout>
  );
}
