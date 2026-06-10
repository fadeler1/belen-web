"use client";

import PhysicsLayout from "@/components/layout/PhysicsLayout";
import ProductoContent from "@/components/pages/ProductoContent";

export default function ProductoPageView() {
  return (
    <PhysicsLayout homeHref="/" withGallery cartMode="inner">
      <ProductoContent />
    </PhysicsLayout>
  );
}
