import AppPageWrapper from "@/components/Layout/AppPageWrapper";
import { Button, Flex, Text } from "@mantine/core";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <AppPageWrapper>
      <Button>
        <Link style={{ textDecoration: "none", color: "white" }} to="/login">
          <Text>Login</Text>
        </Link>
      </Button>
    </AppPageWrapper>
  );
}

export default HomePage;
