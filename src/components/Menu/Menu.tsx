import { StyledList, StyledListItem } from "./Menu.styled";
import React from "react";
import StickyNote2Icon from "@mui/icons-material/StickyNote2";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Messages } from "../../utils/messages";

const Menu: React.FC<{}> = () => {
  const handleClick = async () => {
    const tabs = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });

    if (tabs.length > 0) {
      chrome.tabs.sendMessage(tabs[0].id, { type: Messages.NEW_NOTE });
    }
  };

  const deleteAllNotes = async () => {
    const tabs = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });

    if (tabs.length > 0) {
      chrome.tabs.sendMessage(tabs[0].id, { type: Messages.DELETE_ALL });
    }
  };
  return (
    <StyledList>
      <StyledListItem onClick={handleClick}>
        <StickyNote2Icon fontSize="small" /> Create a new note
      </StyledListItem>
      <StyledListItem onClick={deleteAllNotes}>
        <DeleteForeverIcon fontSize="small" /> Delete all notes from page
      </StyledListItem>
    </StyledList>
  );
};

export default Menu;
