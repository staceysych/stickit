import { NoteType } from "../../../types/noteType";

import { getActions } from "./utils";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import SettingsIcon from "@mui/icons-material/Settings";
import DashboardColorSelect from "../DashboardColorSelect";
import {
  StyledIconButton,
  StyledMenu,
  StyledMenuItem,
} from "./SideBarActionMenu.styled";

interface INoteAction {
  title: string;
  onClick?: () => void;
}

interface DashboardActionMenuProps {
  anchorEl: HTMLElement;
  setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement>>;
}

const SideBarActionMenu = ({
  anchorEl,
  setAnchorEl,
}: DashboardActionMenuProps) => {
  const actions = getActions();

  const handleNoteActionClick = () => {
    setAnchorEl(event.target as HTMLElement);
  };
  const handleNoteActionsClose = () => {
    setAnchorEl(null);
  };

  const handleActionClick = (action: INoteAction) => {
    action.onClick && action.onClick();
    handleNoteActionsClose();
  };

  return (
    <>
      <StyledIconButton
        size="small"
        onClick={handleNoteActionClick}
        aria-label="more"
        id="action-button"
      >
        <SettingsIcon fontSize="medium" />
      </StyledIconButton>
      <StyledMenu
        id="action-menu"
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={handleNoteActionsClose}
      >
        {actions.map((action) => (
          <StyledMenuItem
            key={action.title}
            onClick={() => {
              handleActionClick(action);
            }}
          >
            {action.icon}
            {action.title}
          </StyledMenuItem>
        ))}
      </StyledMenu>
    </>
  );
};

export default SideBarActionMenu;
