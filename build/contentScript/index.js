/* eslint-disable no-undef */
let currentNotes = [];

const fetchNotes = (url) => {
  return new Promise((res) => {
    chrome.storage.sync.get([url], (obj) => {
      res(obj[url] ? JSON.parse(obj[url]) : []);
    });
  });
};

chrome.runtime.onMessage.addListener(async (data, sender, res) => {
  const { type, content, url } = data;

  if (type === "NEW_PAGE") {
    const fetchedNotes = await fetchNotes(url);

    if (fetchedNotes !== currentNotes) {
      currentNotes = fetchedNotes;
      for (const note of currentNotes) {
        console.log(note);
        createNote(note);
      }
    }
  }

  if (type === "NEW_NOTE") {
    const newNote = createNote({ content });
    console.log(newNote);
    chrome.storage.sync.set({
      [url]: JSON.stringify([...currentNotes, newNote]),
    });
  }

  res();
});

function createNote({
  content,
  topOffset = 20,
  leftOffset = 20,
  fullWidth = 250,
  fullHeight = 250,
}) {
  let offsetX, offsetY;
  const body = document.body;

  const note = document.createElement("div");
  note.classList.add("note_container");
  note.style.width = fullWidth;
  note.style.height = fullHeight;
  note.style.top = topOffset;
  note.style.left = leftOffset;

  const noteHeader = document.createElement("div");
  noteHeader.classList.add("note_header");

  const noteBody = document.createElement("div");
  noteBody.classList.add("note_body");
  noteBody.setAttribute("contenteditable", "true");
  noteBody.innerHTML = content;

  //Drag'n drop
//   function move(e) {
//     dragMove(e, offsetX, offsetY, note);
//   }

//   note.addEventListener("mousedown", (e) => {
//     offsetX = e.clientX - note.offsetLeft;
//     offsetY = e.clientY - note.offsetTop;
//     document.addEventListener("mousemove", move);
//   });

//   document.addEventListener("mouseup", () => {
//     document.removeEventListener("mousemove", move);
//   });

  note.append(noteHeader, noteBody);

  body.appendChild(note);

  const { top, left, width, height } = note.getBoundingClientRect();

  return { content, top, left, width, height };
}

function dragMove(e, offsetX, offsetY, element) {
  const left = e.clientX - offsetX;
  const top = e.clientY - offsetY;

  element.style.left = `${left}px`;
  element.style.top = `${top}px`;
}
