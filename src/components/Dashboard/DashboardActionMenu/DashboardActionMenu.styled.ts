import { IconButton, Menu, MenuItem } from "@mui/material";
import styled from "styled-components";
import reset from "react-style-reset/string";

export const StyledIconButton = styled(IconButton)`
  height: 25px;
  width: 25px;
  
  > svg {
    color: #000000;
  }
`;

export const StyledMenu = styled(Menu)`
  /* ${reset}; */
  font-size: 14px;
  box-sizing: border-box;
  background: none;
  border-radius: 0;
  border: none;
  box-shadow: none;
`;

export const StyledMenuItem = styled(MenuItem)`
  ${reset};
  width: 150px;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 4px;
`;
