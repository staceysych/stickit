import styled from "styled-components";
import reset from "react-style-reset/string";

import { Select, MenuItem } from "@mui/material";

import { colorPalette } from "../../../../utils/colors";

interface StyledSelectItemProps {
  background: string;
}

export const StyledSelect = styled(Select)`
  ${reset};
  width: 100% !important;
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
  ${reset};
  background: ${(props) => colorPalette[props.background].main} !important;
`;
