import {
  addToOrder,
  modifyOrder,
  getOrderSummary,
  removeFromOrder,
  getItemInfo,
  getRecommendation
} from "./tools";

let lastOrderedItem = "";

export function processMessage(message: string) {
  const text = message.toLowerCase().trim();

  // ADD ITEM
  if (text.startsWith("add ")) {
    const parts = message.split(" ");

    if (parts.length >= 3 && !isNaN(Number(parts[1]))) {
      const quantity = Number(parts[1]);
      const itemName = parts.slice(2).join(" ");

      lastOrderedItem = itemName;

      return addToOrder(itemName, quantity);
    }

    const itemName = message.substring(4).trim();

    lastOrderedItem = itemName;

    return addToOrder(itemName, 1);
  }

  // REMOVE ITEM
  if (text.startsWith("remove ")) {
    const itemName = message.substring(7).trim();

    return removeFromOrder(itemName);
  }

  // SUMMARY
  if (
    text.includes("summary") ||
    text.includes("order")
  ) {
    return getOrderSummary();
  }

  // MODIFY QUANTITY
  if (text.startsWith("make it ")) {
    const quantity = Number(text.replace("make it ", ""));

    if (!lastOrderedItem) {
      return "No previous item found.";
    }

    return modifyOrder(lastOrderedItem, quantity);
  }

  // SPICY QUESTION
  if (
    text.includes("paneer tikka") &&
    text.includes("spicy")
  ) {
    return getItemInfo("Paneer Tikka");
  }

  // RECOMMENDATION
  if (
    text.includes("recommend") ||
    text.includes("suggest")
  ) {
    return getRecommendation();
  }

  return "Sorry, I didn't understand.";
}