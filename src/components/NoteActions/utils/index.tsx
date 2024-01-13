import { Messages, sendMessageToBackground } from "../../../utils/messages";
import { DeleteForever, CloseFullscreen } from "@mui/icons-material";

const confirmDeletion = (noteId: string) => {
  const result = window.confirm("Are you sure you want to delete the note?");

  if (result) {
    sendMessageToBackground(Messages.DELETE_NOTE_DASHBOARD, { noteId });
  }
};

const handleMinimizeNote = (setNote) => {
  setNote((prev) => {
    return {
      ...prev,
      minimize: {
        enabled: true,
        left: -prev.width + 50,
        height: 40,
      },
    };
  });
};

export const getActions = (noteId: string) => [
  {
    icon: <DeleteForever fontSize="small" />,
    title: "Delete",
    onClick: () => confirmDeletion(noteId),
  },
  {
    icon: <CloseFullscreen fontSize="small" />,
    title: "Minimize",
    onClick: (setNote) => handleMinimizeNote(setNote),
  },
];
