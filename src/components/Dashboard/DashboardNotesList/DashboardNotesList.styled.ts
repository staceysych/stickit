import styled from "styled-components";

import { List, ListItem, Typography } from "@mui/material";

import { colorPalette } from "../../../utils/colors";

interface NoteColorBadge {
  background: string;
}

export const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px;
  color: var(--black);
  overflow: hidden;
`;

export const Header = styled.div`
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
  border-bottom: 1px var(--gray-2);
`;

export const NotesListItem = styled(ListItem)`
  display: flex;
  gap: 20px;
  width: 100%;
  border-radius: 8px;

  &:hover {
    background-color: var(--gray-2);
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
`;

export const NoteListGlobalNotification = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: large;
`;
