import { ListItem, List } from "@mui/material";
import styled from "styled-components";

export const StyledList = styled(List)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: var(--list-background);
  width: 200px;
`;

export const StyledListItem = styled(ListItem)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  margin: 0 8px;

  &:hover {
    background-color: var(--menu-hover);
  }

  & svg {
    max-height: 20px;
    max-width: 20px;
  }
`;
