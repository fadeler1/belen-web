import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Belén Express - Resultados de Búsqueda",
};

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
