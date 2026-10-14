function getClothesToWear(temperature) {
  if (temperature < 0) {
    return "a warm coat, gloves and a scarf";
  } else if (temperature < 10) {
    return "a jacket and long trousers";
  } else if (temperature < 20) {
    return "shorts and a t-shirt";
  } else {
    return "light clothes and sandals";
  }
}

const clothesToWear = getClothesToWear(18);

console.log(clothesToWear);
