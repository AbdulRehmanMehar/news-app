import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <CacheProvider>
            <ChakraProvider>
                <Component {...pageProps} />
            </ChakraProvider>
        </CacheProvider>
    );
}
