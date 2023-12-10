import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "./contentScript.css";

import { Messages } from "../utils/messages";
import { NoteType } from "../types/noteType";
import { addNoteToStorage, fetchNotes } from "../utils/storage";
import "./contentScript.css";

import Note from "../components/Note";

interface IMessageData {
  url: string;
  currentNote: NoteType;
}

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
        const newNote = await addNoteToStorage(currentPageUrl);
        setNotes((prevNotes) => [...prevNotes, newNote]);

        break;
      }
      case Messages.NEW_PAGE: {
        setCurrentPageUrl(data.url);
        const notes = await fetchNotes(data.url);

        setNotes(notes);

        break;
      }
      case Messages.DELETE_ALL: {
        chrome.storage.sync.remove(currentPageUrl);
        setNotes([]);

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

document.body.appendChild(root);
ReactDOM.render(<App />, root);
