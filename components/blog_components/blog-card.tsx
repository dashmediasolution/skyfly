
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
      <div className="flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white transition-all duration-300 hover:border-primary/40 hover:shadow-md dark:border-gray-800 dark:bg-gray-900">
        {/* Full image without cropping */}
        <div className="relative h-44 w-full shrink-0 overflow-hidden bg-gray-50 sm:h-48">
          <Image
            src={article.imageUrl}
            alt={article.title}
            fill
            className="object-contain transition-transform duration-300 group-hover:scale-[1.02]"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        {/* Compact card content */}
        <div className="flex flex-1 flex-col p-4">
          {/* Categories */}
          <div className="mb-2 flex flex-wrap items-center text-[10px] font-bold uppercase tracking-wider text-primary">
            {visibleCategories.map((cat, index) => (
              <div key={`${cat}-${index}`} className="flex items-center">
                <span>{cat}</span>
                {index < visibleCategories.length - 1 && (
                  <span className="mx-1.5 text-primary/40">|</span>
                )}
              </div>
            ))}
          </div>

          {/* Title */}
          <div className="mb-2 flex items-start justify-between gap-2">
            <h3 className="line-clamp-2 text-lg font-bold leading-snug text-gray-900 transition-colors group-hover:text-primary dark:text-white">
              {article.title}
            </h3>

            <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-primary opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
          </div>

          {/* Description */}
          <p className="mb-4 line-clamp-2 flex-grow text-sm leading-5 text-gray-500 dark:text-gray-400">
            {article.metaDesc}
          </p>

          {/* Footer */}
          <div className="mt-auto flex items-center justify-between gap-2 border-t border-gray-100 pt-3 dark:border-gray-800">
            <div className="flex min-w-0 items-center gap-2">
              <LetterAvatar name="SkyFlyWithUs" size={28} />
              <span className="truncate text-xs font-semibold text-gray-700 dark:text-gray-200">
               SkyFlyWithUs
              </span>
            </div>

            <div className="flex shrink-0 items-center text-[11px] font-medium text-gray-400">
              <CalendarDays className="mr-1 h-3 w-3" />
              {article.publishDate}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
