"use client";

import { useRouter } from "next/navigation";
import { loginUserEmailPassword } from "@/app/actions/user";
import { useActionState, useEffect } from "react";

export default function LoginForm() {
  const router = useRouter();
  const [state, formAction, pending] = useActionState(
    loginUserEmailPassword,
    undefined
  );
  useEffect(() => {
    if (state?.success) router.push("/");
  }, [router, state]);
  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label htmlFor="email" className="mb-1 block">
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Enter your email..."
          required
        />
        {state?.errors?.email && (
          <p className="text-red-600">{state.errors.email}</p>
        )}
      </div>
      <div>
        <label htmlFor="password" className="mb-1 block">
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Enter your password"
          required
        />
        {state?.errors?.password && (
          <p className="text-red-600">{state.errors.password}</p>
        )}
      </div>
      <button
        type="submit"
        disabled={pending}
        className="rounded-lg disabled:bg-gray-600"
      >
        {pending ? "Logging In..." : "Log In"}
      </button>
    </form>
  );
}
