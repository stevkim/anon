import { useState } from "react";
import { likePost, unlikePost } from "@/lib/post.fetch";
import { createClient } from "@/utils/supabase/client";
import { Heart } from "lucide-react";
import { useToast } from "../../ui/use-toast";

interface Props {
  liked: string | null;
  likes: number;
  postId: string;
}

const LikeButton = ({ liked, likes, postId }: Props) => {
  const [likeId, setLikeId] = useState<string | null>(liked);
  const [likeCount, setLikeCount] = useState<number>(likes);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleLike = async (type: string) => {
    const supabase = createClient();

    const user = (await supabase.auth.getSession()).data.session?.user;

    if (!user) {
      return toast({ description: "Must be logged in to like posts" });
    }

    setLoading(true);
    if (type === "like") {
      setLikeId("loading...");
      setLikeCount((state) => state + 1);

      await likePost(postId).then((res) => {
        setLikeId(res.data.id);
      });
    } else {
      setLikeId(null);
      setLikeCount((state) => state - 1);
      await unlikePost(postId, likeId!);
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center">
      <button
        data-testid="like-button"
        type="button"
        disabled={loading}
        className="hover:animate-ping-fast"
        onClick={() => {
          likeId ? handleLike("unlike") : handleLike("like");
        }}
      >
        {likeId ? <Heart size="16" fill="currentColor" /> : <Heart size="16" />}
      </button>
      <span className="ml-2 text-xs text-[gray]">{likeCount}</span>
    </div>
  );
};

export default LikeButton;
