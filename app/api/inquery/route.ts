
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const {
            name,
            email,
            phone,
            from,
            to,
            departure,
            returnDate,
            travellers,
            searchType,
        } = body;

        if (
            typeof name !== "string" ||
            name.trim().length < 2 ||
            name.length > 100 ||
            typeof email !== "string" ||
            email.length > 254 ||
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
            typeof phone !== "string" ||
            !/^[+]?[0-9 ()-]{7,20}$/.test(phone) ||
            !["flights", "hotels"].includes(searchType)
        ) {
            return NextResponse.json(
                { success: false, message: "Please provide valid details." },
                { status: 400 }
            );
        }

        const apiKey = process.env.RESEND_API_KEY;
        const recipient = process.env.INQUIRY_TO_EMAIL;
        const sender = process.env.RESEND_FROM_EMAIL;

        if (!apiKey || !recipient || !sender) {
            console.error("Inquiry email environment variables are missing.");

            return NextResponse.json(
                { success: false, message: "Email service is not configured." },
                { status: 500 }
            );
        }

        const safe = (value: unknown, maxLength = 200) =>
            typeof value === "string"
                ? value.trim().slice(0, maxLength)
                : "";

        const escapeHtml = (value: string) =>
            value.replace(/[&<>"']/g, (char) => ({
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#39;",
            })[char]!);

        const details = [
            ["Name", name.trim()],
            ["Email", email.trim()],
            ["Phone", phone.trim()],
            ["Inquiry Type", searchType],
            ["From", safe(from)],
            ["To", safe(to)],
            ["Departure", safe(departure)],
            ["Return", safe(returnDate)],
            ["Travellers", safe(travellers)],
        ];

        const html = `
            <h2>New Travel Inquiry</h2>
            <table cellpadding="8" cellspacing="0" border="1"
                style="border-collapse:collapse">
                ${details
                    .map(
                        ([label, value]) =>
                            `<tr>
                                <th align="left">${escapeHtml(label)}</th>
                                <td>${escapeHtml(value)}</td>
                            </tr>`
                    )
                    .join("")}
            </table>
        `;

        const response = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${apiKey}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                from: sender,
                to: [recipient],
                reply_to: email.trim(),
                subject: `New ${searchType} inquiry from ${name.trim()}`,
                html,
            }),
            cache: "no-store",
        });

        if (!response.ok) {
            const error = await response.text();
            console.error("Resend email error:", error);

            return NextResponse.json(
                { success: false, message: "Unable to send your inquiry. Please try again." },
                { status: 502 }
            );
        }

        return NextResponse.json({
            success: true,
            message: "Your inquiry has been sent successfully.",
        });
    } catch (error) {
        console.error("Inquiry API error:", error);

        return NextResponse.json(
            { success: false, message: "Something went wrong. Please try again." },
            { status: 500 }
        );
    }
}
