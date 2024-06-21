export type TableColumns<T> = {
  key: keyof T;
  title: string;
  formatter?: (value?: string | number) => string | JSX.Element;
};
