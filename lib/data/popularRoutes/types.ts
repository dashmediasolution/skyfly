export type FAQ = {
    question: string;
    answer: string;
};

export type ContentSection = {
    type: "h1" | "h2" | "h3";
    heading: string;
    paragraphs?: string[];
    listItems?: string[];
    subsections?: ContentSection[];
    faqs?: FAQ[];
};

export type PopularRoute = {
    destination: string;
    slug: string;
    image: string;
    description: string;
    href: string;
    content: ContentSection[];
};