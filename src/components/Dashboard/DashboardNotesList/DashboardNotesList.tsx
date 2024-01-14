import React from "react";
import { groupBy } from "lodash-es";
import {
  Container,
  Header,
  ListContainer,
  NotesList,
  NoteListItemTitle,
  NotesListItem,
  NoteListGlobalNotification
} from "./DashboardNotesList.styled";
import DashboardNote from "../DashboardNote/DashboardNote";
import { NoteType } from "../../../types/noteType";

interface DashboardNotes {
  notes: NoteType[];
  selectedUrl: string;
}

const Menu: React.FC<DashboardNotes> = (props) => {
  const { notes, selectedUrl } = props;

  const groupedNotes = groupBy(notes, "url");

  return (
    <Container>
      <Header>{/* SearchInput */}</Header>
      <ListContainer>
        {(!groupedNotes && selectedUrl) && <NoteListGlobalNotification>There is no notes yet.</NoteListGlobalNotification> }
        {!selectedUrl && <NoteListGlobalNotification>Please select url from sidebar.</NoteListGlobalNotification> }
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
