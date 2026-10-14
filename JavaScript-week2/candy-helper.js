const boughtCandyPrices = [];

function addCandy(candyType, weight) {
  let pricePerGram;

  if (candyType === "sweet") {
    pricePerGram = 0.5;
  } else if (candyType === "chocolate") {
    pricePerGram = 0.9;
  } else if (candyType === "vanilla") {
    pricePerGram = 1.1;
  } else if (candyType === "milk-chocolate") {
    pricePerGram = 1.03;
  } else {
    console.log("Unknown candy type");
    return;
  }

  const candyPrice = pricePerGram * weight;
  boughtCandyPrices.push(candyPrice);
}

const amountToSpend = Math.random() * 100;

function canBuyMoreCandy() {
  let totalPrice = 0;

  for (let i = 0; i < boughtCandyPrices.length; i++) {
    totalPrice += boughtCandyPrices[i];
  }

  return totalPrice < amountToSpend;
}

addCandy("sweet", 20);
addCandy("chocolate", 10);
addCandy("vanilla", 5);
addCandy("milk-chocolate", 30);

console.log("Budget:", amountToSpend.toFixed(2));
console.log("Candy prices:", boughtCandyPrices);

if (canBuyMoreCandy()) {
  console.log("You can buy more, so please do!");
} else {
  console.log("Enough candy for you!");
}
