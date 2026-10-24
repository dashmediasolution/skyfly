"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  MessageSquare,
  FileText,
  Plane,
  FolderOpen,
} from "lucide-react";

const navLinks = [
  {
    href: "/dashboard/bookings",
    label: "Bookings",
    icon: FileText,
  },
  {
    href: "/dashboard/contacts",
    label: "Contacts",
    icon: MessageSquare,
  },
  {
    href: "/dashboard/blogs",
    label: "Manage Blogs",
    icon: FileText,
  },
  {
  href: "/dashboard/airline",
  label: "Airline Policies",
  icon: Plane,
},
  {
    href: "/dashboard/airline-policy-categories",
    label: "Policy Categories",
    icon: FolderOpen,
  },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col space-y-2">
   {navLinks.map((link) => {
  const isActive = pathname
    ? pathname === link.href || pathname.startsWith(`${link.href}/`)
    : false;

  const Icon = link.icon;

  return (
    <Link
      key={link.href}
      href={link.href}
      className={cn(
        "flex items-center gap-3 rounded-md px-3 py-2 text-gray-700 transition-colors dark:text-gray-300",
        isActive
          ? "bg-[#FFD8AD] font-medium text-[#FF8C00] dark:bg-gray-800 dark:text-indigo-400"
          : "hover:bg-[#FFD8AD] hover:text-[#FF8C00] dark:hover:bg-gray-800"
      )}
    >
      <Icon className="h-5 w-5 shrink-0" />
      <span>{link.label}</span>
    </Link>
  );
})}
    </nav>
  );
}