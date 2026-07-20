import readline from "readline";
import { processMessage } from "./agent";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log("Restaurant Voice Agent Started");
console.log("Type 'exit' to quit");

function chat() {
  rl.question("You: ", (message) => {

    if (message.toLowerCase() === "exit") {
      rl.close();
      return;
    }

    const response = processMessage(message);

    console.log("Agent:", response);

    chat();
  });
}

chat();