import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Pencil, Plus } from "lucide-react";
import AuthForm from "./AuthForm";
import { getUser } from "@/actions/actions";
import { userProps } from "@/constants";

interface UserDailogProps {
  use: string;
  user?: userProps;
}

export function UserDailog({ use, user }: UserDailogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {use === "add" ? (
          <Button variant="outline" className="cursor-pointer rounded-lg ">
            <span>
              <Plus />
            </span>
            Add New User
          </Button>
        ) : (
          <span className="cursor-pointer hover:bg-gray-300 rounded-xl">
            <Button>
              <Pencil size={20} />
            </Button>
          </span>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          {use === "add" ? (
            <>
              <DialogTitle>Add New User</DialogTitle>
              <DialogDescription>Create a new user account.</DialogDescription>
            </>
          ) : (
            <>
              <DialogTitle>Update User</DialogTitle>
              <DialogDescription>
                Update user account with latest details.
              </DialogDescription>
            </>
          )}
        </DialogHeader>
        {/* Add Form validation & Toast for error */}

        <AuthForm type="sign-up" work="manage" data={user} />
      </DialogContent>
    </Dialog>
  );
}
