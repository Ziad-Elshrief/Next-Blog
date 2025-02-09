"use client";

import createUserEmailPassword from "@/app/actions/user";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { Input } from "./Input";

export default function RegisterForm() {
  const router = useRouter();
  const [state, formAction, pending] = useActionState(
    createUserEmailPassword,
    undefined
  );
  useEffect(() => {
    if (state?.success) router.push("/");
  }, [router, state]);
  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label htmlFor="firstName" className="mb-1 block">
          First Name
        </label>
        <Input
          type="text"
          name="firstName"
          id="firstName"
          placeholder="Enter your first name..."
          required
        />
        {state?.errors?.firstName && (
          <p className="text-red-600">{state.errors.firstName}</p>
        )}
      </div>
      <div>
        <label htmlFor="lastName" className="mb-1 block">
          Last Name (optional)
        </label>
        <Input
          type="text"
          name="lastName"
          id="lastName"
          placeholder="Enter your last name..."
        />
        {state?.errors?.lastName && (
          <p className="text-red-600">{state.errors.lastName}</p>
        )}
      </div>
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
        <label htmlFor="password" className="mb-1 block">
          Password
        </label>
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
      <div>
        <label htmlFor="confirmPassword" className="mb-1 block">
          Confirm Password
        </label>
        <Input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          placeholder="Confirm your password"
          required
        />
        {state?.errors?.confirmPassword && (
          <p className="text-red-600">{state.errors.confirmPassword}</p>
        )}
      </div>
      <button
        disabled={pending}
        type="submit"
        className="h-9 w-full cursor-pointer rounded-lg bg-cyan-900 px-4 py-2 text-white shadow hover:bg-sky-700 disabled:bg-gray-600"
      >
        {pending && <Loader className="mr-2 h-4 w-4 animate-spin" />}
        Register
      </button>
    </form>
  );
}
