const notes = [];

function saveNote(content, id) {
  notes.push({
    content: content,
    id: id,
  });
}

saveNote("Pick up groceries", 1);
saveNote("Do Home work", 3);
saveNote("Do laundry", 2);
saveNote("Do work", 4);

console.log(notes);
