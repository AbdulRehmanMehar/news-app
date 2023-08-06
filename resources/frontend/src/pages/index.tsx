"use client";

import useSWR, { SWRResponse } from "swr";
import Article from "@/types/Article";
import Pagination from "@/components/Pagination";
import NewsArticle from "@/components/NewsArticle";
import {
    VStack,
    Skeleton,
    Flex,
    Square,
    Text,
    Container,
    Link,
    useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import Navbar from "@/components/Navbar";
import Filter from "@/partials/Filter";
import { useEffect, useState } from "react";
import { Author } from "next/dist/lib/metadata/types/metadata-types";
import { Source } from "postcss";
import Meta from "@/types/Meta";
import Login from "@/partials/Login";
import Register from "@/partials/Register";

const fetcher = (...args: any) => fetch(args).then((res) => res.json());

const HOSTNAME = process.env.NEXT_PUBLIC_HOSTNAME || "http://localhost:8000";

export default function Home() {
    const router = useRouter();
    const { query } = router;
    const toast = useToast();
    const [authacity, setAuthacity] = useState<{
        authKey: string;
        user: any;
    }>();
    const [isLoginOpen, setLoginOpen] = useState<boolean>(false);
    const [isFiltersOpen, setFiltersOpen] = useState<boolean>(false);
    const [isRegisterOpen, setRegisterOpen] = useState<boolean>(false);
    const currentPage = Math.abs(parseInt((query.page as string) || "1"));

    useEffect(() => {
        const isLoggedIn = !!localStorage.getItem("authKey");
        if (!isLoggedIn) return;

        const authKey = JSON.parse(localStorage.getItem("authKey") || "");
        const user = JSON.parse(localStorage.getItem("user") || "");

        setAuthacity({
            authKey,
            user,
        });
    }, []);

    const { data: response, error } = useSWR(
        `${HOSTNAME}/api/newsfeed?${new URLSearchParams(
            query as any
        ).toString()}`,
        fetcher
    );

    const { data: metaData, error: metaError } = useSWR<Meta>(
        `${HOSTNAME}/api/meta`,
        fetcher
    );

    const clearFilters = () => {
        const page = router.query.page;
        router.query = {};
        router.query.page = page;
        router.push(router);
    };

    const { data, last_page: totalPages } = response || {};

    const isThereAFilterApplied = Object.keys(router.query).length > 1; // margin for page

    const login = async (
        email: string,
        password: string,
        setError: (v: string) => void
    ) => {
        try {
            const req = await fetch(`${HOSTNAME}/api/auth/login`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            const { errors, user, token } = await req.json();

            if (errors) {
                if (errors.email) setError(errors.email[0]);

                return toast({
                    title: "Invalid Credentials.",
                    description: errors.email[0],
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
            }

            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("authKey", JSON.stringify(token));

            setAuthacity({
                user,
                authKey: token,
            });

            toast({
                title: "Login Successfull.",
                description: "You're logged in.",
                status: "success",
                duration: 5000,
                isClosable: true,
            });

            setLoginOpen(false);
        } catch (error) {
            toast({
                title: "Something went wrong while login.",
                description: "Try again later.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
    };

    const register = async (
        name: string,
        email: string,
        password: string,
        setError: (error: string) => void
    ) => {
        try {
            const req = await fetch(`${HOSTNAME}/api/auth/register`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    email,
                    password,
                }),
            });

            const { errors, user, token } = await req.json();

            if (errors) {
                if (errors.email) setError(errors.email[0]);

                return toast({
                    title: "Invalid Credentials.",
                    description: errors.email[0],
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
            }

            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("authKey", JSON.stringify(token));

            setAuthacity({
                user,
                authKey: token,
            });

            toast({
                title: "Registeration Successfull.",
                description: "You're registered and logged in.",
                status: "success",
                duration: 5000,
                isClosable: true,
            });

            setRegisterOpen(false);
        } catch (error) {
            toast({
                title: "Something went wrong while login.",
                description: "Try again later.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
    };

    return (
        <>
            <VStack m="10" marginX="auto" maxW={"4xl"}>
                <Navbar>
                    <>
                        {!(authacity || {}).authKey ? (
                            <>
                                <Link
                                    _hover={{
                                        color: "teal.500",
                                    }}
                                    onClick={(event) => {
                                        event.preventDefault();
                                        setLoginOpen(true);
                                    }}
                                >
                                    Login
                                </Link>
                                <Link
                                    _hover={{
                                        color: "teal.500",
                                    }}
                                    onClick={(event) => {
                                        event.preventDefault();
                                        setRegisterOpen(true);
                                    }}
                                >
                                    Register
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link color="teal.500">
                                    {authacity?.user.name}
                                </Link>

                                <Link
                                    _hover={{
                                        color: "teal.500",
                                    }}
                                    onClick={(event) => {
                                        event.preventDefault();
                                        localStorage.removeItem("user");
                                        localStorage.removeItem("authKey");
                                        setAuthacity({
                                            authKey: "",
                                            user: "",
                                        });
                                    }}
                                >
                                    Logout
                                </Link>
                            </>
                        )}

                        <Link
                            href="#"
                            _hover={{
                                color: "teal.500",
                            }}
                            onClick={(event) => {
                                event.preventDefault();
                                setFiltersOpen(true);
                            }}
                        >
                            Filters
                        </Link>
                    </>
                </Navbar>
            </VStack>

            <Skeleton
                height="100%"
                marginX={"auto"}
                maxW={"4xl"}
                isLoaded={!!response || !!error}
            >
                <VStack m="10" marginX="auto" align="center" maxW={"4xl"}>
                    {!!error ? (
                        <>
                            <Text size={"2xl"}>Something went wrong.</Text>
                            <Text size={"lg"}>Try again later.</Text>
                        </>
                    ) : (
                        <>
                            <Flex
                                flexDirection={"column"}
                                alignItems={"flex-end"}
                                width="100%"
                                px="6"
                            >
                                {isThereAFilterApplied ? (
                                    <Square>
                                        <Text size={"sm"}>
                                            <Link
                                                color="teal.500"
                                                onClick={() => clearFilters()}
                                            >
                                                Clear Filters
                                            </Link>
                                        </Text>
                                    </Square>
                                ) : null}
                                <Square>
                                    <Pagination
                                        currentPage={currentPage}
                                        totalPages={totalPages}
                                        onChange={(currentPage) => {
                                            router.query.page = `${currentPage}`;
                                            router.push(router);
                                        }}
                                    />
                                </Square>
                            </Flex>

                            {(data || []).length ? (
                                (data || []).map((article: Article) => (
                                    <NewsArticle
                                        key={article.externalLink}
                                        {...article}
                                    />
                                ))
                            ) : (
                                <Container
                                    paddingY="32"
                                    textAlign={"center"}
                                    maxW={"full"}
                                >
                                    <Text fontSize="2xl">
                                        Nothing found on this page.
                                    </Text>
                                    <Text fontSize="lg">
                                        Navigate to{" "}
                                        <Text
                                            as={"a"}
                                            href="#"
                                            color="teal.500"
                                            onClick={(event) => {
                                                event.preventDefault();
                                                router.query.page = `${totalPages}`;
                                                router.push(router);
                                            }}
                                        >
                                            the last
                                        </Text>{" "}
                                        page.
                                    </Text>
                                </Container>
                            )}

                            {(data || []).length ? (
                                <Flex
                                    justifyContent={"end"}
                                    width="100%"
                                    px="6"
                                >
                                    <Square>
                                        <Pagination
                                            currentPage={currentPage}
                                            totalPages={totalPages}
                                            onChange={(currentPage) => {
                                                router.query.page = `${currentPage}`;
                                                router.push(router);
                                            }}
                                        />
                                    </Square>
                                </Flex>
                            ) : null}
                        </>
                    )}
                </VStack>
            </Skeleton>

            {isFiltersOpen ? (
                <Filter
                    isDrawerOpen={isFiltersOpen}
                    onCloseDrawer={() => setFiltersOpen(false)}
                    metaData={metaData}
                    applyFilters={(filters: any) => {
                        router.query = { ...router.query, ...filters };
                        router.push(router);
                    }}
                    defaultSelected={router.query}
                    onClearFilters={clearFilters}
                    isFiltersApplied={isThereAFilterApplied}
                />
            ) : null}

            {isLoginOpen ? (
                <Login
                    isDrawerOpen={isLoginOpen}
                    onCloseDrawer={() => setLoginOpen(false)}
                    onLogin={login}
                />
            ) : null}

            {isRegisterOpen ? (
                <Register
                    isDrawerOpen={isRegisterOpen}
                    onCloseDrawer={() => setRegisterOpen(false)}
                    onRegister={register}
                />
            ) : null}
        </>
    );
}
