export const formatMoney = (value: number) => new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: value % 1 === 0 ? 0 : 2
}).format(value);

export const formatDate = (value: string) => new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric"
}).format(new Date(value));
