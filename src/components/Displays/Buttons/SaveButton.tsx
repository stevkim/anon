import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useToast } from "../../ui/use-toast";
import { savePost, unsavePost } from "@/lib/user.fetch";
import { Bookmark, BookmarkX } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import ButtonLoader from "@/components/Loaders/ButtonLoader";

interface Props {
  postId: string;
  saved: string;
}

const SaveButton = ({ postId, saved }: Props) => {
  const [save, setSave] = useState<string | null>(saved);
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const handleSave = async (type: string) => {
    const supabase = createClient();

    const { error } = await supabase.auth.getUser();

    if (error) {
      return toast({ description: "Must be logged in to save posts" });
    }

    setLoading(true);
    if (type === "save") {
      await savePost(postId).then((res) => {
        setSave(res.data.id);
      });
      toast({ title: "Added to your list" });
    } else {
      setSave(null);
      await unsavePost(postId, save!);
      toast({ title: "Removed from your list" });
    }
    queryClient.invalidateQueries({ queryKey: ["savedPosts"] });
    setLoading(false);
  };

  const SaveButtonContent = () => {
    return (
      <>
        {save ? <BookmarkX size={12} /> : <Bookmark size={12} />}
        <span className="ml-2 whitespace-nowrap">
          {save ? "Remove from List" : "Save to List"}
        </span>
      </>
    );
  };

  return (
    <>
      <button
        disabled={loading}
        onClick={() => {
          save ? handleSave("unsave") : handleSave("save");
        }}
        className="flex flex-row items-center text-[#717E8E] hover:text-popover-foreground"
      >
        {loading ? <ButtonLoader /> : <SaveButtonContent />}
      </button>
    </>
  );
};

export default SaveButton;
