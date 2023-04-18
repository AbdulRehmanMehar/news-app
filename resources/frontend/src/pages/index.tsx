"use client";

import useSWR from "swr";
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
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import Navbar from "@/components/Navbar";
import Filter from "@/components/Filter";
import { useState } from "react";

const fetcher = (...args: any) => fetch(args).then((res) => res.json());

export default function Home() {
    const router = useRouter();
    const { query } = router;
    const [isFiltersOpen, setFiltersOpen] = useState<boolean>(true);
    const currentPage = Math.abs(parseInt((query.page as string) || "1"));

    const { data: response, error } = useSWR(
        `http://localhost:8000/api/newsfeed?page=${currentPage}`,
        fetcher
    );

    const { data, last_page: totalPages } = response || {};

    return (
        <>
            <Filter
                isDrawerOpen={isFiltersOpen}
                onCloseDrawer={() => setFiltersOpen(false)}
            ></Filter>
            <VStack m="10" marginX="auto" maxW={"4xl"}>
                <Navbar>
                    <>
                        <Link
                            href="/"
                            _hover={{
                                color: "teal.500",
                            }}
                        >
                            Home
                        </Link>
                        <Link
                            href="/login"
                            _hover={{
                                color: "teal.500",
                            }}
                        >
                            Login
                        </Link>

                        <Link
                            href="/register"
                            _hover={{
                                color: "teal.500",
                            }}
                        >
                            Register
                        </Link>

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
            <VStack m="10" marginX="auto" align="center" maxW={"4xl"}>
                <Skeleton
                    height="100%"
                    marginX={"auto"}
                    isLoaded={!!response || !!error}
                >
                    {!!error ? (
                        <>
                            <Text size={"2xl"}>Something went wrong.</Text>
                            <Text size={"lg"}>Try again later.</Text>
                        </>
                    ) : (
                        <>
                            <Flex justifyContent={"end"} width="100%" px="6">
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
                </Skeleton>
            </VStack>
        </>
    );
}
