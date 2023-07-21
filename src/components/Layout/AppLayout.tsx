import { FC } from "react";

import { AppShell } from "@mantine/core";
import AppFooter from "./AppFooter";
import AppHeader from "./AppHeader";

type IProps = {
  children: JSX.Element[] | JSX.Element;
};

const AppLayout: FC<IProps> = ({ children }) => {
  return (
    <AppShell
      // navbarOffsetBreakpoint="sm"
      // asideOffsetBreakpoint="sm"
      // navbar={<AppNavbar opened={opened} />}
      // aside={<AppAside />}
      footer={<AppFooter />}
      header={<AppHeader />}
    >
      {children}
    </AppShell>
  );
};

export default AppLayout;
