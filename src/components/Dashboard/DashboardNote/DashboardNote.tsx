import React, {useEffect, useState} from "react";
import { omit } from "lodash-es";
import { NoteColorBadge, NoteBody, ContentContainer } from "./DashboardNote.styled";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { NoteType } from "../../../types/noteType";
import DashboardActionMenu from "../DashboardActionMenu";
import { updateNotesInStorage } from "../../../utils/storage";

interface NotesListItem {
  note: NoteType;
}

const DashboardNote: React.FC<NotesListItem> = ({ note: currentNote }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [note, setNote] = useState<NoteType>(currentNote);

  const handleNoteClick = () => {
    chrome.tabs.create({url: note.url})
  }

  return (
    <>
      <NoteColorBadge background={note.color} />
      <NoteBody>
        <ContentContainer onClick={handleNoteClick}>
          <div>{note.content}</div>
          <DashboardActionMenu
            anchorEl={anchorEl}
            setAnchorEl={setAnchorEl}
            noteId={note._id}
            url={note.url}
            setNote={setNote}
          />
        </ContentContainer>
        <div>{new Date(note.createdOn).toJSON().slice(0, 10)}</div>
      </NoteBody>
    </>
  );
};

export default DashboardNote;
