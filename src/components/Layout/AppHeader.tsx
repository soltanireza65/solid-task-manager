import { nameProps } from "@/constants/nameProps";
import { CombinedDataProvider, useSession, Text } from "@inrupt/solid-ui-react";
import {
  Anchor,
  Box,
  Button,
  Container,
  Group,
  Header,
  Text as MantineText,
  Menu,
  createStyles,
  rem,
} from "@mantine/core";
import { FC, useEffect, useMemo, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Logout, Settings } from "tabler-icons-react";

const HEADER_HEIGHT = rem(56);

const useStyles = createStyles((theme) => ({
  inner: {
    height: HEADER_HEIGHT,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },

  links: {
    paddingTop: theme.spacing.lg,
    height: HEADER_HEIGHT,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",

    // [theme.fn.smallerThan("sm")]: {
    //   display: "none",
    // },
  },

  menuItems: {
    marginRight: `calc(${theme.spacing.sm} * -1)`,
  },

  mainLink: {
    textTransform: "uppercase",
    textDecoration: "none",
    fontSize: rem(13),
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[1]
        : theme.colors.gray[6],
    padding: `${rem(7)} ${theme.spacing.sm}`,
    fontWeight: 700,
    borderBottom: `${rem(2)} solid transparent`,
    transition: "border-color 100ms ease, color 100ms ease",

    "&:hover": {
      color: theme.colorScheme === "dark" ? theme.white : theme.black,
      textDecoration: "none",
    },
  },

  mainLinkActive: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    borderBottomColor:
      theme.colors[theme.primaryColor][theme.colorScheme === "dark" ? 5 : 6],
  },
}));

interface LinkProps {
  label: string;
  link: string;
}

// const menuItems: LinkProps[] = [
//   { label: "Home", link: "/" },
//   // { label: "Login", link: "/login" },
//   { label: "Todos", link: "/todos" },
// ];

type IProps = {};

const AppHeader: FC<IProps> = ({}) => {
  const { classes, cx } = useStyles();
  const location = useLocation();
  const [currentMenu, setCurrentMenu] = useState(location.pathname);
  const history = useHistory();

  const { session } = useSession();
  const { isLoggedIn, webId } = session.info;

  useEffect(() => {
    setCurrentMenu(location.pathname);
  }, [location.pathname]);

  const menuItems: LinkProps[] = useMemo(() => {
    const list: LinkProps[] = [
      { label: "Home", link: "/" },
      { label: "Todos", link: "/todos" },
    ];
    return isLoggedIn ? list : list.filter((x) => x.link !== "/todos");
  }, [isLoggedIn]);

  return (
    <Header height={HEADER_HEIGHT}>
      <Container size="xl" className={classes.inner}>
        <Button
          variant="white"
          onClick={(event) => {
            history.push("/");
          }}
        >
          LOGO
        </Button>
        <Box className={classes.links}>
          <Group spacing={0} position="right" className={classes.menuItems}>
            {menuItems?.map((item) => (
              <Anchor<"a">
                href={item.link}
                key={item.label}
                className={cx(classes.mainLink, {
                  [classes.mainLinkActive]: item.link === currentMenu,
                })}
                onClick={(event) => {
                  event.preventDefault();
                  setCurrentMenu(item.link);
                  history.push(item.link);
                }}
              >
                {item.label}
              </Anchor>
            ))}
          </Group>
        </Box>
        {isLoggedIn ? (
          <CombinedDataProvider datasetUrl={webId!} thingUrl={webId!}>
            <Group position="center">
              <Menu shadow="md" width={200}>
                <Menu.Target>
                  <Button variant="outline">
                    logged in as: <Text properties={nameProps} />
                  </Button>
                </Menu.Target>

                <Menu.Dropdown>
                  <Menu.Label>Profile</Menu.Label>
                  <Menu.Item icon={<Settings size={18} />}>Settings</Menu.Item>

                  <Menu.Divider />

                  <Menu.Item
                    color="red"
                    icon={<Logout size={18} />}
                    onClick={() => session.logout()}
                  >
                    Logout
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </Group>
          </CombinedDataProvider>
        ) : (
          <Button
            variant="outline"
            onClick={(event) => {
              history.push("/login");
            }}
          >
            Login
          </Button>
        )}
      </Container>
    </Header>
  );
};

export default AppHeader;
