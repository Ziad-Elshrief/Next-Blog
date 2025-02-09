"use client";

import { logout } from "@/app/actions/user";
import useUserInfo from "@/hooks/useUserInfo";
import { Home, LogOut, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import {
  Sidebar,
  SidebarButtonItem,
  SidebarContent,
  SidebarHeader,
  SidebarLinkItem,
  SidebarSection,
} from "./Sidebar";
import Image from "next/image";

export default function Navbar() {
  const { user, isLoading } = useUserInfo();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <nav className="bg-secondary p-3">
      <div className="container mx-auto flex items-center justify-between">
        <div className="">Next Blog</div>
        <ul className="hidden md:flex">
          <li>
            <Link href="/">Home</Link>
          </li>
        </ul>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="md:hidden"
        >
          {isSidebarOpen ? <X /> : <Menu />}
        </button>
        <div className="flex items-center justify-center space-x-3">
          {!isLoading && (
            <>
              {user ? (
                <>
                  {user.avatar ? (
                    <Image
                      className="size-8 rounded-full border-2 border-cyan-300"
                      src={user.avatar}
                      alt={user.firstName}
                      width={32}
                      height={32}
                    />
                  ) : (
                    <div className="flex size-10 items-center justify-center rounded-full border-2 border-cyan-300 bg-cyan-600/70 text-xl text-white select-none">
                      {user.firstName.slice(0, 2).toUpperCase()}
                    </div>
                  )}
                  <button onClick={logout}>Sign Out</button>
                </>
              ) : (
                <>
                  <Link
                    href="/register"
                    className="bg-primary text-primary-foreground hover:bg-primary/90 h-9 cursor-pointer rounded-lg px-4 py-2 shadow"
                  >
                    Sign Up
                  </Link>
                  <Link
                    href="/login"
                    className="bg-primary text-primary-foreground hover:bg-primary/90 h-9 cursor-pointer rounded-lg px-4 py-2 shadow"
                  >
                    Sign In
                  </Link>
                </>
              )}
            </>
          )}
        </div>
      </div>
      <Sidebar
        setIsOpen={setIsSidebarOpen}
        isOpen={isSidebarOpen}
        inPlaceheightClass="h-[calc(100dvh-68px)]"
      >
        {!isLoading && (
          <SidebarHeader>
            {user ? (
              <div className="flex items-center space-x-3">
                {user.avatar ? (
                  <Image
                    className="size-10 rounded-full border-2 border-cyan-300"
                    src={user.avatar}
                    alt={user.firstName}
                    width={40}
                    height={40}
                  />
                ) : (
                  <div className="flex size-10 items-center justify-center rounded-full border-2 border-cyan-300 bg-cyan-600/70 text-xl text-white select-none">
                    {user.firstName.slice(0, 2).toUpperCase()}
                  </div>
                )}
                <div>
                  <h2 className="text-lg font-semibold">{user.firstName}</h2>
                  <p className="text-sm text-cyan-200">{user.email}</p>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center space-x-3">
                <Link
                  href="/register"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 h-9 cursor-pointer rounded-lg px-4 py-2 shadow"
                >
                  Sign Up
                </Link>
                <Link
                  href="/login"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 h-9 cursor-pointer rounded-lg px-4 py-2 shadow"
                >
                  Sign In
                </Link>
              </div>
            )}
          </SidebarHeader>
        )}
        <SidebarContent>
          <SidebarSection title="Navigation">
            <SidebarLinkItem href="/" icon={<Home className="size-5" />}>
              Home
            </SidebarLinkItem>
          </SidebarSection>
          {user && (
            <SidebarSection title="Account">
              <SidebarButtonItem
                onClick={logout}
                icon={<LogOut className="size-5" />}
              >
                Logout
              </SidebarButtonItem>
            </SidebarSection>
          )}
        </SidebarContent>
      </Sidebar>
    </nav>
  );
}
