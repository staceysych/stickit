import StickyNote2Icon from "@mui/icons-material/StickyNote2";

import { StyledListItem, StyledList } from "./Menu.styled";
import ReactDOM from "react-dom/client";

const Menu = () => {
  const handleClick = async () => {
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });
    chrome.scripting.executeScript<string[], void>({
      target: { tabId: tab.id! },
      func: () => {
        // const target = document.createElement("div");

        // document.body.appendChild(target);

        // ReactDOM.createRoot(target).render(<div>hello</div>);
        ReactDOM.createRoot(document.createElement("div")).render(
          <h1>Hello work</h1>
        );
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
