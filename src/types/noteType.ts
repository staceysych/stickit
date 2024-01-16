export type NoteType = {
  _id: string;
  left: number;
  top: number;
  width: number;
  height: number;
  color: string;
  content: string;
  createdOn: Date;
  isPinned: boolean;
  pageTitle: string;
  minimize: {
    enabled: boolean;
    height: number;
    left: number;
  };
  url?: string;
};
