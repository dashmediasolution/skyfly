
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q")?.trim();

    if (!query || query.length < 2) {
        return NextResponse.json({ data: [] });
    }

    try {
        const apiUrl = new URL("https://api.freeairportdb.com/v1/airports");

        apiUrl.searchParams.set("q", query);
        apiUrl.searchParams.set("limit", "100");

        const response = await fetch(apiUrl.toString(), {
            headers: {
                Accept: "application/json",
            },
            next: {
                revalidate: 3600,
            },
        });

        if (!response.ok) {
            console.error("FreeAirportDB error:", response.status);

            return NextResponse.json(
                { error: "Unable to fetch airports", data: [] },
                { status: 502 }
            );
        }

        const result = await response.json();

        return NextResponse.json(
            { data: result.data ?? [] },
            {
                headers: {
                    "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
                },
            }
        );
    } catch (error) {
        console.error("Airport API error:", error);

        return NextResponse.json(
            { error: "Airport service is temporarily unavailable", data: [] },
            { status: 500 }
        );
    }
}
