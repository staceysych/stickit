import { Card, Box, Typography, IconButton, TextField } from "@mui/material";
import styled from "styled-components";
import { colorPalette } from "../../utils/colors";

interface StyledHeaderProps {
  background: string;
}

interface StyledCardProps {
  coords: {
    left: number;
    top: number;
    width: number;
    height: number;
  };
}

// toDo: Change position to absolute and fix creation of the note (if absolute created at the bottom)
export const StyledCard = styled(Card)<StyledCardProps>`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  padding: 0;
  margin: 0;
  width: ${(props) => props.coords.width}px;
  height: ${(props) => props.coords.height}px;
  border-radius: 8px !important;
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;

  * {
    box-sizing: border-box;
  }
`;

export const StyledHeader = styled(Box)<StyledHeaderProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${(props) => colorPalette[props.background].main};
  width: 100%;
  margin: 0;
  height: 50px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  padding: 0 4px;
  cursor: pointer;
`;
export const StyledHeaderText = styled(Typography)``;
export const StyledHeaderActions = styled(IconButton)`
  > svg {
    color: #ffffff;
  }
`;

export const StyledBody = styled(Box)`
  width: 100%;
  height: 100%;
  border-radius: 0;
  padding: 0;
  margin: 0;
`;

export const StyledTextField = styled(TextField)<StyledHeaderProps>`
  width: 100%;
  height: 100%;

  > div {
    height: 100%;
    width: 100%;
    margin: 0;
    border-radius: 0;
    background-color: ${(props) => colorPalette[props.background].light};
  }

  fieldset {
    border: none;
  }

  textarea {
    height: 100% !important;
    color: #000000;
  }
`;
