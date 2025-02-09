"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MouseEventHandler, useEffect, type ReactNode } from "react";

interface SidebarProps {
  children: ReactNode;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const MEDIUM_SCREEN_WIDTH = 768;

export function Sidebar({ children, isOpen, setIsOpen }: SidebarProps) {
  useEffect(() => {
    const sidebarHandler = () => {
      if (window.innerWidth > MEDIUM_SCREEN_WIDTH) setIsOpen(false);
    };
    window.addEventListener("resize", sidebarHandler);
    return () => {
      window.removeEventListener("resize", sidebarHandler);
    };
  });
  return (
    <>
      <div
        className={`fixed inset-y-0 left-0 z-40 transform transition duration-200 ease-in-out md:hidden md:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div
          className={`flex h-dvh w-64 flex-col overflow-y-auto bg-slate-800 text-white`}
        >
          {children}
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}

interface SidebarHeaderProps {
  children: ReactNode;
}

export function SidebarHeader({ children }: SidebarHeaderProps) {
  return <div className="bg-secondary p-4">{children}</div>;
}

interface SidebarContentProps {
  children: ReactNode;
}

export function SidebarContent({ children }: SidebarContentProps) {
  return <div className="flex-1 overflow-y-auto p-4">{children}</div>;
}

type SidebarLinkItemProps = {
  href: string;
  icon: ReactNode;
  children: ReactNode;
};

export function SidebarLinkItem({
  href,
  icon,
  children,
}: SidebarLinkItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`flex items-center space-x-3 rounded-md px-3 py-2 transition-colors ${
        isActive
          ? "bg-secondary text-white"
          : "hover:bg-secondary/90 text-cyan-100"
      }`}
    >
      {icon}
      <span>{children}</span>
    </Link>
  );
}

type SidebarButtonItemProps = {
  icon: ReactNode;
  onClick: MouseEventHandler<HTMLButtonElement> | undefined;
  children: ReactNode;
};

export function SidebarButtonItem({
  onClick,
  icon,
  children,
}: SidebarButtonItemProps) {
  return (
    <button
      onClick={onClick}
      className="cursor-pointer hover:bg-secondary/90 flex w-full items-center space-x-3 rounded-md px-3 py-2 text-cyan-100 transition-colors"
    >
      {icon}
      <span>{children}</span>
    </button>
  );
}

interface SidebarSectionProps {
  title: string;
  children: ReactNode;
}

export function SidebarSection({ title, children }: SidebarSectionProps) {
  return (
    <div className="mb-6">
      <h3 className="mb-2 px-3 text-sm font-semibold tracking-wider text-cyan-200 uppercase">
        {title}
      </h3>
      <div className="space-y-1">{children}</div>
    </div>
  );
}
