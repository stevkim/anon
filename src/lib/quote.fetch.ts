import { type TQuote } from "@/types/quote";

export const getQuote = async () => {
  const data = await fetch(
    "https://api.quotable.io/quotes/random?tags=literature|life|creativity&limit=1",
    { next: { revalidate: 3600 } },
  );

  return (await data.json())[0] as TQuote;
};
