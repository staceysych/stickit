import React from "react";

import {
  Container,
  Header,
  HeaderText,
  LinkList,
  LinkListItem,
  Footer,
} from "./DashboardSideBar.styled";
import SettingsIcon from "@mui/icons-material/Settings";

import SideBarActionMenu from '../SideBarActionMenu'

interface DashboardSideBarPropsType {
  handleSelectUrl: (url: string) => void;
  urls: string[];
}

const DashboardSideBar: React.FC<DashboardSideBarPropsType> = (props) => {
  const { urls, handleSelectUrl } = props;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  return (
    <Container>
      <Header>
        <HeaderText variant="h5">StickIt</HeaderText>
      </Header>
      <LinkList>
        {urls.map((url) => (
          <LinkListItem onClick={() => handleSelectUrl(url)} key={url}>
            {url}
          </LinkListItem>
        ))}
      </LinkList>
      <Footer>
        <SideBarActionMenu anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
      </Footer>
    </Container>
  );
};

export default DashboardSideBar;
