import React from "react";
import { groupBy } from "lodash-es";

import { NoteType } from "../../../types/noteType";

import {
  Container,
  Header,
  ListContainer,
  NotesList,
  NoteListItemTitle,
  NotesListItem,
  NoteListGlobalNotification,
} from "./DashboardNotesList.styled";
import DashboardNote from "../DashboardNote/DashboardNote";

interface DashboardNotes {
  notes: NoteType[];
  selectedUrl: string;
}

const Menu: React.FC<DashboardNotes> = (props) => {
  const { notes, selectedUrl } = props;

  const groupedNotes = groupBy(notes, "pageTitle");

  return (
    <Container>
      <Header>{/* SearchInput */}</Header>
      <ListContainer>
        {!groupedNotes && selectedUrl && (
          <NoteListGlobalNotification>
            There is no notes yet.
          </NoteListGlobalNotification>
        )}
        {!selectedUrl && (
          <NoteListGlobalNotification>
            Please select url from sidebar.
          </NoteListGlobalNotification>
        )}
        {Object.entries(groupedNotes).map(
          ([pageTitle, notes]: [string, NoteType[]]) => {
            return (
              <NotesList key={pageTitle}>
                <NoteListItemTitle variant="h6">{pageTitle}</NoteListItemTitle>
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
