import { Messages, sendMessageToBackground } from "../../../utils/messages";

export const getActions = (noteId: string) => [
  {
    title: "Delete",
    onClick: () => sendMessageToBackground(Messages.DELETE_NOTE, { noteId }),
  },
  {
    title: "Minimize",
  },
];
