import { Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import { StyledIconButton, StyledMenu } from "./NoteActions.styled";
import useStyles from "./NoteActions.styles";
import { getActions } from "./utils";
import { NoteType } from "../../types/noteType";

interface INoteAction {
  title: string;
  onClick?: (setNote: React.Dispatch<React.SetStateAction<NoteType>>) => void;
}

interface NoteActionsProps {
  anchorEl: HTMLElement;
  setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement>>;
  noteId: string;
  setNote: React.Dispatch<React.SetStateAction<NoteType>>
}

const NoteActions = ({ anchorEl, setAnchorEl, noteId, setNote }: NoteActionsProps) => {
  const actions = getActions(noteId);

  const classes = useStyles();
  const handleNoteActionClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.target as HTMLElement);
  };
  const handleNoteActionsClose = () => {
    setAnchorEl(null);
  };

  const handleActionClick = (action: INoteAction) => {
    action.onClick && action.onClick(setNote);
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
        <MoreVertIcon fontSize="small" />
      </StyledIconButton>
      <StyledMenu
        id="action-menu"
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={handleNoteActionsClose}
        classes={classes}
      >
        {actions.map((action) => (
          <MenuItem
            key={action.title}
            onClick={() => handleActionClick(action)}
          >
            {action.title}
          </MenuItem>
        ))}
      </StyledMenu>
    </>
  );
};

export default NoteActions;
