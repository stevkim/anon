export const formatDate = (date: Date) => {
  const time = new Date(date);
  return time.toLocaleString([], {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};
