import { NoteType } from "../types/noteType";

export enum Messages {
  NEW_NOTE,
  NEW_PAGE,
  DELETE_ALL,
  UPDATE_NOTES,
}

export const handleNotesUpdate = async (notes: NoteType[]) => {
  const tabs = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });

  if (tabs.length > 0) {
    chrome.tabs.sendMessage(tabs[0].id, {
      type: Messages.UPDATE_NOTES,
    });
  }
};
