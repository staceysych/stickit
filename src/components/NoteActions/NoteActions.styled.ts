import { IconButton, Menu, MenuItem } from "@mui/material";
import styled from "styled-components";
import reset from "react-style-reset/string";

export const StyledIconButton = styled(IconButton)`
  > svg {
    color: #ffffff;
  }
`;

export const StyledMenu = styled(Menu)`
  ${reset};
  box-sizing: border-box;
  background: none;
  border-radius: 0;
  border: none;
  width: auto;
  height: auto;
  box-shadow: none;
`;
export const StyledMenuItem = styled(MenuItem)`
  ${reset};
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 4px;
`;
