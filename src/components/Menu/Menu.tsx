import StickyNote2Icon from "@mui/icons-material/StickyNote2";

import { StyledListItem, StyledList } from "./Menu.styled";

const Menu = () => {
  const handleClick = async () => {
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });
    chrome.scripting.executeScript<string[], void>({
      target: { tabId: tab.id! },
      func: () => {
        alert("Hello, world!");
      },
    });
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
