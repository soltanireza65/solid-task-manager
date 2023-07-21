import { Flex } from "@mantine/core";
import React, { FC } from "react";

type IProps = {
  children: JSX.Element[] | JSX.Element;
};

const AppPageWrapper: FC<IProps> = ({ children }) => {
  return (
    <Flex
      w="100%"
      h="100%"
      justify="center"
      align="center"
      bg="gray.1"
      sx={{ borderRadius: 8 }}
    >
      {children}
    </Flex>
  );
};

export default AppPageWrapper;
