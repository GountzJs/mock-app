export const pagination = (elements: any, page: number, records: number) => {
  const start = page * records;
  const end = start + records;
  return elements?.slice(start, end);
};
