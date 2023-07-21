import {
  ActionIcon,
  Container,
  Flex,
  Footer,
  Group,
  Text,
  createStyles,
  rem,
} from "@mantine/core";
import { FC } from "react";
import {
  BrandFacebook,
  BrandInstagram,
  BrandTwitter,
} from "tabler-icons-react";

const useStyles = createStyles((theme) => ({
  footer: {
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },
  inner: {
    justifyContent: "space-between",
    alignItems: "center",
    [theme.fn.smallerThan("sm")]: {
      flexDirection: "column",
    },
  },
  links: {
    [theme.fn.smallerThan("sm")]: {
      marginTop: theme.spacing.lg,
      marginBottom: theme.spacing.sm,
    },
  },
}));

type IProps = {};

const AppFooter: FC<IProps> = ({}) => {
  const { classes } = useStyles();

  return (
    <Footer className={classes.footer} height={60} p="md">
      <Container size="xl">
        <Flex className={classes.inner}>
          <Text>LOGO</Text>
          <Group spacing="xs" position="right" noWrap>
            <ActionIcon variant="default" radius="xl">
              <BrandTwitter size={18} strokeWidth={1} color="teal" />
            </ActionIcon>
            <ActionIcon variant="default" radius="xl">
              <BrandFacebook size={18} strokeWidth={1} color="blue" />
            </ActionIcon>
            <ActionIcon variant="default" radius="xl">
              <BrandInstagram size={18} strokeWidth={1} color="red" />
            </ActionIcon>
          </Group>
        </Flex>
      </Container>
    </Footer>
  );
};

export default AppFooter;
