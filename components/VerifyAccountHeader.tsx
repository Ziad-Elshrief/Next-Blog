"use client";

import { sendEmailVerificationMail } from "@/app/actions/user";
import useUserInfo from "@/hooks/useUserInfo";
import { AlertCircle } from "lucide-react";

export default function VerifyAccountHeader() {
  const { authInfo } = useUserInfo();
  if (!authInfo || authInfo.emailVerified) {
    return null;
  }
  const verifyHandler = async () => {
    await sendEmailVerificationMail();
  };
  return (
    <header className="flex items-center justify-center gap-x-3 border-yellow-700 bg-yellow-900 p-2 sm:gap-x-4">
      <h2 className="flex items-center gap-x-1 text-xs sm:text-base">
        <AlertCircle className="h-4 w-4 shrink-0" />
        Please verify your email address.
      </h2>
      <button
        onClick={verifyHandler}
        className="cursor-pointer rounded-xl border-yellow-600 bg-yellow-800 px-1.5 py-1 text-xs text-white hover:bg-yellow-700 sm:text-sm"
      >
        Verify Email
      </button>
    </header>
  );
}
