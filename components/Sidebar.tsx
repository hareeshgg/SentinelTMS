"use client";

import { SidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = ({ role }: { role: string }) => {
  const pathName = usePathname();
  return (
    <section className="sidebar">
      <nav className="flex flex-col gap-4">
        <Link href="/" className="flex mb-12 cursor-pointer items-center gap-2">
          <Image
            src="/icons/sentinel-logo.png"
            height={40}
            width={40}
            alt="tms logo"
          />
          <h1 className="sidebar-logo">SentinelTMS</h1>
        </Link>
        {SidebarLinks.map((item) => {
          const isActive =
            pathName === item.route || pathName.startsWith(`${item.route}/`);

          const allowed = Array.isArray(item.role)
            ? item.role.includes(role)
            : item.role === role;

          if (!allowed) return null;

          return (
            <Link
              href={item.route}
              key={item.label}
              className={cn("sidebar-link", {
                "bg-blue-500": isActive,
              })}
            >
              <div className="relative size-6">
                <Image
                  src={item.imgUrl}
                  alt={item.label}
                  fill
                  className={cn({
                    "brightness-[3] invert": isActive,
                  })}
                />
              </div>
              <p
                className={cn("sidebar-label", {
                  "text-white!": isActive,
                })}
              >
                {item.label}
              </p>
            </Link>
          );
        })}
      </nav>
    </section>
  );
};

export default Sidebar;
