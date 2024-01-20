import styled from "styled-components";
import reset from "react-style-reset/string";

import { IconButton, Menu, MenuItem } from "@mui/material";

interface StyledIconButtonProps {
  isMinimized: boolean;
}

export const StyledIconButton = styled(IconButton)<StyledIconButtonProps>`
  visibility: ${(props) => (props.isMinimized ? "hidden" : "visible")};
  font-size: 20px !important;

  > svg {
    color: var(--white);
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
