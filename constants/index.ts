export type SidebarRole = string | string[];

export type SidebarLink = {
  imgUrl: string;
  route: string;
  label: string;
  role: SidebarRole;
};

export const SidebarLinks: SidebarLink[] = [
  {
    imgUrl: "/icons/house.svg",
    route: "/",
    label: "Dashboard",
    role: ["admin", "analyst", "compliance"],
  },
  {
    imgUrl: "/icons/clipboard-list.svg",
    route: "/rules",
    label: "Rules",
    role: "admin",
  },
  {
    imgUrl: "/icons/users.svg",
    route: "/users",
    label: "Users",
    role: "admin",
  },
  {
    imgUrl: "/icons/history.svg",
    route: "/audit",
    label: "Audit Trail",
    role: "admin",
  },
  {
    imgUrl: "/icons/banknote.svg",
    route: "/transactions",
    label: "Transactions",
    role: ["analyst", "compliance"],
  },
  {
    imgUrl: "/icons/octagon-alert.svg",
    route: "/alerts",
    label: "Alerts",
    role: ["analyst", "compliance"],
  },
  {
    imgUrl: "/icons/file-chart-column.svg",
    route: "/sar",
    label: "Activity Reports",
    role: ["analyst", "compliance"],
  },
];

// make everything in role array and then item.role.includes(role)
// make dashboard default for all users
