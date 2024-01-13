import React, { useEffect, useState } from "react";
import DashboardSideBar from "../DashboardSideBar";
import DashboardNotesList from "../DashboardNotesList";
import { Container } from "./Dashboard.styled";
import { NoteType } from "../../types/noteType";
import { uniq } from "lodash-es";
import { Messages, IMessageData } from "../../utils/messages";
import { removeNoteFromStorage } from "../../utils/storage";

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
        console.log("HELLO");
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
      <DashboardNotesList notes={notes[selectedUrl]} />
    </Container>
  );
};

export default Menu;