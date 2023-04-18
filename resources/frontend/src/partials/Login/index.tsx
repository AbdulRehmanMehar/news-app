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

export interface LoginProps {
    isDrawerOpen: boolean;
    onCloseDrawer: () => void;
    onLogin: (
        email: string,
        password: string,
        setError: (error: string) => void
    ) => void;
}

export default function Login(props: LoginProps) {
    const { onClose } = useDisclosure();
    const { isDrawerOpen: isOpen, onCloseDrawer, onLogin } = props;

    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
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
                <DrawerHeader>Login</DrawerHeader>

                <DrawerBody>
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

                            const email = emailRef.current
                                ? emailRef.current.value
                                : "";
                            const password = passwordRef.current
                                ? passwordRef.current.value
                                : "";

                            const isEmailValid =
                                /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
                                    email
                                );
                            if (!isEmailValid || password.length < 3)
                                return setValidationMessage(
                                    "Either email or password is invalid."
                                );

                            onLogin(email, password, setValidationMessage);
                        }}
                    >
                        Login
                    </Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}
