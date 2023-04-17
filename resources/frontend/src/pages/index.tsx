"use client";

import { Inter } from "next/font/google";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { VStack, Skeleton } from "@chakra-ui/react";
import useSWR from "swr";
import NewsArticle from "@/components/NewsArticle";
import Article from "@/types/Article";
import Pagination from "@/components/Pagination";

const fetcher = (...args: any) => fetch(args).then((res) => res.json());

export default function Home() {
    const { data: response, error } = useSWR(
        "http://localhost:8000/api/newsfeed",
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

    const { data } = response || {};

    return (
        <>
            <VStack m="10" marginX="auto" align="center" maxW={"4xl"}>
                <Pagination
                    currentPage={7}
                    totalPages={5}
                    onChange={(currentPage) => console.log(currentPage)}
                />
                {(data || []).map((article: Article) => (
                    <NewsArticle key={article.externalLink} {...article} />
                ))}
            </VStack>
        </>
    );
}
