const notes = [];

function saveNote(content, id) {
  notes.push({ content, id });
}

saveNote("Pick up groceries", 1);
saveNote("Do laundry", 2);

function getNote(id) {
  if (typeof id !== "number") {
    console.log("Error: ID must be a number.");
    return;
  }

  for (let i = 0; i < notes.length; i++) {
    if (notes[i].id === id) {
      return notes[i];
    }
  }
}

const firstNote = getNote(1);
console.log(firstNote);
