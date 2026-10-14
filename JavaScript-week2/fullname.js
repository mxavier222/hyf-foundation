function getFullName(firstName, surname, useFormalName = false) {
  if (firstName.trim() === "" || surname.trim() === "") {
    return "Please enter both first name and surname";
  }

  if (useFormalName) {
    return "Lord " + firstName + " " + surname;
  }

  return firstName + " " + surname;
}

const fullName1 = getFullName("Benjamin", "Hughes");
const fullName2 = getFullName("Anna", "Smith");

console.log(fullName1);
console.log(fullName2);

console.log(getFullName("Benjamin", "Hughes", true));
console.log(getFullName("Benjamin", "Hughes", false));

console.log(getFullName("Benjamin", "Hughes"));

console.log(getFullName("", "Hughes"));
console.log(getFullName("Benjamin", ""));
