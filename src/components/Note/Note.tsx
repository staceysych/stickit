import React from "react";
import { useDebounce } from "use-debounce";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PushPinIcon from "@mui/icons-material/PushPin";
import "./note.css";

import { updateNotesInStorage } from "../../utils/storage";

import { NoteType } from "../../types/noteType";

import {
  StyledRnd,
  StyledCard,
  StyledHeader,
  StyledHeaderText,
  StyledHeaderActions,
  StyledBody,
  StyledTextField,
} from "./Note.styled";
import { Dispatch, useEffect, useState } from "react";

interface NotePropsType {
  note: NoteType;
  setNotes: Dispatch<React.SetStateAction<NoteType[]>>;
  currentPageUrl;
}

const Note = (props: NotePropsType) => {
  const { setNotes } = props;
  const [note, setNote] = useState<NoteType>(props.note);
  const { width, height, top, left, content, color } = note;

  const [text, setText] = useState(content);
  const [debouncedText] = useDebounce(text, 400);

  const handleUpdateNotes = async () => {
    setNotes((prevNotes) => {
      const updatedNotes = prevNotes.map((item) =>
        item._id === note._id ? note : item
      );

      updateNotesInStorage(updatedNotes, props.currentPageUrl);

      return updatedNotes;
    });
  };

  const onResizeStop = (e, _, ref) => {
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

  const handleDragStop = (e, data) => {
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
          <StyledHeaderActions size="small">
            <MoreVertIcon fontSize="small" />
          </StyledHeaderActions>
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
