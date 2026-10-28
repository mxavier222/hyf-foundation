const class07Students = [];

function addStudentToClass(studentName) {
  if (studentName.trim() === "") {
    return;
  }

  if (class07Students.includes(studentName)) {
    console.log(`Student ${studentName} is already in the class`);
    return;
  }

  if (class07Students.length >= 6 && studentName !== "Queen") {
    console.log("Cannot add more students to class 07");
    return;
  }

  class07Students.push(studentName);
}

function getNumberOfStudents() {
  return class07Students.length;
}

addStudentToClass("Benjamin");
addStudentToClass("Maglin");
addStudentToClass("Dominic");
addStudentToClass("Tim");
addStudentToClass("Effrain");
addStudentToClass("Sofia");

addStudentToClass("David");

addStudentToClass("Benjamin");

addStudentToClass("Queen");

console.log("Number of students:", getNumberOfStudents());
console.log(class07Students);
