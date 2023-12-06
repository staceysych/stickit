import { Card, Box, Typography, IconButton, TextField } from "@mui/material";
import styled from "styled-components";

interface StyledHeaderProps {
  background: string;
}

interface StyledCardProps {
  coords: {
    x: number;
    y: number;
  };
}

export const StyledCard = styled(Card)<StyledCardProps>`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  padding: 0;
  margin: 0;
  width: 300px;
  height: 300px;
  border-radius: 8px !important;
  position: fixed;
  z-index: 9999;
  top: ${(props) => props.coords.x}px;
  right: ${(props) => props.coords.y}px;
`;

export const StyledHeader = styled(Box)<StyledHeaderProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${(props) => props.background};
  width: 100%;
  padding: 0;
  margin: 0;
  height: 50px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
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
    background-color: ${(props) => props.background};
  }

  fieldset {
    border: none;
  }

  textarea {
    height: 100% !important;
    color: #000000;
  }
`;
