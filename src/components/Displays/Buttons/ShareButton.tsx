import { useState } from "react";
import { Share2, Copy, Check } from "lucide-react";
import { useToast } from "../../ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../../ui/dialog";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";

interface Props {
  postId: string;
}

const ShareButton = ({ postId }: Props) => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const url = `${process.env.URL}/post?id=${postId}`;

  const copyLink = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    toast({
      title: "Link Copied",
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex flex-row items-center text-[#717E8E] hover:text-popover-foreground">
          <Share2 size={12} />
          <span className="ml-2 whitespace-nowrap">Share Post</span>
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Share link</DialogTitle>
          <DialogDescription>
            Anyone who has this link will be able to view the content.
          </DialogDescription>
        </DialogHeader>
        <div className="flex w-full gap-4">
          <Label htmlFor="link" className="sr-only">
            Link
          </Label>
          <Input id="link" defaultValue={url} readOnly />
          <Button onClick={copyLink} size={"icon"}>
            {copied ? <Check size={16} /> : <Copy size={16} />}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShareButton;
