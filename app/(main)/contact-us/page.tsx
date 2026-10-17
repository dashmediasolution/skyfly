import type { Metadata } from 'next';
import ContactPageClient from '@/components/contact_components/contact-client-page'; // Import the new client component

import { createPageMetadata } from "@/lib/seo";
export const metadata = createPageMetadata("contact");
// This is the Server Component page
export default function ContactPage() {
  // It renders the Client Component that contains the form logic
  return <ContactPageClient />; 
}