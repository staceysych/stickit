import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

import { Messages } from "../utils/messages";
import { NoteType } from "../types/noteType";
import { addNoteToStorage, fetchNotes } from "../utils/storage";
import "./contentScript.css";

import Note from "../components/Note";

const App: React.FC<{}> = () => {
  const [notes, setNotes] = useState<NoteType[]>([]);
  const [currentPageUrl, setCurrentPageUrl] = useState<string>("");

  const handleMessages = async ({ type, data }) => {
    switch(type) {
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
      default: {}
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
        <Note key={note._id} note={note} />
      ))}
    </>
  );
};

const root = document.createElement("div");

document.body.appendChild(root);
ReactDOM.render(<App />, root);
