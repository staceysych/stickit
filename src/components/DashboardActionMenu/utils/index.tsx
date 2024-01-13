import { Messages, sendMessageToBackground } from "../../../utils/messages";
import { DeleteForever, CloseFullscreen } from "@mui/icons-material";

const confirmDeletion = (noteId: string, url: string) => {
  const result = window.confirm("Are you sure you want to delete the note?");

  if (result) {
    sendMessageToBackground(Messages.DELETE_NOTE_DASHBOARD, { noteId, url });
  }
};

export const getActions = (noteId: string, url: string) => [
  {
    icon: <DeleteForever fontSize="small" />,
    title: "Delete",
    onClick: () => confirmDeletion(noteId, url),
  },
];
