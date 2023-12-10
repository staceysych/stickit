import React from "react";
import { useDebounce } from "use-debounce";
import PushPinIcon from "@mui/icons-material/PushPin";
import "./note.css";

import { updateNotesInStorage } from "../../utils/storage";

import { NoteType } from "../../types/noteType";
import NoteActions from "../NoteActions/NoteActions";

import {
  StyledRnd,
  StyledCard,
  StyledHeader,
  StyledHeaderText,
  StyledBody,
  StyledTextField,
  StyledHeaderActions,
} from "./Note.styled";
import { useEffect, useState } from "react";

interface NotePropsType {
  note: NoteType;
  currentPageUrl;
}

const Note = (props: NotePropsType) => {
  const { currentPageUrl, note: currentNote } = props;
  const [note, setNote] = useState<NoteType>(currentNote);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const { width, height, top, left, content, color } = note;

  const [text, setText] = useState<string>(content);
  const [debouncedText] = useDebounce(text, 400);

  const handleUpdateNotes = async () => {
    updateNotesInStorage(note, currentPageUrl);
  };

  const onResizeStop = (_e, _, ref) => {
    const { top, left } = ref.getBoundingClientRect();

    const updateNote = {
      ...note,
      width: ref.offsetWidth,
      height: ref.offsetHeight,
      left: left,
      top: top,
    };

    setNote(updateNote);
  };

  const handleDragStop = (_e, data) => {
    const updateNote = {
      ...note,
      top: data.y,
      left: data.x,
    };

    setNote(updateNote);
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleDebounceChange = () => {
    const updateNote = {
      ...note,
      content: debouncedText,
    };

    setNote(updateNote);
  };

  useEffect(() => {
    handleDebounceChange();
  }, [debouncedText]);

  useEffect(() => {
    handleUpdateNotes();
  }, [note]);

  return (
    <StyledRnd
      default={{ width: width, height: height, x: left, y: top }}
      onDragStop={handleDragStop}
      onResizeStop={onResizeStop}
      dragHandleClassName="handle"
      resizeHandleWrapperClass={"resizeHandleWrapperClass"}
    >
      <StyledCard>
        <StyledHeader background={color} className="handle">
          <StyledHeaderActions size="small">
            <PushPinIcon fontSize="small" />
          </StyledHeaderActions>
          <StyledHeaderText>New Note</StyledHeaderText>
          <NoteActions
            anchorEl={anchorEl}
            setAnchorEl={setAnchorEl}
            noteId={note._id}
          />
        </StyledHeader>
        <StyledBody>
          <StyledTextField
            placeholder="Take a note..."
            multiline
            background={color}
            value={text}
            onChange={onInputChange}
          />
        </StyledBody>
      </StyledCard>
    </StyledRnd>
  );
};

export default Note;
