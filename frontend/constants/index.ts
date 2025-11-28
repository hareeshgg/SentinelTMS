import { Role } from "@/lib/generated/prisma/enums";
import {
  House,
  ClipboardList,
  Users,
  History,
  Banknote,
  OctagonAlert,
  FileChartColumn,
  Settings,
  MessageCircleQuestionMark,
  MessageSquareShare,
} from "lucide-react";
import { ForwardRefExoticComponent } from "react";

export type SidebarRole = string | string[];

export type SidebarLink = {
  imgUrl: ForwardRefExoticComponent<any> | string;
  route: string;
  label: string;
  role: SidebarRole;
};

export const SidebarLinks: SidebarLink[] = [
  {
    imgUrl: House,
    route: "/",
    label: "Dashboard",
    role: ["admin", "analyst", "compliance"],
  },
  {
    imgUrl: ClipboardList,
    route: "/rules",
    label: "Rules",
    role: "admin",
  },
  {
    imgUrl: Users,
    route: "/users",
    label: "Users",
    role: "admin",
  },
  {
    imgUrl: History,
    route: "/audit",
    label: "Logs",
    role: "admin",
  },
  {
    imgUrl: Banknote,
    route: "/transactions",
    label: "Transactions",
    role: ["analyst", "compliance"],
  },
  {
    imgUrl: OctagonAlert,
    route: "/alerts",
    label: "Alerts",
    role: ["analyst", "compliance"],
  },
  {
    imgUrl: FileChartColumn,
    route: "/sar",
    label: "Activity Reports",
    role: ["analyst", "compliance"],
  },
];

export const SidebarFooterLinks = [
  {
    imgUrl: Settings,
    route: "/settings",
    label: "Settings",
  },

  {
    imgUrl: MessageCircleQuestionMark,
    route: "/help",
    label: "Get Help",
  },

  {
    imgUrl: MessageSquareShare,
    route: "/feedback",
    label: "Feedback",
  },
];
// make everything in role array and then item.role.includes(role)
// make dashboard default for all users

export type userProps = {
  id: number;
  firstName: string;
  lastName: string;
  city: string;
  phone: string;
  dob: string;
  email: string;
  password: string;
  role: Role;
  createdAt: Date;
  uppdatedAt: Date;
};
