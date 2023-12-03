import StickyNote2Icon from "@mui/icons-material/StickyNote2";

import { StyledListItem, StyledList } from "./Menu.styled";

const Menu = () => {
  const handleClick = async () => {
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });
    
    if (tab.id && tab.url) {
      chrome.tabs.sendMessage(tab.id, {
        type: 'NEW_NOTE',
        url: tab.url,
        content: ''
      })
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
