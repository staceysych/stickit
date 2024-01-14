import { List, ListItem, Typography } from "@mui/material";
import styled from "styled-components";
import { colorPalette } from "../../../utils/colors";

interface NoteColorBadge {
  background: string;
}

export const NoteColorBadge = styled.div<NoteColorBadge>`
  align-self: baseline;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) =>
    colorPalette[props.background].main} !important;
`;

export const NoteBody = styled.div`
  width: 95%;
  font-size: 16px;
`

export const ContentContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
`