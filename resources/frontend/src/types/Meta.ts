import { Source } from "postcss";
import Author from "./Author";

export default interface Meta {
    sources: Source[];
    authors: Author[];
    publishedAt: {
        min: string;
        max: string;
    };
}
