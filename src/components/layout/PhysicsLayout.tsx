"use client";

import { ReactNode } from "react";
import SiteChrome from "./SiteChrome";
import { useBelenScripts } from "@/hooks/useBelenScripts";

interface PhysicsLayoutProps {
  children: ReactNode;
  homeHref?: string;
  withGallery?: boolean;
  cartMode?: "home" | "inner";
}

export default function PhysicsLayout({
  children,
  homeHref = "/",
  withGallery = false,
  cartMode = "home",
}: PhysicsLayoutProps) {
  useBelenScripts({ withGallery });

  return (
    <>
      <SiteChrome homeHref={homeHref} cartMode={cartMode} />
      <main id="physicsRoot" className="physicsRoot">
        <div id="physicsTrack" className="physicsTrack">
          {children}
        </div>
      </main>
    </>
  );
}
