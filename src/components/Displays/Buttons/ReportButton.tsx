import { reportPost } from "@/lib/post.fetch";
import { createClient } from "@/utils/supabase/client";
import { Flag } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
  DialogFooter,
} from "../../ui/dialog";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Button } from "../../ui/button";
import { FormEvent, useState } from "react";
import { useToast } from "../../ui/use-toast";
import { validateReport } from "@/lib/validateReport";

interface Props {
  postId: string;
}

const ReportButton = ({ postId }: Props) => {
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const handleReport = async (e: FormEvent) => {
    e.preventDefault();
    const supabase = createClient();

    const { error } = await supabase.auth.getUser();

    if (error) {
      return toast({ description: "Must be logged in to report posts" });
    }

    // Validate the input for the report
    const validated = validateReport(input);

    if (!validated.success) {
      return toast({
        title: "Validation error",
        description: validated.error.issues[0].message,
        variant: "destructive",
      });
    }

    const response = await reportPost(postId, { reason: input });

    if (!response.ok) {
      toast({ title: "Internal server error", variant: "destructive" });
    } else {
      toast({ description: "Thank you for your report." });
    }
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          data-testid="report-button"
          className="flex flex-row items-center text-[#717E8E] hover:text-popover-foreground"
        >
          <Flag size={12} />
          <span className="ml-2 whitespace-nowrap">Report Post</span>
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Report Post</DialogTitle>
          <DialogDescription>
            Please provide the reason for your report
          </DialogDescription>
        </DialogHeader>
        <div>
          <Label htmlFor="reason" className="sr-only">
            Reason
          </Label>
          <Input id="reason" onChange={(e) => setInput(e.target.value)} />
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleReport}>
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ReportButton;
