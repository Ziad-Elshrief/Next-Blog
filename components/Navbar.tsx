"use client";

import { logout } from "@/app/actions/user";
import useUserInfo from "@/hooks/useUserInfo";
import Link from "next/link";

export default function Navbar() {
  const user = useUserInfo();
  return (
    <nav>
      <div className="container mx-auto flex items-center justify-between">
        <div className="">Next Blog</div>
        <ul className="flex">
          <li>
            <Link href="/">Home</Link>
          </li>
        </ul>
        <div className="flex">
          {user ? (
            <>
              <p>{user.firstName}</p>
              <button onClick={logout}>Sign Out</button>
            </>
          ) : (
            <>
              <Link href="/register">Sign Up</Link>
              <Link href="/login">Sign In</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
