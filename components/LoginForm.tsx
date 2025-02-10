"use client";

import { useRouter } from "next/navigation";
import { loginUserEmailPassword, loginUserGoogle } from "@/app/actions/user";
import { useActionState, useEffect } from "react";
import { Loader } from "lucide-react";
import Image from "next/image";
import { Input } from "./Input";
import Link from "next/link";

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
    <>
      <button
        onClick={loginUserGoogle}
        className="flex h-9 w-full cursor-pointer items-center justify-center gap-x-2 rounded-lg border-gray-700 bg-gray-800 px-4 py-2 text-white hover:bg-gray-700"
      >
        <Image priority src="/google.svg" height={16} width={16} alt="google" />
        Sign in with Google
      </button>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-gray-700" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background-300 dark:bg-gray-900 px-2 text-gray-700 dark:text-gray-400">
            or continue with
          </span>
        </div>
      </div>
      <form action={formAction} className="space-y-4">
        <div>
          <label htmlFor="email" className="mb-1 block">
            Email
          </label>
          <Input
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
          <div className="mb-1 flex items-center justify-between">
            <label htmlFor="password" className="block">
              Password
            </label>

            <Link
              href="/forgot-password"
              className="text-sm font-bold hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          <Input
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
          disabled={pending}
          type="submit"
          className="flex h-9 w-full cursor-pointer items-center justify-center gap-x-1.5 rounded-lg bg-primary px-4 py-2 text-white shadow hover:bg-primary-hover disabled:bg-gray-600"
        >
          {pending && <Loader className="mr-2 h-4 w-4 animate-spin" />}
          Sign In
        </button>
      </form>
    </>
  );
}
