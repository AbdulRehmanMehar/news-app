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
    Text,
    VStack,
} from "@chakra-ui/react";
import { useRef, useState } from "react";

export interface RegisterProps {
    isDrawerOpen: boolean;
    onCloseDrawer: () => void;
    onRegister: (
        name: string,
        email: string,
        password: string,
        setError: (error: string) => void
    ) => void;
}

export default function Register(props: RegisterProps) {
    const { onClose } = useDisclosure();
    const { isDrawerOpen: isOpen, onCloseDrawer, onRegister } = props;

    const nameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const cPasswordRef = useRef<HTMLInputElement>(null);
    const [validationMessage, setValidationMessage] = useState<string>();

    const closeDrawer = () => {
        onClose();
        onCloseDrawer();
    };
    return (
        <Drawer isOpen={isOpen} placement="right" onClose={closeDrawer}>
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>Register</DrawerHeader>

                <DrawerBody>
                    <VStack my={"5"} align={"left"} title="Search by a keyword">
                        <Text as="b">Name: </Text>
                        <Input
                            type="text"
                            ref={nameRef}
                            placeholder="Abdul Rehman"
                        />
                    </VStack>
                    <VStack my={"5"} align={"left"} title="Search by a keyword">
                        <Text as="b">Email: </Text>
                        <Input
                            type="email"
                            ref={emailRef}
                            placeholder="contact@abdurehman.com"
                        />
                    </VStack>
                    <VStack my={"5"} align={"left"} title="Search by a keyword">
                        <Text as="b">Password: </Text>
                        <Input
                            type="password"
                            ref={passwordRef}
                            placeholder="**********************"
                        />
                    </VStack>

                    <VStack my={"5"} align={"left"} title="Search by a keyword">
                        <Text as="b">Confirm Password: </Text>
                        <Input
                            type="password"
                            ref={cPasswordRef}
                            placeholder="**********************"
                        />
                    </VStack>

                    {validationMessage ? (
                        <VStack
                            my={"5"}
                            align={"left"}
                            title="Search by a keyword"
                        >
                            <Text color={"red"}>{validationMessage}</Text>
                        </VStack>
                    ) : null}
                </DrawerBody>

                <DrawerFooter>
                    <Button variant="outline" mr={3} onClick={closeDrawer}>
                        Cancel
                    </Button>
                    <Button
                        color="white"
                        background="teal.500"
                        _hover={{
                            background: "teal.800",
                        }}
                        onClick={() => {
                            if (validationMessage)
                                setValidationMessage(undefined);

                            const name = nameRef.current
                                ? nameRef.current.value
                                : "";
                            const email = emailRef.current
                                ? emailRef.current.value
                                : "";
                            const password = passwordRef.current
                                ? passwordRef.current.value
                                : "";
                            const cPassword = cPasswordRef.current
                                ? cPasswordRef.current.value
                                : "";

                            const isEmailValid =
                                /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
                                    email
                                );
                            if (
                                !isEmailValid ||
                                name.length < 3 ||
                                password.length < 8 ||
                                password !== cPassword
                            )
                                return setValidationMessage(
                                    "Please provide valid data."
                                );

                            onRegister(
                                name,
                                email,
                                password,
                                setValidationMessage
                            );
                        }}
                    >
                        Register
                    </Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}
