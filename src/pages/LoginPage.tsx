import { OIDC_PROVIDERS } from "@/constants/oidcProviders";
import { useSession } from "@inrupt/solid-ui-react";
import {
  Button,
  Container,
  Divider,
  Flex,
  Text as MantineText,
  Select,
} from "@mantine/core";
import { FC, useState } from "react";

import { useHistory } from "react-router-dom";

type IProps = {};

const LoginPage: FC<IProps> = ({}) => {
  // const { session } = useSession();
  // const { isLoggedIn, webId } = session.info;
  const {
    session: {
      info: { isLoggedIn },
      login,
    },
  } = useSession();
  const [oidcIssuer, setOidcIssuer] = useState(() => OIDC_PROVIDERS[0].value);

  const history = useHistory();
  return (
    <Container
      size="xs"
      mt={55}
      sx={{
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        gap: 5,
      }}
    >
      <MantineText color="yellow">You are not logged in. </MantineText>
      <Flex
        bg="gray.1"
        p="xl"
        sx={{
          borderRadius: 8,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          // height: "100%",
        }}
      >
        <Select
          label="Log in with:"
          placeholder="Pick a IPD Provider"
          data={OIDC_PROVIDERS}
          value={oidcIssuer}
          onChange={(value) => value && setOidcIssuer(value)}
          rightSection={
            <Button
              onClick={async () =>
                await login({
                  oidcIssuer: oidcIssuer,
                  //   redirectUrl: "/todos",
                  redirectUrl: window.location.origin + "/todos",
                  clientName: "Solid Todo App",
                  // clientId
                  // clientSecret
                  //   handleRedirect(redirectUrl) {
                  //     history.push("/todos");
                  //   },
                  // refreshToken
                  // tokenType
                })
              }
            >
              Login
            </Button>
          }
        />
      </Flex>
    </Container>
  );
};

export default LoginPage;
