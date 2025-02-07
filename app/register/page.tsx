"use client";
import { useActionState, useEffect } from "react";
import createUserEmailPassword from "../actions/user";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [state, formAction, pending] = useActionState(
    createUserEmailPassword,
    undefined
  );
  useEffect(() => {
    if (state?.success) router.push("/");
  }, [router, state]);
  return (
    <div>
      <form action={formAction} className="space-y-4">
        <div>
          <label htmlFor="firstName" className="mb-1 block">
            First Name
          </label>
          <input
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
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            placeholder="Enter your last name..."
            required
          />
          {state?.errors?.lastName && (
            <p className="text-red-600">{state.errors.lastName}</p>
          )}
        </div>
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
        <div>
          <label htmlFor="confirmPassword" className="mb-1 block">
            Confirm Password
          </label>
          <input
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
          type="submit"
          disabled={pending}
          className="rounded-lg disabled:bg-gray-600"
        >
          {pending ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
}
