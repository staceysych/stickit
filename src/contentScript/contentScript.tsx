import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "./contentScript.css";

import { Messages, IMessageData } from "../utils/messages";
import { NoteType } from "../types/noteType";
import {
  addNoteToStorage,
  fetchNotes,
  removeNoteFromStorage,
} from "../utils/storage";
import "./contentScript.css";

import Note from "../components/Note";

import "../variables.css";

interface IMessage {
  type: Messages;
  data: IMessageData;
}

const App = () => {
  const [notes, setNotes] = useState<NoteType[]>([]);
  const [currentPageUrl, setCurrentPageUrl] = useState<string>("");

  const handleMessages = async ({ type, data }: IMessage) => {
    switch (type) {
      case Messages.NEW_NOTE: {
        console.log(data);
        const content = data.content || "";
        const pageTitle = data.pageTitle || "";

        const newNote = await addNoteToStorage(
          currentPageUrl,
          content,
          pageTitle
        );
        setNotes((prevNotes) => [...prevNotes, newNote]);

        break;
      }
      case Messages.NEW_PAGE: {
        setCurrentPageUrl(data.url);
        const notes = await fetchNotes(data.url);

        setNotes(notes);

        break;
      }
      case Messages.NOTES_IMPORTED:
      case Messages.DELETE_NOTE_DASHBOARD:
      case Messages.ALL_NOTES_DELETED: {
        const notes = await fetchNotes(currentPageUrl);

        setNotes(notes);

        break;
      }
      case Messages.DELETE_ALL: {
        const result = window.confirm(
          "Are you sure you want to delete all notes from this page?"
        );

        if (result) {
          chrome.storage.sync.remove(currentPageUrl);
          setNotes([]);
        }

        break;
      }
      case Messages.DELETE_NOTE: {
        const updateNotes = await removeNoteFromStorage(
          data.noteId,
          currentPageUrl
        );
        setNotes(updateNotes);

        break;
      }
      default: {
      }
    }
  };

  useEffect(() => {
    chrome.runtime.onMessage.addListener(handleMessages);
    return () => {
      chrome.runtime.onMessage.removeListener(handleMessages);
    };
  }, [currentPageUrl]);

  return (
    <>
      {notes.map((note) => (
        <Note key={note._id} note={note} currentPageUrl={currentPageUrl} />
      ))}
    </>
  );
};

const root = document.createElement("div");
root.classList.add("notes-container");

const boundsElement = document.createElement("div");
boundsElement.classList.add("bounds-container");

const { clientHeight } = document.body;
const { innerHeight } = window;

boundsElement.style.height =
  clientHeight > innerHeight
    ? document.body.clientHeight + "px"
    : window.innerHeight + "px";

document.body.appendChild(root);
document.body.appendChild(boundsElement);
ReactDOM.render(<App />, root);
