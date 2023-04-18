import Author from "./Author";
import Source from "./Source";

export default interface Article {
    title: string;
    imageURL: string;
    description: string;
    publishedAt: string;
    externalLink: string;
    sources: Omit<Source, "id">[];
    authors: Omit<Author, "id">[];
}
