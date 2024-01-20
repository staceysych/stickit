import {uniqBy} from 'lodash-es'
import { Messages, sendMessageToBackground } from "../../../../utils/messages";
import { DeleteForever, GetApp, FileUpload } from "@mui/icons-material";

const confirmDeletion = async () => {
  const result = window.confirm("Are you sure you want to delete all notes?");

  if (result) {
    await chrome.storage.sync.clear()
    console.log('object');
    sendMessageToBackground(Messages.ALL_NOTES_DELETED, {isSendToAllTabs: true});
  }
};

const handleExportClick = async () => {
  const data = await chrome.storage.sync.get();
  const link = document.createElement("a");

  const file = new Blob([JSON.stringify(data)], { type: "text/plain" });
  link.href = URL.createObjectURL(file);
  link.download = `stickit-${new Date().toISOString()}.txt`;
  link.click();
  URL.revokeObjectURL(link.href);
}

const handleImportClick = async () => {
  const notes = await chrome.storage.sync.get();
  const link = document.createElement("input");
  link.type = "file";
  link.click();

  link.onchange = async (e) => {
    const importedNotes = await link.files[0].text();
    const parsedNotes = JSON.parse(importedNotes);

    Object.entries(notes).forEach(([key, val]) => {
      if (parsedNotes[key]) {
        const p1 = JSON.parse(parsedNotes[key]);
        const v1 = JSON.parse(val);

        parsedNotes[key] = JSON.stringify(uniqBy([...v1, ...p1], "_id"));
      }
    });

    await chrome.storage.sync.set({ ...notes, ...parsedNotes });
    sendMessageToBackground(Messages.NOTES_IMPORTED, {isSendToAllTabs: true});
  };
}

export const getActions = () => [
  {
    icon: <FileUpload fontSize="medium" />,
    title: "Import Notes",
    onClick: () => handleImportClick(),
  },
  {
    icon: <GetApp fontSize="medium" />,
    title: "Export Notes",
    onClick: () => handleExportClick(),
  },
  {
    icon: <DeleteForever fontSize="medium" />,
    title: "Delete All",
    onClick: () => confirmDeletion(),
  }
];
