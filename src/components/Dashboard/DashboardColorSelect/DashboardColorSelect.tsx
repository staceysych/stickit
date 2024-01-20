import React from "react";
import { StyledSelect, StyledSelectItem } from "./DashboardColorSelect.styled";
import { colorPalette } from "../../../utils/colors";
import { NoteColorBadge } from "../DashboardNote/DashboardNote.styled";

import { SelectChangeEvent } from "@mui/material/Select";
import { capitalize } from "@mui/material";

interface NotesListItem {
  color: string;
  onChange: (event: SelectChangeEvent) => void;
}

const DashboardColorSelect: React.FC<NotesListItem> = ({ color, onChange }) => {
  return (
    <StyledSelect
      id="color-select"
      value={color}
      label="Color"
      variant="standard"
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
      }}
      onChange={onChange}
    >
      {Object.keys(colorPalette).map((color) => {
        return (
          <StyledSelectItem key={color} value={color}>
            <NoteColorBadge background={color}/>
            {capitalize(color)}
          </StyledSelectItem>
        );
      })}
    </StyledSelect>
  );
};

export default DashboardColorSelect;
