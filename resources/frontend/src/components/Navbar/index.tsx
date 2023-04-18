import { Spacer, Heading, Flex, Box, Link } from "@chakra-ui/react";
import { ReactNode } from "react";

export interface NavbarProps {
    children: ReactNode;
}

export default function Navbar(props: NavbarProps) {
    const { children } = props;
    return (
        <Flex minWidth="100%" justifyContent={"space-between"}>
            <Box p="2">
                <Heading size="md">News App</Heading>
            </Box>

            <Box p="2">
                <Flex gap="3" minWidth={"100%"} justifyContent={"end"}>
                    {children}
                </Flex>
            </Box>
        </Flex>
    );
}
