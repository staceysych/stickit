import { Card, Box, Typography, IconButton, TextField } from "@mui/material";
import { Rnd } from "react-rnd";
import styled from "styled-components";
import { colorPalette } from "../../utils/colors";
import reset from "react-style-reset";

interface StyledHeaderProps {
  background: string;
}

export const StyledRnd = styled(Rnd)`
  position: "fixed";
  padding: 0;
  margin: 0;
  z-index: 9999;
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
  position: fixed;

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
    background-color: ${(props) => colorPalette[props.background].light};
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
