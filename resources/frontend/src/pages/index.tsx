"use client";

import useSWR from "swr";
import Article from "@/types/Article";
import Pagination from "@/components/Pagination";
import NewsArticle from "@/components/NewsArticle";
import { VStack, Skeleton, Flex, Square } from "@chakra-ui/react";
import { useState } from "react";

const fetcher = (...args: any) => fetch(args).then((res) => res.json());

export default function Home() {
    const [currentPage, setCurrentPage] = useState<number>(1);
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
                            onChange={(currentPage) =>
                                setCurrentPage(currentPage)
                            }
                        />
                    </Square>
                </Flex>
                {(data || []).map((article: Article) => (
                    <NewsArticle key={article.externalLink} {...article} />
                ))}

                <Flex justifyContent={"end"} width="100%" px="6">
                    <Square>
                        <Pagination
                            currentPage={7}
                            totalPages={5}
                            onChange={(currentPage) => console.log(currentPage)}
                        />
                    </Square>
                </Flex>
            </VStack>
        </>
    );
}
