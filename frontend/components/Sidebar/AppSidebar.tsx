"use client";

import { Home, Inbox, Calendar, Search, Settings } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ChevronUp, User2 } from "lucide-react";

import { SidebarFooterLinks, SidebarLinks } from "@/constants";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { NavUser } from "./NavUser";
import { SwitchMode } from "../SwitchMode";

const AppSidebar = ({ role }: { role: string }) => {
  //logged-in user
  const data = {
    user: {
      name: "Hareesh",
      email: "hareesh@gmail.com",
      role: "admin",
    },
  };

  const {
    state,
    open,
    setOpen,
    openMobile,
    setOpenMobile,
    isMobile,
    toggleSidebar,
  } = useSidebar();

  const pathName = usePathname();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <Link
              href="/"
              className="flex mb-12 cursor-pointer items-center gap-2"
            >
              <Image
                src="/icons/sentinel-logo.png"
                height={36}
                width={36}
                alt="tms logo"
              />
              {state != "collapsed" && (
                <span className="sidebar-logo dark:text-white">SenTMS</span>
              )}
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          {/* <SidebarGroupLabel>SentinelTMS</SidebarGroupLabel> */}
          <SidebarGroupContent>
            <SidebarMenu>
              {SidebarLinks.map((item) => {
                const allowed = Array.isArray(item.role)
                  ? item.role.includes(role)
                  : item.role === role;

                if (!allowed) return null;

                return (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton
                      asChild
                      isActive={
                        pathName === item.route ||
                        pathName.startsWith(`${item.route}/`)
                          ? true
                          : false
                      }
                    >
                      <Link href={item.route}>
                        <item.imgUrl />
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SwitchMode />
          {SidebarFooterLinks.map((item) => (
            <SidebarMenuItem key={item.label}>
              <SidebarMenuButton asChild>
                <Link href={item.route}>
                  <item.imgUrl />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarFooter>

      <SidebarFooter>
        <NavUser user={data.user}></NavUser>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
