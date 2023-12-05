import { ListItem, List } from "@mui/material";
import styled from "styled-components";

export const StyledList = styled(List)`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff1c;
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
    background-color: #f5f5f51a;
  }
`;
