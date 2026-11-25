// 1. Store the Hogwarts houses in an array
const houses = ["Gryffindor", "Hufflepuff", "Ravenclaw", "Slytherin"];

// 2. Get the HTML elements
const nameInput = document.getElementById("nameInput");
const sortButton = document.getElementById("sortButton");
const result = document.getElementById("result");
const retryButton = document.getElementById("retryButton");

// 3. Create a function to sort the user
function sortHouse() {
  // Get the name from the input
  const name = nameInput.value.trim();

  // Check if the user entered a name
  if (name === "") {
    result.textContent = "Please enter your name first!";
    retryButton.hidden = true;
    return;
  }

  // Choose a random house
  const randomIndex = Math.floor(Math.random() * houses.length);
  const randomHouse = houses[randomIndex];

  // Display the result
  result.textContent = `${name} belongs in ${randomHouse}!`;

  // Show the try again button
  retryButton.hidden = false;
}

// 4. Listen for clicks on the sort button
sortButton.addEventListener("click", sortHouse);

// 5. Listen for clicks on the retry button
retryButton.addEventListener("click", sortHouse);
