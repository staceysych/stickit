import React, { useEffect, useState } from "react";
import { omit } from "lodash-es";

import { NoteType } from "../../../types/noteType";

import {
  NoteColorBadge,
  NoteBody,
  ContentContainer,
  NoteContainer,
  DateBlock,
} from "./DashboardNote.styled";
import DashboardActionMenu from "../DashboardActionMenu";

import { updateNotesInStorage } from "../../../utils/storage";

interface NotesListItem {
  note: NoteType;
}

const DashboardNote: React.FC<NotesListItem> = ({ note: currentNote }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [note, setNote] = useState<NoteType>(currentNote);

  const handleNoteClick = () => {
    chrome.tabs.create({ url: note.url });
  };

  useEffect(() => {
    updateNotesInStorage(omit(note, ["url"]), note.url);
  }, [note]);

  return (
    <NoteContainer onClick={handleNoteClick}>
      <NoteColorBadge background={note.color} />
      <NoteBody>
        <ContentContainer>
          <div>{note.content}</div>
          <DashboardActionMenu
            color={note.color}
            anchorEl={anchorEl}
            setAnchorEl={setAnchorEl}
            noteId={note._id}
            url={note.url}
            setNote={setNote}
          />
        </ContentContainer>
        <DateBlock>{new Date(note.createdOn).toJSON().slice(0, 10)}</DateBlock>
      </NoteBody>
    </NoteContainer>
  );
};

export default DashboardNote;
