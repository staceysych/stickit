import { ListItem, List, Typography } from "@mui/material";
import styled from "styled-components";

export const Container = styled.div`
  width: 20%;
  min-width: 200px;
  display: flex;
  flex-direction: column;
  color: #000000;
  padding: 15px;
  border-right: 1px solid #d2d2d2;
`;

export const Header = styled.div`
  text-align: center;
  vertical-align: middle;
  width: 100%;
`;
export const HeaderText = styled(Typography)``;

export const LinkList = styled(List)`
  height: 100%;
  width: 100%;
  padding-top: 10px;
  padding-bottom: 15px;
`;

export const LinkListItem = styled(ListItem)`
  width: 100%;
  font-size: 1rem;
  transition: 0.15s ease all;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background-color: #adadad;
  }
`;

export const Footer = styled.div`
  padding: 5px 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;
