import { type TQuote } from "@/types/quote";
import "./widgets.css";

interface Props {
  quote: TQuote;
}

const Quote = ({ quote }: Props) => {
  return (
    <div
      data-testid="quote"
      className="relative mx-auto my-10 w-fit max-w-[90%] py-4 md:max-w-[70%]"
    >
      <p className="quote text-lg">{quote.content}</p>
      <span className="float-right mr-2 mt-2 text-xl font-semibold italic">
        - {quote.author}
      </span>
    </div>
  );
};

export default Quote;
