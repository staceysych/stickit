import {
  Container,
  Header,
  HeaderText,
  LinkList,
  LinkListItem,
  Footer,
} from "./DashboardSideBar.styled";
import React from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import StickyNote2Icon from "@mui/icons-material/StickyNote2";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Messages } from "../../../utils/messages";
import { NoteType } from "../../../types/noteType";

interface DashboardSideBarPropsType {
  handleSelectUrl: (url: string) => void;
  urls: string[];
}

const DashboardSideBar: React.FC<DashboardSideBarPropsType> = (props) => {
  const { urls, handleSelectUrl } = props;

  return (
    <Container>
      {/* Header */}
      <Header>
        <HeaderText variant="h5">StickIt</HeaderText>
      </Header>
      {/* List */}
      <LinkList>
        {urls.map((url) => (
          <LinkListItem onClick={() => handleSelectUrl(url)} key={url}>
            {url}
          </LinkListItem>
        ))}
      </LinkList>
      {/* Footer */}
      <Footer>
        <SettingsIcon fontSize="medium" />
      </Footer>
    </Container>
  );
};

export default DashboardSideBar;
