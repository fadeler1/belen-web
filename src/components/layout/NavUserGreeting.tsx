"use client";

import { useAuth } from "@/context/AuthContext";
import { getDisplayName } from "@/lib/user/getDisplayName";

export default function NavUserGreeting() {
  const { user, isReady } = useAuth();
  const displayName = isReady
    ? user
      ? getDisplayName(user.fullName)
      : "Invitado"
    : "Invitado";

  return (
    <div className="navUserGreeting">
      <span className="greetingTitle">
        <strong>Buen día,</strong>
      </span>
      <span className="break"></span>
      <span className="greetingName">{displayName}</span>
    </div>
  );
}
