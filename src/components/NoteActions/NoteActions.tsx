import { Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import { StyledIconButton, StyledMenu } from "./NoteActions.styled";
import useStyles from "./NoteActions.styles";

const options = ["Delete", "Minimize"];

interface NoteActionsProps {
  anchorEl: HTMLElement;

  setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement>>;
}

const NoteActions = ({ anchorEl, setAnchorEl }: NoteActionsProps) => {
  const classes = useStyles();
  const handleNoteActionClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.target as HTMLElement);
  };
  const handleNoteActionsClose = () => {
    setAnchorEl(null);
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
        {options.map((option) => (
          <MenuItem key={option} onClick={handleNoteActionsClose}>
            {option}
          </MenuItem>
        ))}
      </StyledMenu>
    </>
  );
};

export default NoteActions;
