export const highlightText = (
  text: string,
  query: string,
): { highlighted: boolean; value: string }[] => {
  if (!query) return [{ highlighted: false, value: text }];

  const regex = new RegExp(`(${query})`, 'gi');
  const parts = text.split(regex);

  return parts.map((part) => ({
    highlighted: part.toLowerCase() === query.toLowerCase(),
    value: part,
  }));
};
