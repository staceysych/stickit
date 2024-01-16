import React from "react";
import { capitalize } from "@mui/material";

import { StyledSelect, StyledSelectItem } from "./ColorSelect.styled";
import { SelectChangeEvent } from "@mui/material/Select";

import useStyles from "./ColorSelect.styles";
import { colorPalette } from "../../../../utils/colors";

interface NotesListItem {
  color: string;
  onChange: (event: SelectChangeEvent) => void;
}

const ColorSelect: React.FC<NotesListItem> = ({ color, onChange }) => {
  const classes = useStyles();

  return (
    <StyledSelect
      id="color-menu"
      MenuProps={{ classes: classes }}
      value={color}
      label="Color"
      variant="standard"
      classes={classes}
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
      }}
      onChange={onChange}
    >
      {Object.keys(colorPalette).map((color) => {
        return (
          <StyledSelectItem key={color} value={color} background={color}>
            {capitalize(color)}
          </StyledSelectItem>
        );
      })}
    </StyledSelect>
  );
};

export default ColorSelect;
