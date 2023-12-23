import { Messages, sendMessageToBackground } from "../../../utils/messages";
import { DeleteForever, CloseFullscreen } from "@mui/icons-material";

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
    onClick: () => sendMessageToBackground(Messages.DELETE_NOTE, { noteId }),
  },
  {
    icon: <CloseFullscreen fontSize="small" />,
    title: "Minimize",
    onClick: (setNote) => handleMinimizeNote(setNote),
  },
];
