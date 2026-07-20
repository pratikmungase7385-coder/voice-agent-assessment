import { processMessage } from "../src/agent";

describe("Voice Agent Tests", () => {

  test("Add item to order", () => {
    const result = processMessage("add 2 Coke");

    expect(result).toBe("Added 2 Coke");
  });

  test("Unavailable item", () => {
    const result = processMessage("add Veg Biryani");

    expect(result).toContain("unavailable");
  });

  test("Recommendation", () => {
    const result = processMessage(
      "what do you recommend?"
    );

    expect(result).toContain("recommend");
  });

  test("Menu grounded question", () => {
    const result = processMessage(
      "is paneer tikka spicy?"
    );

    expect(result).toContain("Paneer Tikka");
  });

  test("Order summary", () => {
    processMessage("add Coke");

    const result = processMessage("summary");

    expect(result).toContain("Total");
  });

});