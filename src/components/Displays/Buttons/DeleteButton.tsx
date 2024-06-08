import { createClient } from "@/utils/supabase/client";
import { deletePost } from "@/lib/post.fetch";
import { useToast } from "../../ui/use-toast";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogAction,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogCancel,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { Trash2 } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

interface Props {
  postId: string;
}

const DeleteButton = ({ postId }: Props) => {
  const queryCLient = useQueryClient();
  const { toast } = useToast();
  const handleDelete = async () => {
    const supabase = createClient();

    const user = (await supabase.auth.getSession()).data.session?.user;

    if (!user) {
      return toast({
        title: "Whoops!",
        description: "Only the author may delete posts",
      });
    }

    await deletePost(postId);
    queryCLient.invalidateQueries({ queryKey: ["posts"] });
    toast({
      title: "Post Deleted",
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="flex flex-row items-center text-[#717E8E] hover:text-popover-foreground">
          <Trash2 size={12} />
          <span className="ml-2 whitespace-nowrap">Delete Post</span>
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this post
            and remove all its underlying data.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteButton;
