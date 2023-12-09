import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "./contentScript.css";

import { Messages, handleNotesUpdate } from "../utils/messages";
import { NoteType } from "../types/noteType";
import {
  addNoteToStorage,
  fetchNotes,
  updateNotesInStorage,
} from "../utils/storage";
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

  console.log({ notes });

  const handleMessages = async ({ type, data }: IMessage) => {
    console.log({ type });
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
      case Messages.UPDATE_NOTES: {
        await updateNotesInStorage(notes, currentPageUrl);

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
  }, [currentPageUrl, notes]);

  return (
    <>
      {notes.map((note) => (
        <Note key={note._id} note={note} setNotes={setNotes} />
      ))}
    </>
  );
};

const root = document.createElement("div");
root.classList.add("notes-container");

document.body.appendChild(root);
ReactDOM.render(<App />, root);
