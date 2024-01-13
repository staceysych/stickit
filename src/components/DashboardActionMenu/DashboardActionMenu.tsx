import MoreVertIcon from "@mui/icons-material/MoreVert";

import {
  StyledIconButton,
  StyledMenu,
  StyledMenuItem,
} from "./DashboardActionMenu.styled";
import { getActions } from "./utils";
import { NoteType } from "../../types/noteType";

interface INoteAction {
  title: string;
  onClick?: (setNote: React.Dispatch<React.SetStateAction<NoteType>>) => void;
}

interface DashboardActionMenuProps {
  anchorEl: HTMLElement;
  setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement>>;
  noteId: string;
  url: string;
  setNote: React.Dispatch<React.SetStateAction<NoteType>>;
}

const DashboardActionMenu = ({
  anchorEl,
  setAnchorEl,
  noteId,
  setNote,
  url
}: DashboardActionMenuProps) => {
  const actions = getActions(noteId, url);

  const handleNoteActionClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation()
    setAnchorEl(event.target as HTMLElement);
  };
  const handleNoteActionsClose = (event) => {
    event.stopPropagation()
    setAnchorEl(null);
  };

  const handleActionClick = (action: INoteAction, event) => {
    event.stopPropagation()
    action.onClick && action.onClick(setNote);
    handleNoteActionsClose(event);
  };

  return (
    <>
      <StyledIconButton
        size="small"
        onClick={handleNoteActionClick}
        aria-label="more"
        id="action-button"
      >
        <MoreVertIcon fontSize="small" />
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
            onClick={(event) => {
              event.stopPropagation()
              event.preventDefault()
              handleActionClick(action, event)}
            } 
              
          >
            {action.icon}
            {action.title}
          </StyledMenuItem>
        ))}
      </StyledMenu>
    </>
  );
};

export default DashboardActionMenu;
