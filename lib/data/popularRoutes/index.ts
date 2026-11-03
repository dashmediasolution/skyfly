import { parisData } from "./paris";

import type { PopularRoute } from "./types";

export const popularRoutes: PopularRoute[] = [
    parisData,
 ];

export function getPopularRoute(slug: string) {
    return popularRoutes.find((route) => route.slug === slug);
}