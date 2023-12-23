import uniqid from "uniqid";
import { generateRandomColor } from "./colors";
import { NoteType } from "../types/noteType";

export const clearStorage = () => {};

export const fetchNotes = async (url: string): Promise<any[]> => {
  return new Promise((resolve) => {
    chrome.storage.sync.get([url], (notes) => {
      resolve(notes[url] ? JSON.parse(notes[url]) : []);
    });
  });
};

export const addNoteToStorage = async (
  currentPageUrl: string,
  content: string
): Promise<NoteType> => {
  const _id: string = uniqid();
  const color = generateRandomColor();

  const noteData: NoteType = {
    _id,
    width: 200,
    height: 200,
    top: window.scrollY + 20,
    left: 20,
    content,
    color,
    createdOn: new Date(),
    isPinned: false,
    minimize: {
      enabled: false,
      left: 0,
      height: 40
    }
  };

  const currentNoteList = await fetchNotes(currentPageUrl);
  const updatedNoteList = [...currentNoteList, noteData].sort(
    (a, b) => a.createdOn - b.createdOn
  );

  await chrome.storage.sync.set({
    [currentPageUrl]: JSON.stringify(updatedNoteList),
  });

  return noteData;
};

export const updateNotesInStorage = async (
  note: NoteType,
  currentPageUrl: string
) => {
  const currentNoteList = await fetchNotes(currentPageUrl);
  const updatedNoteList = currentNoteList.map((item) =>
    item._id === note._id ? note : item
  );
  await chrome.storage.sync.set({
    [currentPageUrl]: JSON.stringify(updatedNoteList),
  });
};

export const removeNoteFromStorage = async (
  noteId: string,
  currentPageUrl: string
) => {
  const currentNoteList = await fetchNotes(currentPageUrl);
  const updatedNoteList = currentNoteList.filter((item) => item._id !== noteId);

  await chrome.storage.sync.set({
    [currentPageUrl]: JSON.stringify(updatedNoteList),
  });

  return updatedNoteList;
};
