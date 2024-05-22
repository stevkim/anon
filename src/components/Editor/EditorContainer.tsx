"use client";
import { useState } from "react";
import Editor from "./Editor";
import { createPost } from "@/lib/post.fetch";
import { Button } from "../ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useQueryClient } from "@tanstack/react-query";
import defaultValue from "./defaultValue";
import validateContent from "@/lib/validateContent";
import ButtonLoader from "../Loaders/ButtonLoader";

const EditorContainer = () => {
  const [content, setContent] = useLocalStorage("content", defaultValue);
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { push } = useRouter();

  const submit = async () => {
    if (!validateContent(content)) {
      return toast({
        title: "Error Posting",
        description:
          "Please make sure your writing is in your own words and is longer than 2 lines.",
        variant: "destructive",
      });
    }
    setLoading(true);
    const response = await createPost({ content: content });

    setLoading(false);
    if (!response.ok) {
      return toast({
        title: "Internal server Error",
        description: "There was a problem creating your post.",
        variant: "destructive",
      });
    }

    localStorage.setItem("content", JSON.stringify(defaultValue));
    toast({
      title: "Post Created",
      description: "Redirecting you to the main page",
    });
    queryClient.invalidateQueries();
    push("/");
  };

  return (
    <div className="py-4">
      <Editor
        initialContent={
          content && content.content.length > 1 ? content : defaultValue
        }
        onChange={setContent}
      />
      <div className="float-right mt-4">
        {loading ? (
          <Button disabled>
            <ButtonLoader message={"Posting"} />
          </Button>
        ) : (
          <Button onClick={submit}>Submit</Button>
        )}
      </div>
    </div>
  );
};

export default EditorContainer;
