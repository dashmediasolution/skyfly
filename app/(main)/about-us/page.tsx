import { AboutUsSection } from "@/components/about_components/About-Us-section";
 import type { Metadata } from 'next';

import { createPageMetadata } from "@/lib/seo";
export const metadata = createPageMetadata("about");

export default function AboutPage() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between bg-white ">
            <AboutUsSection />
          </main>
    )

}