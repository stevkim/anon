import { MoveLeft } from "lucide-react";

interface Props {
  scrollToTop: () => void;
}

const BackTotop = ({ scrollToTop }: Props) => {
  return (
    <span
      className="fixed -right-2 bottom-10 z-[100] flex w-[150px] rotate-90 cursor-pointer items-center border-b-2 border-b-accent font-logo text-lg hover:border-b-primary md:right-[8%] xl:right-[12%]"
      onClick={scrollToTop}
    >
      <MoveLeft size={16} className="mr-1" />
      Back To Top
    </span>
  );
};

export default BackTotop;
