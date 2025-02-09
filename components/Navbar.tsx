"use client";

import { logout } from "@/app/actions/user";
import useUserInfo from "@/hooks/useUserInfo";
import { Home, LogOut, LogOutIcon, MenuIcon, X } from "lucide-react";
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
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  MenuSeparator,
} from "@headlessui/react";
import UserAvatar from "./UserAvatar";

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
        <div className="flex items-center justify-center space-x-3">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="md:hidden"
          >
            {isSidebarOpen ? <X /> : <MenuIcon />}
          </button>
          {!isLoading && (
            <>
              {user ? (
                <>
                  <NavUserIcon />
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
      <Sidebar setIsOpen={setIsSidebarOpen} isOpen={isSidebarOpen}>
        <NavSidebar />
      </Sidebar>
    </nav>
  );
}

function NavUserIcon() {
  const { user } = useUserInfo();
  return (
    <>
      {user && (
        <Menu as="div">
          <MenuButton>
            <UserAvatar />
          </MenuButton>
          <MenuItems
            transition
            anchor="bottom"
            className="text-foreground mt-4 mr-4 min-w-[8rem] origin-top overflow-hidden rounded-md border bg-gray-700 p-1 shadow-md transition duration-200 ease-out data-[closed]:scale-95 data-[closed]:opacity-0"
          >
            <MenuItem as="div" className="p-1.5">
              <h2 className="text-base font-semibold">
                {user.firstName} {user.lastName}
              </h2>
              <p className="text-xs text-cyan-200">{user.email}</p>
            </MenuItem>
            <MenuSeparator className="bg-foreground my-1 h-px" />
            <MenuItem>
              <button
                onClick={logout}
                className="flex w-full cursor-pointer items-center justify-between p-1.5"
              >
                Sign Out <LogOutIcon className="size-4" />
              </button>
            </MenuItem>
          </MenuItems>
        </Menu>
      )}
    </>
  );
}

function NavSidebar() {
  const { user, isLoading } = useUserInfo();
  return (
    <>
      {!isLoading && (
        <SidebarHeader>
          {user ? (
            <div className="flex items-center space-x-3">
              <UserAvatar sizeClass="size-10" />
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
    </>
  );
}
