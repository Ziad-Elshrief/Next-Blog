"use client";

import LoginForm from "@/components/LoginForm";
import { loginUserGoogle } from "../actions/user";

export default function LoginPage() {
  return (
    <div>
      <button type="button" onClick={async () => await loginUserGoogle()}>
        Sign In with google
      </button>
      <LoginForm />
    </div>
  );
}
