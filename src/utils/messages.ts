import { NoteType } from "../types/noteType";

export enum Messages {
  NEW_NOTE,
  NEW_PAGE,
  DELETE_ALL,
  DELETE_NOTE,
  DELETE_NOTE_DASHBOARD,
}

export interface IMessageData {
  url: string;
  currentNote: NoteType;
  noteId: string;
  content: string
}

export const sendMessageToBackground = (
  message: Messages,
  data: Partial<IMessageData>
) => {
  chrome.runtime.sendMessage({ type: message, data });
};
