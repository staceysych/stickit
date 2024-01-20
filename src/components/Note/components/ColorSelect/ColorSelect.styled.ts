import styled from "styled-components";
import reset from "react-style-reset/string";

import { Select, MenuItem } from "@mui/material";

import { colorPalette } from "../../../../utils/colors";

interface NoteColorBadge {
  background: string;
}

export const StyledSelect = styled(Select)`
  ${reset};
  width: 100% !important;
  border: none;

  & > div {
    display: flex;
    gap: 7px;
    align-items: center;
  }

  &::before {
    content: none !important;
  }

  &::after {
    content: none !important;
  }

  & > svg {
    color: var(--black);
  }
`;

export const NoteColorBadge = styled.div<NoteColorBadge>`
  ${reset};
  align-self: center;
  width: 17px !important;
  height: 17px !important;
  border-radius: 50% !important;
  background-color: ${(props) =>
    colorPalette[props.background].main} !important;
`;

export const StyledSelectItem = styled(MenuItem)`
  ${reset};
  display: flex;
  gap: 10px;
  align-items: center;
`;
