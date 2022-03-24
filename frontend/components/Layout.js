import { useState } from "react";
import { AppShell, Burger, Header, MediaQuery, Navbar, Text } from "@mantine/core";
import HeaderContents from "./HeaderContents";
import Menu from "./Menu";
// import Header from "./Header";

const Layout = ({ children }) => {
  const [opened, setOpened] = useState(false);
  // const theme = useMantineTheme();

  return (
    <AppShell
      navbarOffsetBreakpoint="9999"
      fixed
      navbar={
        <Navbar p="md" hiddenBreakpoint="9999" hidden={!opened} width={{ sm: 300, lg: 400 }}>
          <Text>Application navbar</Text>
        </Navbar>
      }
      header={
        <Header height={70} p="md">
          {/* Handle other responsive styles with MediaQuery component or createStyles function */}
          <div style={{ display: "flex", alignItems: "center", height: "100%", justifyContent: "space-between" }}>
            <MediaQuery largerThan="sm" styles={{ display: "none" }}>
              <Burger opened={opened} onClick={() => setOpened((o) => !o)} size="sm" mr="xl" />
            </MediaQuery>
            <h1>Cupcake Swap</h1>
            <HeaderContents />
          </div>
        </Header>
      }
    >
      <Menu />
      <Text>{children}</Text>
    </AppShell>
  );
};

export default Layout;
