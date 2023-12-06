import React from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PushPinIcon from "@mui/icons-material/PushPin";
import Draggable from 'react-draggable';

import { NoteType } from '../../types/noteType'

import {
  StyledCard,
  StyledHeader,
  StyledHeaderText,
  StyledHeaderActions,
  StyledBody,
  StyledTextField,
} from "./Note.styled";

const DraggableComponent: any = Draggable;

interface NotePropsType {
  note: NoteType
}


const Note = (props: NotePropsType) => {
  const {width, height, top, left, content, color } = props.note

  return (
    <DraggableComponent>
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
