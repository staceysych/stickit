import React from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PushPinIcon from "@mui/icons-material/PushPin";

import {
  StyledCard,
  StyledHeader,
  StyledHeaderText,
  StyledHeaderActions,
  StyledBody,
  StyledTextField,
} from "./Note.styled";

import { colorPalette } from "../../utils/colors";

const generateRandomColor = () => {
  const colors = Object.values(colorPalette);
  return colors[Math.floor(Math.random() * colors.length)];
};

const generateRandomCoordinates = () => {
  const x = Math.abs(Math.random() * window.innerWidth);
  const y = Math.abs(Math.random() * window.innerHeight);
  return { x, y };
};

const Note = () => {
  const { light, main } = generateRandomColor();
  const { x, y } = generateRandomCoordinates();

  console.log(x, y);

  return (
    <StyledCard coords={{ x, y }}>
      <StyledHeader background={main}>
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
          background={light}
          autoFocus
        />
      </StyledBody>
    </StyledCard>
  );
};

export default Note;
