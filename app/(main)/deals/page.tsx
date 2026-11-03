import DealsBookingPage from "./DealsBookingPage";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata("deals");

export default function DealsPage() {
    return <DealsBookingPage />;
}