import type { Metadata } from "next";
import ProfileRedirect from "@/components/auth/ProfileRedirect";

export const metadata: Metadata = {
  title: "Belén Express - Modificar perfil",
};

export default function ProfilePage() {
  return <ProfileRedirect />;
}
