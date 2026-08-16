import { v4 as uuidv4 } from "uuid";

export function generateUniqueId() {
  // unique order id
  const uuidString = uuidv4();
  const parts = uuidString.split("-");
  return `ORD-${parts[0].toUpperCase()}-${parts[1].toUpperCase()}`;
}
