"use client";

import { useAuth } from "@/context/AuthContext";
import { getDisplayName } from "@/lib/user/getDisplayName";

export default function AccessClientButton() {
  const { user, isReady } = useAuth();
  const label =
    isReady && user ? getDisplayName(user.fullName) : "Cliente";

  return (
    <button className="accessclientBtn" type="button">
      <div className="iconAccessClient"></div>
      <p className="accesClientitle">{label}</p>
    </button>
  );
}
