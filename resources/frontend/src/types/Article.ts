export interface Author {
    name: string;
}

export interface Source {
    name: string;
}

export default interface Article {
    title: string;
    imageURL: string;
    description: string;
    publishedAt: string;
    externalLink: string;
    sources: Source[];
    authors: Author[];
}
