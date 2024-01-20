import { Rnd } from "react-rnd";
import styled from "styled-components";
import reset from "react-style-reset";

import { Card, Box, Typography, IconButton, TextField } from "@mui/material";

import { colorPalette } from "../../utils/colors";

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
  z-index: 999999;
  font-size: 16px !important;
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
  font-size: 20px !important;
  > svg {
    color: var(--white);
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
    border: none !important;
  }

  textarea {
    font-size: 16px !important;
    box-shadow: none !important;
    border: none !important;
    background: none !important;
    height: 100% !important;
    color: var(--black) !important;
    overflow-y: scroll !important;
  }
`;
