import { Messages, sendMessageToBackground } from "../../../utils/messages";

const handleMinimizeNote = (setNote) => {
  setNote((prev) => {
    return {
      ...prev,
      minimize: {
        enabled: true,
        left: -prev.width + 50,
        height: 40,
      }
    };
  });
};

export const getActions = (noteId: string) => [
  {
    title: "Delete",
    onClick: () => sendMessageToBackground(Messages.DELETE_NOTE, { noteId }),
  },
  {
    title: "Minimize",
    onClick: (setNote) => handleMinimizeNote(setNote),
  },
];
