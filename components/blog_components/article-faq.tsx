 

"use client";

import React from "react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { FaqItem } from "@/components/blog_components/blog-card";

interface ArticleFaqsProps {
    questions: FaqItem[];
}

export function ArticleFaqs({ questions }: ArticleFaqsProps) {
    if (!questions || questions.length === 0) {
        return null;
    }

    return (
        <div className="mx-auto w-full space-y-7">
            <div className="space-y-2">
                <h2 className="text-2xl font-semibold text-black md:text-3xl">
                    Frequently Asked Questions
                </h2>

                <p className="max-w-2xl text-gray-600 dark:text-gray-400">
                    Here are some common questions related to this article.
                </p>
            </div>

            <Accordion
                type="single"
                collapsible
                className="w-full -space-y-px bg-card dark:bg-card/50"
                defaultValue="item-1"
            >
                {questions.map((item) => (
                    <AccordionItem
                        value={item.id}
                        key={item.id}
                        className="relative border-none dark:border-gray-700"
                    >
                        <AccordionTrigger
                            className="px-4 py-4 text-left text-[20px] font-medium leading-6 text-[#538440] hover:no-underline hover:text-[#3F6632] [&>svg]:text-[#538440]"
                        >
                            {item.question}
                        </AccordionTrigger>

                        <AccordionContent className="px-4 pb-4 text-gray-700 dark:text-gray-300">
                            {item.answer}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    );
}







