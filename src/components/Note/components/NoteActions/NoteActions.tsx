import { NoteType } from "../../../../types/noteType";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  StyledIconButton,
  StyledMenu,
  StyledMenuItem,
} from "./NoteActions.styled";
import { getActions } from "./utils";
import ColorSelect from "../ColorSelect";

import useStyles from "./NoteActions.styles";

interface INoteAction {
  title: string;
  onClick?: (setNote: React.Dispatch<React.SetStateAction<NoteType>>) => void;
}

interface NoteActionsProps {
  anchorEl: HTMLElement;
  setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement>>;
  noteId: string;
  setNote: React.Dispatch<React.SetStateAction<NoteType>>;
  isMinimized: boolean;
  color: string;
}

const NoteActions = ({
  anchorEl,
  setAnchorEl,
  noteId,
  setNote,
  isMinimized,
  color,
}: NoteActionsProps) => {
  const actions = getActions(noteId);

  const classes = useStyles();
  const handleNoteActionClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.target as HTMLElement);
  };
  const handleNoteActionsClose = () => {
    setAnchorEl(null);
  };

  const handleChangeColor = (event) => {
    event.stopPropagation();
    event.preventDefault();

    setNote((prev) => ({
      ...prev,
      color: event.target.value,
    }));
  };

  const handleActionClick = (action: INoteAction) => {
    action.onClick && action.onClick(setNote);
    handleNoteActionsClose();
  };

  return (
    <>
      <StyledIconButton
        isMinimized={isMinimized}
        onClick={handleNoteActionClick}
        aria-label="more"
        id="action-button"
      >
        <MoreVertIcon fontSize="inherit" />
      </StyledIconButton>
      <StyledMenu
        id="action-menu"
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={handleNoteActionsClose}
        classes={classes}
      >
        <StyledMenuItem id="color-menu">
          <ColorSelect color={color} onChange={handleChangeColor} />
        </StyledMenuItem>
        {actions.map((action) => (
          <StyledMenuItem
            key={action.title}
            onClick={() => handleActionClick(action)}
          >
            {action.icon}
            {action.title}
          </StyledMenuItem>
        ))}
      </StyledMenu>
    </>
  );
};

export default NoteActions;
