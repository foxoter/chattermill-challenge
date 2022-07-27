export const generateListKey = (param?: string) => {
  return `${param}/${String(Math.random())}`;
};
