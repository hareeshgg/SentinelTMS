import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Pencil, Plus, Trash2 } from "lucide-react";
import AuthForm from "./AuthForm";
import { userProps } from "@/constants";
import { delUser } from "@/actions/actions";

interface UserDailogProps {
  use: "add" | "update" | "delete";
  user?: userProps;
}

export function UserDailog({ use, user }: UserDailogProps) {
  let trigger;

  if (use === "add") {
    trigger = (
      <Button variant="outline" className="cursor-pointer rounded-lg ">
        <span>
          <Plus />
        </span>
        Add New User
      </Button>
    );
  } else if (use === "update") {
    trigger = (
      <span className="cursor-pointer hover:bg-gray-300 rounded-xl">
        <Button>
          <Pencil size={20} />
        </Button>
      </span>
    );
  } else if (use === "delete") {
    trigger = (
      <span className="cursor-pointer hover:bg-gray-300 rounded-xl">
        <Button>
          <Trash2 size={20} />
        </Button>
      </span>
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          {use === "add" && (
            <>
              <DialogTitle>Add New User</DialogTitle>
              <DialogDescription>Create a new user account.</DialogDescription>
            </>
          )}

          {use === "update" && (
            <>
              <DialogTitle>Update User</DialogTitle>
              <DialogDescription>
                Update user account with latest details.
              </DialogDescription>
            </>
          )}

          {use === "delete" && (
            <>
              <DialogTitle>Delete User</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this user?
              </DialogDescription>
            </>
          )}
        </DialogHeader>

        {/* For add + update we show the AuthForm */}
        {(use === "add" || use === "update") && (
          <AuthForm
            mode={use === "add" ? "create" : "edit"}
            data={use === "update" ? user : undefined}
          />
        )}

        {/* For delete you probably want a confirm UI instead of AuthForm */}
        {use === "delete" && (
          // TODO: hook this up to delUser(user?.id)
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button
                className="form-btn"
                onClick={async () => {
                  await delUser(Number(user?.id));
                  console.log("User deleted");
                }}
              >
                Delete User
              </Button>
            </DialogClose>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
