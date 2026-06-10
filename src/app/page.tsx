import type { Metadata } from "next";
import HomePageView from "@/components/pages/HomePageView";

export const metadata: Metadata = {
  title: "Belén Express - Bienvenidos",
};

export default function HomePage() {
  return <HomePageView />;
}
