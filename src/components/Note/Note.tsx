import MoreVertIcon from "@mui/icons-material/MoreVert";
import PushPinIcon from "@mui/icons-material/PushPin";
import DraggableComponent from "../DraggableComponent";

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
}

const Note = (props: NotePropsType) => {
  const { setNotes } = props;
  const [note, setNote] = useState<NoteType>(props.note);
  const { width, height, top, left, content, color } = note;

  const handleUpdateNotes = async () => {
    setNotes((prevNotes) => {
      const updatedNotes = prevNotes.map((item) =>
        item._id === note._id ? note : item
      );

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

  useEffect(() => {
    handleUpdateNotes();
  }, [note]);

  return (
    <DraggableComponent
      position={{
        x: left,
        y: top,
      }}
      onStop={handleDragStop}
    >
      <StyledCard coords={{ left, top, width, height }}>
        <StyledHeader background={color}>
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
            autoFocus
          />
        </StyledBody>
      </StyledCard>
    </DraggableComponent>
  );
};

export default Note;
