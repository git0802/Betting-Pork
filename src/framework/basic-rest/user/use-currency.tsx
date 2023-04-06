import { useMemo } from "react";

export function formatMoney({
  amount,
  currencyCode,
  locale,
}: {
  amount: number;
  currencyCode: string;
  locale: string;
}) {
  const formatCurrency = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currencyCode,
  });
  const currencyFormatted = formatCurrency.format(amount);
  return currencyFormatted.replace(',00', '');
}

export default function useMoney(
  data?: {
    amount: number;
    baseAmount?: number;
    currencyCode: string;
  } | null
) {
  const { amount, baseAmount, currencyCode } = data ?? {};
  const locale = "id";
  const value = useMemo(() => {
    if (typeof amount !== "number" || !currencyCode) return "";

    return baseAmount
      ? formatMoney({ amount, currencyCode, locale })
      : formatMoney({ amount, currencyCode, locale });
  }, [amount, baseAmount, currencyCode]);

  return typeof value === "string"
    ? { money: value, baseMoney: null, discount: null }
    : value;
}
