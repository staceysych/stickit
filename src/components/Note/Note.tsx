import React from "react";
import { useDebounce } from "use-debounce";
import { PushPinOutlined, PushPin } from "@mui/icons-material";
import "./note.css";

import { updateNotesInStorage } from "../../utils/storage";
import { FULL_SIZE } from "../../utils/defaults";

import { NoteType } from "../../types/noteType";
import NoteActions from "../NoteActions/NoteActions";
import { isEqual } from "lodash-es";

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
    updateNotesInStorage(note, currentPageUrl);
  };

  const onResizeStart = () => {
    setIsResizing(true);
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

    const hasNoteChanged = !isEqual(note, updateNote);

    setIsResizing(false);
    hasNoteChanged && setNote(updateNote);
  };

  const handleDragStop = (e, data) => {
    e.stopPropagation();
    const updateNote = {
      ...note,
      top: data.y,
      left: isMinimized ? left : data.x,
    };

    const hasNoteChanged = !isEqual(note, updateNote);

    hasNoteChanged && setNote(updateNote);
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
        top: changedPinValue ? top : top + scrollY,
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
      minWidth={isMinimized ? 0 : FULL_SIZE}
      minHeight={isMinimized ? 0 : FULL_SIZE}
      onDragStop={handleDragStop}
      onResizeStop={onResizeStop}
      onResizeStart={onResizeStart}
      onClick={handleMinimizeClick}
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
      <StyledCard>
        <StyledHeader background={color} className="handle">
          <StyledHeaderActions size="small" onClick={handlePinNote}>
            {isPinned ? (
              <PushPin fontSize="small" />
            ) : (
              <PushPinOutlined fontSize="small" />
            )}
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

        <StyledBody isMinimized={isMinimized} background={color}>
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
