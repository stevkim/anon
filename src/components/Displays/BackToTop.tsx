import { MoveUp } from "lucide-react";
import { useState } from "react";

interface Props {
  scrollToTop: () => void;
}

const BackTotop = ({ scrollToTop }: Props) => {
  const [hover, setHover] = useState(false);

  return (
    <span
      className={`fixed bottom-8 right-4 z-[100] flex h-[35px] w-[35px] cursor-pointer items-center justify-center rounded-full border-2 md:right-[5%] xl:right-[15%] ${hover ? "animate-flip-h scale-105 border-primary" : ""}`}
      onClick={scrollToTop}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <MoveUp size={20} color="currentColor" />
    </span>
  );
};
// ${hover ? "animate-ping-fast" : ""}
export default BackTotop;
