"use client";
import { signout } from "@/actions/auth.actions";
import { useToast } from "../ui/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { LogOut } from "lucide-react";

const LogoutButton = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const logout = async () => {
    await signout();
    queryClient.removeQueries({ queryKey: ["userPosts", "savedPosts"] });
    queryClient.invalidateQueries({ queryKey: ["posts"] });
    toast({ title: "Successfully Logged out" });
  };

  return (
    <button
      data-testid="logout-button"
      className="flex items-center text-left text-[#717E8E] hover:text-popover-foreground"
      onClick={logout}
    >
      <LogOut size={16} className="mr-2" />
      Log out
    </button>
  );
};

export default LogoutButton;
