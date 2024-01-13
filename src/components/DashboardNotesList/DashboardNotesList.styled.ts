import { List, ListItem, Typography } from "@mui/material";
import styled from "styled-components";
import { colorPalette } from "../../utils/colors";

interface NoteColorBadge {
  background: string;
}

export const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px;
  color: #000000;
  overflow: hidden;
`;

export const Header = styled.div`
  height: 50px;
  background: black;
  width: 100%;
  margin-bottom: 20px;
`;

export const ListContainer = styled.div`
  width: 100%;
  height: 90%;
  overflow-y: scroll;
  overflow-x: hidden;
`;

export const NotesList = styled(List)`
  width: 100%;
  border-bottom: 1px #adadadad;
`;

export const NotesListItem = styled(ListItem)`
  display: flex;
  gap: 20px;
  width: 100%;
  border-radius: 8px;

  &:hover {
    background-color: #adadadad;
    cursor: pointer;
  }
`;

export const NoteListItemTitle = styled(Typography)`
  width: 90%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

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