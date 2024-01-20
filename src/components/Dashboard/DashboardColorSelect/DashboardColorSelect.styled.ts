import styled from "styled-components";

import { Select, MenuItem } from "@mui/material";

interface StyledSelectItemProps {
  background: string;
}

export const StyledSelect = styled(Select)`
  width: 100%;
  border: none;

  & > div {
    display: flex;
    gap: 10px;
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
export const StyledSelectItem = styled(MenuItem)`
  display: flex;
  gap: 10px
`;
