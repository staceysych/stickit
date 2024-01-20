import { NoteType } from "../types/noteType";

export enum Messages {
  NEW_NOTE,
  NEW_PAGE,
  DELETE_ALL,
  DELETE_NOTE,
  DELETE_NOTE_DASHBOARD,
  NOTES_IMPORTED,
  ALL_NOTES_DELETED,
}

export interface IMessageData {
  url: string;
  currentNote: NoteType;
  noteId: string;
  content: string;
  pageTitle: string;
  isSendToAllTabs: boolean;
}

export const sendMessageToBackground = (
  message: Messages,
  data: Partial<IMessageData>
) => {
  chrome.runtime.sendMessage({ type: message, data });
};
