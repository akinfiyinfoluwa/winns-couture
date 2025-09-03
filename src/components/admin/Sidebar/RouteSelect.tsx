"use client";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { IconType } from "react-icons";
import { FaSignsPost } from "react-icons/fa6";
import {
  FiDollarSign,
  FiHome,
  FiLink,
  FiMail,
  FiPaperclip,
  FiUsers,
} from "react-icons/fi";

export const RouteSelect = () => {
  const pathname = usePathname();
  return (
    <div className="space-y-1">
      <Route href="/admin" Icon={FiHome} selected={pathname === "/admin"} title="Dashboard" />
      <Route href="/admin/posts" Icon={FaSignsPost} selected={pathname?.startsWith("/admin/posts")} title="Posts" />
      <Route href="#" Icon={FiUsers} selected={false} title="Team" />
      <Route href="#" Icon={FiMail} selected={false} title="Manage Newsletter" />
      <Route href="#" Icon={FiPaperclip} selected={false} title="Invoices" />
      <Route href="#" Icon={FiLink} selected={false} title="Integrations" />
      <Route href="#" Icon={FiDollarSign} selected={false} title="Finance" />
    </div>
  );
};

const Route = ({
  selected,
  Icon,
  title,
  href,
}: {
  selected: boolean;
  Icon: IconType;
  title: string;
  href: string;
}) => {
  const router = useRouter();
  return (
    <button
      onClick={() => router.push(href)}
      className={`flex items-center justify-start gap-2 w-full rounded px-2 py-1.5 text-sm transition-[box-shadow,_background-color,_color] ${
        selected
          ? "bg-white text-stone-950 shadow"
          : "hover:bg-stone-200 bg-transparent text-stone-500 shadow-none"
      }`}
    >
      <Icon className={selected ? "text-violet-500" : ""} />
      <span>{title}</span>
    </button>
  );
};
