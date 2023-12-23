import { Card, Box, Typography, IconButton, TextField } from "@mui/material";
import { Rnd } from "react-rnd";
import styled from "styled-components";
import { colorPalette } from "../../utils/colors";
import reset from "react-style-reset";

interface StyledHeaderProps {
  background: string;
}

interface StyledRndProps {
  isPinned: boolean;
}

interface StyledCardProps {
  background: string;
}

interface StyledBodyProps {
  isMinimized: boolean;
  background: string;
}

export const StyledRnd = styled(Rnd)<StyledRndProps>`
  position: ${(props) => (props.isPinned ? "fixed" : "absolute")} !important;
  padding: 0;
  margin: 0;
  z-index: 9999;
  transition: transform 0.3s ease-in-out, height 0.3s ease-in-out;
`;

export const StyledCard = styled(Card)`
  ${reset};
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
  border-radius: 8px !important;
  transition: transform 0.3s ease-in-out, height 0.3s ease-in-out;

  * {
    box-sizing: border-box;
    background: none;
    border: none;
    width: auto;
    height: auto;
    box-shadow: none;
    border-radius: 0;
  }
`;

export const StyledHeader = styled(Box)<StyledHeaderProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${(props) => colorPalette[props.background].main};
  width: 100%;
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

export const StyledBody = styled(Box)<StyledBodyProps>`
  width: 100%;
  height: ${(props) => (props.isMinimized ? "0px" : "100%")};
  border-radius: 0;
  padding: 0;
  margin: 0;
  background-color: ${(props) =>
    colorPalette[props.background].light} !important;
`;

export const StyledTextField = styled(TextField)`
  ${reset};
  width: 100%;
  height: 100%;

  > div {
    height: 100%;
    width: 100%;
    padding: 8px;
  }

  fieldset {
    border: none;
  }

  textarea {
    height: 100% !important;
    color: #000000;
  }
`;
