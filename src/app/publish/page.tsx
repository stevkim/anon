import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import EditorContainer from "@/components/Editor/EditorContainer";

const PublishPage = async () => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.id) {
    redirect("/login");
  }

  return (
    <section className="page">
      <EditorContainer />
    </section>
  );
};

export default PublishPage;
