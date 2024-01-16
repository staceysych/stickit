import styled from "styled-components";

import { Select, MenuItem } from "@mui/material";

import { colorPalette } from "../../../utils/colors";

interface StyledSelectItemProps {
  background: string;
}

export const StyledSelect = styled(Select)`
  width: 100%;
  border: none;

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
export const StyledSelectItem = styled(MenuItem)<StyledSelectItemProps>`
  background: ${(props) => colorPalette[props.background].main} !important;
`;
