import { NoteType } from "../../../types/noteType";

import { getActions } from "./utils";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import DashboardColorSelect from "../DashboardColorSelect";
import {
  StyledIconButton,
  StyledMenu,
  StyledMenuItem,
} from "./DashboardActionMenu.styled";

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
  color: string;
}

const DashboardActionMenu = ({
  anchorEl,
  setAnchorEl,
  noteId,
  setNote,
  url,
  color,
}: DashboardActionMenuProps) => {
  const actions = getActions(noteId, url);

  const handleNoteActionClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(event.target as HTMLElement);
  };
  const handleNoteActionsClose = (event) => {
    event.stopPropagation();
    setAnchorEl(null);
  };

  const handleActionClick = (action: INoteAction, event) => {
    event.stopPropagation();
    action.onClick && action.onClick(setNote);
    handleNoteActionsClose(event);
  };

  const handleChangeColor = (event) => {
    event.stopPropagation();
    event.preventDefault();

    setNote((prev) => ({
      ...prev,
      color: event.target.value,
    }));
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
        <StyledMenuItem>
          <DashboardColorSelect color={color} onChange={handleChangeColor} />
        </StyledMenuItem>
        {actions.map((action) => (
          <StyledMenuItem
            key={action.title}
            onClick={(event) => {
              event.stopPropagation();
              event.preventDefault();
              handleActionClick(action, event);
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

export default DashboardActionMenu;
