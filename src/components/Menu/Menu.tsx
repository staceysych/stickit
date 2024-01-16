import React from "react";

import { Messages } from "../../utils/messages";

import { StyledList, StyledListItem } from "./Menu.styled";
import StickyNote2Icon from "@mui/icons-material/StickyNote2";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";

import "../../variables.css";

const Menu: React.FC<{}> = () => {
  const handleClick = async () => {
    const tabs = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });

    if (tabs.length > 0 && tabs[0].id) {
      console.log(tabs[0].title);
      chrome.tabs.sendMessage(tabs[0].id, {
        type: Messages.NEW_NOTE,
        data: {
          content: "",
          pageTitle: tabs[0].title,
        },
      });
    }
  };

  const handleDashboardClick = () => {
    chrome.tabs.create({ url: "/dashboard.html" });
  };

  const deleteAllNotes = async () => {
    const tabs = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });

    if (tabs.length > 0 && tabs[0].id) {
      chrome.tabs.sendMessage(tabs[0].id, { type: Messages.DELETE_ALL });
    }
  };
  return (
    <StyledList>
      <StyledListItem onClick={handleClick}>
        <StickyNote2Icon fontSize="small" /> Create a new note
      </StyledListItem>
      <StyledListItem onClick={handleDashboardClick}>
        <SpaceDashboardIcon fontSize="small" /> Dashboard
      </StyledListItem>
      <StyledListItem onClick={deleteAllNotes}>
        <DeleteForeverIcon fontSize="small" /> Delete all notes from page
      </StyledListItem>
    </StyledList>
  );
};

export default Menu;
