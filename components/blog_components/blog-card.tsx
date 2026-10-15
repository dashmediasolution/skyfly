
"use client";

import Image from "next/image";
import Link from "next/link";
import { LetterAvatar } from "@/components/ui/letter-avatar";
import { CalendarDays, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface Article {
  id: string;
  slug: string;
  category: string;
  categories?: string[];
  categorySlug: string;
  title: string;
  content: string;
  imageUrl: string;
  authorName: string;
  publishDate: string;
  metaTitle: string;
  metaDesc: string;
  metaKeywords: string;
  faqs?: FaqItem[] | undefined;
}

interface ArticleCardProps {
  article: Article;
  className?: string;
}

export function BlogCard({ article, className }: ArticleCardProps) {
  const displayCategories =
    article.categories && article.categories.length > 0
      ? article.categories
      : [article.category];

  const visibleCategories = displayCategories.slice(0, 3);

  return (
    <Link
      href={`/blog/${article.slug}`}
      className={cn("group block h-full", className)}
    >
      <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all duration-300 hover:border-primary/40 hover:shadow-lg dark:border-gray-800 dark:bg-gray-900">
        {/* Image */}
        <div className="relative aspect-[16/10] w-full overflow-hidden">
          <Image
            src={article.imageUrl}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        {/* Card Content */}
        <div className="flex flex-1 flex-col p-6">
          {/* Categories */}
          <div className="mb-3 flex flex-wrap items-center text-xs font-bold uppercase tracking-wider text-primary">
            {visibleCategories.map((cat, index) => (
              <div key={`${cat}-${index}`} className="flex items-center">
                <span>{cat}</span>

                {index < visibleCategories.length - 1 && (
                  <span className="mx-2 text-primary/40 text-[10px] font-light">
                    |
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Title and Arrow */}
          <div className="mb-3 flex items-start justify-between gap-4">
            <h3 className="line-clamp-2 text-xl font-bold leading-tight text-gray-900 transition-colors group-hover:text-primary dark:text-white">
              {article.title}
            </h3>

            <ArrowUpRight className="h-5 w-5 shrink-0 translate-y-2 text-primary opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100" />
          </div>

          {/* Description */}
          <p className="mb-6 flex-grow line-clamp-3 text-sm text-gray-500 dark:text-gray-400">
            {article.metaDesc}
          </p>

          {/* Footer */}
          <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-4 dark:border-gray-800">
            <div className="flex items-center gap-2.5">
              <LetterAvatar name={article.authorName} size={32} />

              <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                {article.authorName}
              </span>
            </div>

            <div className="flex items-center text-xs font-medium text-gray-400">
              <CalendarDays className="mr-1.5 h-3.5 w-3.5" />
              {article.publishDate}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
