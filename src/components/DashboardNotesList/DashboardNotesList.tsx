import React from "react";
import { groupBy } from "lodash-es";
import {
  Container,
  Header,
  ListContainer,
  NotesList,
  NoteListItemTitle,
  NoteColorBadge,
  NotesListItem,
  NoteBody,
} from "./DashboardNotesList.styled";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DashboardNote from "../DashboardNote/DashboardNote";
import { NoteType } from "../../types/noteType";

interface DashboardNotes {
  notes: NoteType[];
}

interface NotesListItem {
  note: NoteType;
}

const Menu: React.FC<DashboardNotes> = (props) => {
  const { notes } = props;

  const groupedNotes = groupBy(notes, "url");

  return (
    <Container>
      <Header>{/* SearchInput */}</Header>
      <ListContainer>
        {Object.entries(groupedNotes).map(
          ([url, notes]: [string, NoteType[]]) => {
            return (
              <NotesList key={url}>
                <NoteListItemTitle variant="h6">{url}</NoteListItemTitle>
                {notes.map((note) => {
                  return (
                    <NotesListItem key={note._id}>
                      <DashboardNote note={note} />
                    </NotesListItem>
                  );
                })}
              </NotesList>
            );
          }
        )}
      </ListContainer>
    </Container>
  );
};

export default Menu;
