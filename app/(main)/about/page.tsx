import { AboutUsSection } from "@/components/about_components/About-Us-section";
 import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about the team and mission behind SkyFlyWithUs.',
};

export default function AboutPage() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between bg-white ">
            <AboutUsSection />
          </main>
    )

}