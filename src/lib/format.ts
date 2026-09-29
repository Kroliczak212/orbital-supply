export function formatPrice(amount: string, currency: string) {
  return new Intl.NumberFormat("pl-PL", { style: "currency", currency }).format(
    Number(amount),
  );
}
