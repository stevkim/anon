import ShareButton from "./Buttons/ShareButton";
import { EllipsisVertical } from "lucide-react";
import ReportButton from "./Buttons/ReportButton";
import SaveButton from "./Buttons/SaveButton";
import DeleteButton from "./Buttons/DeleteButton";
import { useContext } from "react";
import { MenuContext } from "@/app/providers";
import { Separator } from "../ui/separator";

interface Props {
  postId: string;
  saved: string;
  authorId: string;
}

const ButtonMenu = ({ postId, saved, authorId }: Props) => {
  const { menu, setMenu } = useContext(MenuContext);

  const handleToggle = () => {
    if (menu === postId) {
      setMenu("");
    } else {
      setMenu(postId);
    }
  };

  return (
    <div
      className="relative flex items-center "
      onClick={(e) => e.stopPropagation()}
    >
      <button onClick={handleToggle}>
        <EllipsisVertical
          size={16}
          className={`transition-all ${
            menu === postId ? "rotate-90" : "rotate-0 hover:-rotate-[20deg]"
          }`}
        />
      </button>
      {menu === postId ? (
        <div className="absolute bottom-[20px] right-[-1rem] z-[100] flex flex-col gap-2 rounded-[--radius] bg-popover px-4 py-2 text-sm shadow-md">
          <ShareButton postId={postId} />
          <SaveButton postId={postId} saved={saved} />
          <ReportButton postId={postId} />
          {authorId === "author" ? (
            <>
              <Separator />
              <DeleteButton postId={postId} />
            </>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

export default ButtonMenu;
