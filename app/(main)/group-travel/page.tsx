

import GroupTravelBookingPage from "./GroupTravelPage";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata("groupTravel");

export default function GroupTravelPage() {
    return <GroupTravelBookingPage />;
}