"use client";

import { useEffect } from "react";
import { initMotor } from "@/lib/motor";
import { initProductSliders } from "@/lib/sliderProduct";
import { initProductGallerySlider } from "@/lib/productGallerySlider";
import { initToastSystem } from "@/lib/toastSystem";

interface UseBelenScriptsOptions {
  withGallery?: boolean;
}

export function useBelenScripts({ withGallery = false }: UseBelenScriptsOptions = {}) {
  useEffect(() => {
    initMotor();
    initProductSliders();
    initToastSystem();

    if (withGallery) {
      initProductGallerySlider();
    }
  }, [withGallery]);
}
