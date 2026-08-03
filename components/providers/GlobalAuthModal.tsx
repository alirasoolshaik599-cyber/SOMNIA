"use client";

import AuthRequiredModal from "@/components/auth/AuthRequiredModal";
import { useAuthContext } from "@/components/providers/AuthProvider";

export default function GlobalAuthModal() {
  const { authRequiredOpen, closeAuthRequired } = useAuthContext();

  return (
    <AuthRequiredModal
      open={authRequiredOpen}
      onClose={closeAuthRequired}
    />
  );
}