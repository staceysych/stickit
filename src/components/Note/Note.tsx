import React from "react";
import { useDebounce } from "use-debounce";
import PushPinIcon from "@mui/icons-material/PushPin";
import "./note.css";

import { updateNotesInStorage } from "../../utils/storage";

import { NoteType } from "../../types/noteType";
import NoteActions from "../NoteActions/NoteActions";

import {
  StyledRnd,
  StyledCard,
  StyledHeader,
  StyledHeaderText,
  StyledBody,
  StyledTextField,
  StyledHeaderActions,
} from "./Note.styled";
import { useEffect, useState } from "react";

interface NotePropsType {
  note: NoteType;
  currentPageUrl;
}

const Note = (props: NotePropsType) => {
  const { currentPageUrl, note: currentNote } = props;
  const [note, setNote] = useState<NoteType>(currentNote);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [isResizing, setIsResizing] = useState(false);

  const {
    width,
    height,
    top,
    left,
    content,
    color,
    isPinned,
    minimize: {
      enabled: isMinimized,
      left: minimizedLeft,
      height: minimizedHeight,
    },
  } = note;

  const [text, setText] = useState<string>(content);
  const [debouncedText] = useDebounce(text, 400);

  const handleUpdateNotes = async () => {
    console.log(note);
    updateNotesInStorage(note, currentPageUrl);
  };

  const onResizeStop = (_e, _direction, ref, _delta, position) => {
    const { x: resizeLeft, y: resizeTop } = position;

    const updateNote = {
      ...note,
      width: ref.offsetWidth,
      height: ref.offsetHeight,
      top: resizeTop,
      left: resizeLeft,
    };

    setIsResizing(false);
    setNote(updateNote);
  };

  const handleDragStop = (e, data) => {
    const updateNote = {
      ...note,
      top: data.y,
      left: isMinimized ? left : data.x,
    };

    setNote(updateNote);
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleDebounceChange = () => {
    const updateNote = {
      ...note,
      content: debouncedText,
    };

    setNote(updateNote);
  };

  const handlePinNote = (e) => {
    const { top } = e.target.parentNode.parentNode.getBoundingClientRect();
    const { scrollY } = window;

    const changedPinValue = !isPinned;

    setNote((prev) => {
      return {
        ...prev,
        top: changedPinValue === true ? top : top + scrollY,
        isPinned: changedPinValue,
      };
    });
  };

  const handleMinimizeClick = () => {
    if (isMinimized) {
      setNote((prev) => {
        return {
          ...prev,
          minimize: {
            left: 0,
            height: 40,
            enabled: false,
          },
        };
      });
    }
  };

  useEffect(() => {
    handleDebounceChange();
  }, [debouncedText]);

  useEffect(() => {
    handleUpdateNotes();
  }, [note]);

  return (
    <StyledRnd
      size={{ width: width, height: isMinimized ? minimizedHeight : height }}
      position={{ x: isMinimized ? minimizedLeft : left, y: top }}
      minWidth={isMinimized ? 0 : "150px"}
      minHeight={isMinimized ? 0 : "150px"}
      onDragStop={handleDragStop}
      onClick={handleMinimizeClick}
      onResizeStop={onResizeStop}
      onResizeStart={() => setIsResizing(true)}
      dragAxis={isMinimized ? "none" : "both"}
      dragHandleClassName="handle"
      bounds=".bounds-container"
      resizeHandleWrapperClass={"resizeHandleWrapperClass"}
      className={isResizing ? "resizing" : ""}
      isPinned={isPinned}
      enableResizing={
        !isMinimized && {
          top: true,
          topRight: true,
          right: true,
          bottomRight: true,
          bottom: true,
        }
      }
    >
      <StyledCard background={color}>
        <StyledHeader background={color} className="handle">
          <StyledHeaderActions size="small" onClick={handlePinNote}>
            <PushPinIcon fontSize="small" />
          </StyledHeaderActions>
          {!isMinimized && (
            <NoteActions
              anchorEl={anchorEl}
              setAnchorEl={setAnchorEl}
              noteId={note._id}
              setNote={setNote}
            />
          )}
        </StyledHeader>

        <StyledBody isMinimized={isMinimized}>
          <StyledTextField
            placeholder="Take a note..."
            multiline
            value={text}
            onChange={onInputChange}
          />
        </StyledBody>
      </StyledCard>
    </StyledRnd>
  );
};

export default Note;
