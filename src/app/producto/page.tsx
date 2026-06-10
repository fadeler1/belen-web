import type { Metadata } from "next";
import ProductoPageView from "@/components/pages/ProductoPageView";

export const metadata: Metadata = {
  title: "Belén Express - Detalle de Producto",
};

export default function ProductoPage() {
  return <ProductoPageView />;
}
