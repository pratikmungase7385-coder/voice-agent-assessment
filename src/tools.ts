import menu from "./menu.json";
import { orderState } from "./state";

export function checkAvailability(itemName: string) {
  return menu.items.find(
    item => item.name.toLowerCase() === itemName.toLowerCase()
  );
}

export function addToOrder(itemName: string, quantity: number) {
  const item = checkAvailability(itemName);

  if (!item) {
    return "Item not found";
  }

  if (!item.available) {
    if (item.name === "Veg Biryani") {
      return "Veg Biryani is unavailable. Would you like Paneer Biryani instead?";
    }

    return `${item.name} is unavailable`;
  }

  const existingItem = orderState.items.find(
    orderItem =>
      orderItem.name.toLowerCase() === item.name.toLowerCase()
  );

  if (existingItem) {
    existingItem.quantity += quantity;
    orderState.total += item.price * quantity;

    return `Added ${quantity} ${item.name}`;
  }

  orderState.items.push({
    name: item.name,
    quantity,
    price: item.price
  });

  orderState.total += item.price * quantity;

  return `Added ${quantity} ${item.name}`;
}

export function modifyOrder(
  itemName: string,
  newQuantity: number
) {
  const orderItem = orderState.items.find(
    item =>
      item.name.toLowerCase() === itemName.toLowerCase()
  );

  if (!orderItem) {
    return "Item not found in order";
  }

  const oldQuantity = orderItem.quantity;

  orderItem.quantity = newQuantity;

  orderState.total =
    orderState.total -
    orderItem.price * oldQuantity +
    orderItem.price * newQuantity;

  return `Updated ${itemName} quantity to ${newQuantity}`;
}

export function removeFromOrder(itemName: string) {
  const index = orderState.items.findIndex(
    item =>
      item.name.toLowerCase() === itemName.toLowerCase()
  );

  if (index === -1) {
    return "Item not found in order";
  }

  const item = orderState.items[index];

  orderState.total -= item.price * item.quantity;

  orderState.items.splice(index, 1);

  return `Removed ${item.name}`;
}

export function getOrderSummary() {
  if (orderState.items.length === 0) {
    return "Order is empty";
  }

  let summary = "Current Order:\n";

  orderState.items.forEach(item => {
    summary += `${item.name} x${item.quantity}\n`;
  });

  summary += `Total: ₹${orderState.total}`;

  return summary;
}

export function getItemInfo(itemName: string) {
  const item = menu.items.find(
    item =>
      item.name.toLowerCase() === itemName.toLowerCase()
  );

  if (!item) {
    return "Item not found";
  }

  return `${item.name}: ${item.description}`;
}

export function getRecommendation() {
  const recommended = menu.items.find(
    item => item.available
  );

  if (!recommended) {
    return "No recommendations available right now.";
  }

  return `I recommend ${recommended.name}. ${recommended.description}`;
}