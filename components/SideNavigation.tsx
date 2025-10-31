"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton, useUser } from "@clerk/nextjs";

interface NavItem {
  name: string;
  href: string;
  icon: string;
}

const navItems: NavItem[] = [
  {
    name: "ダッシュボード",
    href: "/dashboard",
    icon: "📊",
  },
  {
    name: "材料管理",
    href: "/dashboard/materials",
    icon: "📦",
  },
  {
    name: "仕入先管理",
    href: "/dashboard/suppliers",
    icon: "🏢",
  },
];

export default function SideNavigation() {
  const pathname = usePathname();
  const { user } = useUser();

  return (
    <nav className="w-64 bg-white border-r min-h-screen p-4 flex flex-col">
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-800 px-4">
          Prigela Management
        </h2>
      </div>
      <ul className="space-y-2 flex-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? "bg-blue-50 text-blue-600 font-medium"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            </li>
          );
        })}
      </ul>
      <div className="mt-4 pt-4 border-t">
        <div className="px-4 py-3 flex items-center gap-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
          <UserButton
            appearance={{
              elements: {
                avatarBox: "w-10 h-10",
              },
            }}
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {user?.fullName || user?.firstName || "ユーザー"}
            </p>
            <p className="text-xs text-gray-500 truncate">
              {user?.emailAddresses[0]?.emailAddress}
            </p>
          </div>
        </div>
      </div>
    </nav>
  );
}
