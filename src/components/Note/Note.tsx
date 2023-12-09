import React from "react";
import { useDebounce } from "use-debounce";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PushPinIcon from "@mui/icons-material/PushPin";
import DraggableComponent from "../DraggableComponent";

import { updateNotesInStorage } from "../../utils/storage";

import { NoteType } from "../../types/noteType";

import {
  StyledCard,
  StyledHeader,
  StyledHeaderText,
  StyledHeaderActions,
  StyledBody,
  StyledTextField,
} from "./Note.styled";
import { Dispatch, useEffect, useState } from "react";

import { Messages, handleNotesUpdate } from "../../utils/messages";

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

  const handleDragStop = (e, data) => {
    const updateNote = {
      ...note,
      top: data.y,
      left: data.x,
    };

    setNote(updateNote);
  };

  const handleDebounceChange = () => {
    const updateNote = {
      ...note,
      content: debouncedText,
    };
    console.log("object");
    setNote(updateNote);
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  useEffect(() => {
    handleDebounceChange();
  }, [debouncedText]);

  useEffect(() => {
    console.log("2");
    handleUpdateNotes();
  }, [note]);

  return (
    <DraggableComponent
      position={{
        x: left,
        y: top,
      }}
      onStop={handleDragStop}
      handle=".handle"
    >
      <StyledCard coords={{ left, top, width, height }}>
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
    </DraggableComponent>
  );
};

export default Note;
