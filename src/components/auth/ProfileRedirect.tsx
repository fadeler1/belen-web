"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AUTH_EVENTS } from "@/lib/auth/config";

export default function ProfileRedirect() {
  const router = useRouter();

  useEffect(() => {
    window.dispatchEvent(new CustomEvent(AUTH_EVENTS.openProfile));
    router.replace("/");
  }, [router]);

  return null;
}
