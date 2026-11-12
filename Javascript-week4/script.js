//voice assistant
let name = "";
let todos = [];
function getReply(command) {
  if (command.startsWith("Hello my name is")) {
    name = command.split(" ")[4];
    return `Nice to meet you ${name}`;
  } else if (command === "What is my name?") {
    return `Your name is ${name}`;
  } else if (command.startsWith("Add ")) {
    const todo = command.split("Add ")[1].split(" to my todo")[0];
    todos.push(todo);
    return `${todo} added to your todo`;
  } else if (command.startsWith("Remove ")) {
    const todo = command.split("Remove ")[1].split(" from my todo")[0];
    const index = todos.indexOf(todo);
    if (index !== -1) {
      todos.splice(index, 1);
      return `Removed ${todo} from your todo`;
    }
  } else if (command === "What is on my todo?") {
    if (todos.length === 0) {
      return "You have no todos.";
    } else {
      return `You have ${todos.length} todos: ${todos.join(" and ")}`;
    }
  } else if (command === "What day is it today?") {
    const today = new Date();
    return today.toLocaleDateString();
  } else if (command.startsWith("What is ")) {
    const expression = command.split("What is ")[1].slice(0, -1);
    try {
      const result = eval(expression);
      return result;
    } catch (error) {
      return "I'm sorry, I couldn't calculate that.";
    }
  } else if (command.startsWith("Set a timer for ")) {
    const minutes = parseInt(
      command.split("Set a timer for ")[1].split(" minutes")[0],
    );
    return `Timer set for ${minutes} minutes`;
  }
  return "I'm sorry, I don't understand that command.";
}
console.log(getReply("Hello my name is Benjamin")); // "Nice to meet you benjamin"
console.log(getReply("What is my name?")); // "Your name is Benjamin"
console.log(getReply("Add fishing to my todo")); // "fishing added to your todo"
console.log(getReply("What is on my todo?")); // "You have 1 todos: fishing"
