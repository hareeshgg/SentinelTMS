declare interface HeaderBoxProps {
  type?: "title" | "greeting";
  title: string;
  subtext: string;
  user?: string;
}

declare interface SidebarProps {
  user: User;
}

declare type User = {
  $id: string;
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  dob: string;
  password: string;
};
