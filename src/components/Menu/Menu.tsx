import { StyledList, StyledListItem } from "./Menu.styled";
import React from "react";
import StickyNote2Icon from "@mui/icons-material/StickyNote2";
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
  return (
    <StyledList>
      <StyledListItem onClick={handleClick}>
        <StickyNote2Icon fontSize="small" /> Create a new note
      </StyledListItem>
    </StyledList>
  );
};

export default Menu;
