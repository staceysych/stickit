import React, { useEffect, useState } from "react";
import { uniq } from "lodash-es";

import { NoteType } from "../../../types/noteType";

import DashboardSideBar from "../DashboardSideBar";
import DashboardNotesList from "../DashboardNotesList";
import { Container } from "./DashboardPage.styled";

import { Messages, IMessageData } from "../../../utils/messages";
import { removeNoteFromStorage } from "../../../utils/storage";

import "../../../variables.css";

interface IMessage {
  type: Messages;
  data: IMessageData;
}

const Menu: React.FC<{}> = () => {
  const [notes, setNotes] = useState<NoteType[]>([]);
  const [urls, setUrls] = useState<string[]>([]);

  const [selectedUrl, setSelectedUrl] = useState<string>("");

  const handleSelectUrl = (url) => {
    setSelectedUrl(url);
  };

  const fetchNotes = async () => {
    const fetchedNotes = await chrome.storage.sync.get();

    if (fetchedNotes) {
      const formattedNote = {} as NoteType[];
      const hostnames = [];
      Object.entries(fetchedNotes).forEach(([key, value]) => {
        const parsedData = JSON.parse(value).map((val) => ({
          ...val,
          url: key,
        }));

        const hostname = new URL(key).hostname;

        formattedNote[hostname] = formattedNote[hostname]
          ? [...formattedNote[hostname], ...parsedData]
          : parsedData;

        hostnames.push(hostname);
      });

      setNotes(formattedNote);
      setUrls(uniq(hostnames));
    }
  };

  const handleMessages = async ({ type, data }: IMessage) => {
    switch (type) {
      case Messages.DELETE_NOTE_DASHBOARD: {
        await removeNoteFromStorage(data.noteId, data.url);

        await fetchNotes();

        break;
      }
      default: {
      }
    }
  };

  useEffect(() => {
    chrome.runtime.onMessage.addListener(handleMessages);
    return () => {
      chrome.runtime.onMessage.removeListener(handleMessages);
    };
  }, []);

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <Container>
      <DashboardSideBar urls={urls} handleSelectUrl={handleSelectUrl} />
      <DashboardNotesList
        notes={notes[selectedUrl]}
        selectedUrl={selectedUrl}
      />
    </Container>
  );
};

export default Menu;
