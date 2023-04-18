import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure,
    Input,
    Button,
    CheckboxGroup,
    Checkbox,
    VStack,
    Flex,
    Text,
    Box,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

export interface FilterProps {
    isDrawerOpen: boolean;
    onCloseDrawer: () => void;
}

export default function Filter(props: FilterProps) {
    const { onClose } = useDisclosure();
    const { isDrawerOpen, onCloseDrawer } = props;
    const [isOpen, setIsOpen] = useState<boolean>(isDrawerOpen);

    const closeDrawer = () => {
        onClose();
        setIsOpen(false);
        onCloseDrawer();
    };

    useEffect(() => {
        setIsOpen(isDrawerOpen);
    }, [isDrawerOpen]);

    return (
        <Drawer isOpen={isOpen} placement="right" onClose={closeDrawer}>
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>Filter the feed</DrawerHeader>

                <DrawerBody>
                    <Input placeholder="Type here..." />

                    <VStack my={"10"} align={"left"}>
                        <Text as="b">Sources / Categories</Text>
                        <Box maxWidth={"100%"}>
                            <CheckboxGroup colorScheme="green">
                                <Checkbox value="naruto" checked={false} m="1">
                                    Naruto
                                </Checkbox>
                                <Checkbox value="naruto" checked={false} m="1">
                                    Naruto
                                </Checkbox>
                            </CheckboxGroup>
                        </Box>
                    </VStack>

                    <VStack my={"10"} align={"left"}>
                        <Text as="b">Authors</Text>
                        <Box maxWidth={"100%"}>
                            <CheckboxGroup colorScheme="green">
                                <Checkbox value="naruto" checked={false} m="1">
                                    Naruto
                                </Checkbox>
                                <Checkbox value="naruto" checked={false} m="1">
                                    Naruto
                                </Checkbox>
                            </CheckboxGroup>
                        </Box>
                    </VStack>
                </DrawerBody>

                <DrawerFooter>
                    <Button variant="outline" mr={3} onClick={closeDrawer}>
                        Cancel
                    </Button>
                    <Button colorScheme="blue">Filter</Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}
