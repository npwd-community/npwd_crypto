export interface Transaction {
  type: "bought" | "sold" | "transferred";
  amount: number
  value: number
}