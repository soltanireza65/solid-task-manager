import { Burger, Header, MediaQuery, Navbar, Text, useMantineTheme } from '@mantine/core'
import React from 'react'

type Props = {
    opened: boolean
}

const AppNavbar = ({ opened }: Props) => {

    return (
        <Navbar
            p="md"
            hiddenBreakpoint="sm"
            hidden={!opened}
            width={{ sm: 200, lg: 300 }}
        >
            <Text>Application navbar</Text>
        </Navbar>
    )
}

export default AppNavbar