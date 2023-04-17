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
} from "@chakra-ui/react";
import { useRouter } from "next/router";

const fetcher = (...args: any) => fetch(args).then((res) => res.json());

export default function Home() {
    const router = useRouter();
    const { query } = router;
    const currentPage = Math.abs(parseInt((query.page as string) || "1"));

    const { data: response, error } = useSWR(
        `http://localhost:8000/api/newsfeed?page=${currentPage}`,
        fetcher
    );

    if (error) return <div>Failed to load</div>;
    if (!response)
        return (
            <VStack m="10" marginX="auto" align="center" maxW={"2xl"}>
                {[...Array.from(Array(15).keys())].map((_) => (
                    <Skeleton key={_} height="200px" />
                ))}
            </VStack>
        );

    const { data, last_page: totalPages } = response || {};

    return (
        <>
            <VStack m="10" marginX="auto" align="center" maxW={"4xl"}>
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
                {data.length ? (
                    (data || []).map((article: Article) => (
                        <NewsArticle key={article.externalLink} {...article} />
                    ))
                ) : (
                    <Container paddingY="32" textAlign={"center"} maxW={"full"}>
                        <Text fontSize="2xl">
                            Nothing found on this page. Try Navigating to other
                            pages.
                        </Text>
                    </Container>
                )}

                {data.length ? (
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
                ) : null}
            </VStack>
        </>
    );
}
