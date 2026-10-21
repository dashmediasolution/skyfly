
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

 
const escapeHtml = (value: string) =>
    value.replace(/[&<>"']/g, (char) => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
    })[char]!);

const safe = (value: unknown, maxLength = 200) =>
    typeof value === "string"
        ? value.trim().slice(0, maxLength)
        : "";

const details = [
    ["Departure city", safe(from)],
    ["Destination", safe(to)],
    ["Departure date", safe(departure)],
    ["Return date", safe(returnDate) || "Not specified"],
    ["Travellers", safe(travellers) || "Not specified"],
];

const tripRows = details
    .map(
        ([label, value]) => `
            <tr>
                <td style="padding:13px 0;border-bottom:1px solid #e9edf3;
                    color:#64748b;font-size:13px;width:42%;">
                    ${escapeHtml(label)}
                </td>
                <td style="padding:13px 0;border-bottom:1px solid #e9edf3;
                    color:#172033;font-size:14px;font-weight:600;
                    text-align:right;">
                    ${escapeHtml(value)}
                </td>
            </tr>
        `
    )
    .join("");

const inquiryLabel =
    searchType === "flights" ? "Flight Inquiry" : "Hotel Inquiry";

const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New SkyFlyWithUs Travel Inquiry</title>
</head>
<body style="margin:0;padding:0;background-color:#f1f5f9;
    font-family:Arial,Helvetica,sans-serif;color:#172033;">

    <table role="presentation" width="100%" cellpadding="0"
        cellspacing="0" border="0" style="background:#f1f5f9;">
        <tr>
            <td align="center" style="padding:32px 12px;">

                <table role="presentation" width="100%" cellpadding="0"
                    cellspacing="0" border="0"
                    style="max-width:600px;background:#ffffff;
                    border-radius:18px;overflow:hidden;">

                    <!-- Brand header -->
                    <tr>
                        <td style="padding:30px 28px;background:#10213b;
                            background-image:linear-gradient(135deg,#10213b,#174b79);">
                            <p style="margin:0;color:#ffffff;font-size:24px;
                                font-weight:800;letter-spacing:-0.7px;">
                                SkyFlyWithUs<span style="color:#60c8fa;">.</span>
                            </p>
                            <p style="margin:8px 0 0;color:#cbd9e8;
                                font-size:13px;line-height:20px;">
                                Your next journey starts here.
                            </p>
                        </td>
                    </tr>

                    <!-- Main content -->
                    <tr>
                        <td style="padding:30px 28px 12px;">
                            <p style="margin:0 0 12px;color:#0879bd;
                                font-size:11px;font-weight:700;
                                letter-spacing:1.5px;text-transform:uppercase;">
                                NEW CUSTOMER REQUEST
                            </p>

                            <h1 style="margin:0;color:#10213b;
                                font-size:25px;line-height:1.3;
                                letter-spacing:-0.6px;">
                                New travel inquiry received
                            </h1>

                            <p style="margin:12px 0 20px;color:#64748b;
                                font-size:14px;line-height:1.7;">
                                A customer has submitted a request through
                                your website. Review their details below
                                and follow up to assist with their journey.
                            </p>

                            <span style="display:inline-block;
                                padding:8px 13px;border-radius:20px;
                                background:#eaf5ff;color:#075985;
                                font-size:12px;font-weight:700;">
                                &#9992;&nbsp; ${inquiryLabel}
                            </span>
                        </td>
                    </tr>

                    <!-- Customer information -->
                    <tr>
                        <td style="padding:18px 28px 10px;">
                            <h2 style="margin:0 0 15px;color:#10213b;
                                font-size:16px;">
                                Customer information
                            </h2>

                            <table role="presentation" width="100%"
                                cellpadding="0" cellspacing="0" border="0">
                                <tr>
                                    <td style="padding:12px 0;
                                        border-bottom:1px solid #e9edf3;
                                        color:#64748b;font-size:13px;">
                                        Full name
                                    </td>
                                    <td style="padding:12px 0;
                                        border-bottom:1px solid #e9edf3;
                                        color:#172033;font-size:14px;
                                        font-weight:600;text-align:right;">
                                        ${escapeHtml(name.trim())}
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding:12px 0;
                                        border-bottom:1px solid #e9edf3;
                                        color:#64748b;font-size:13px;">
                                        Email address
                                    </td>
                                    <td style="padding:12px 0;
                                        border-bottom:1px solid #e9edf3;
                                        text-align:right;font-size:14px;
                                        overflow-wrap:anywhere;">
                                        <a href="mailto:${escapeHtml(email.trim())}"
                                            style="color:#0879bd;font-weight:600;
                                            text-decoration:none;">
                                            ${escapeHtml(email.trim())}
                                        </a>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding:12px 0;
                                        border-bottom:1px solid #e9edf3;
                                        color:#64748b;font-size:13px;">
                                        Phone number
                                    </td>
                                    <td style="padding:12px 0;
                                        border-bottom:1px solid #e9edf3;
                                        text-align:right;font-size:14px;">
                                        <a href="tel:${escapeHtml(phone.trim())}"
                                            style="color:#0879bd;
                                            font-weight:600;text-decoration:none;">
                                            ${escapeHtml(phone.trim())}
                                        </a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Trip details -->
                    <tr>
                        <td style="padding:22px 28px 28px;">
                            <h2 style="margin:0 0 8px;color:#10213b;
                                font-size:16px;">
                                Trip details
                            </h2>

                            <table role="presentation" width="100%"
                                cellpadding="0" cellspacing="0" border="0">
                                ${tripRows}
                            </table>
                        </td>
                    </tr>

                    <!-- Call to action -->
                    <tr>
                        <td style="padding:0 28px 30px;">
                            <table role="presentation" width="100%"
                                cellpadding="0" cellspacing="0" border="0"
                                style="background:#f0f8ff;border-radius:12px;">
                                <tr>
                                    <td style="padding:18px;">
                                        <p style="margin:0 0 6px;color:#10213b;
                                            font-size:14px;font-weight:700;">
                                            Ready to help your customer?
                                        </p>
                                        <p style="margin:0;color:#64748b;
                                            font-size:12px;line-height:1.7;">
                                            Reply directly to this email to
                                            follow up with the customer.
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="padding:22px 28px;background:#f8fafc;
                            border-top:1px solid #e9edf3;text-align:center;">
                            <p style="margin:0;color:#10213b;
                                font-size:13px;font-weight:700;">
                                SkyFlyWithUs
                            </p>
                            <p style="margin:7px 0 0;color:#94a3b8;
                                font-size:11px;line-height:1.6;">
                                Automated notification from your website's
                                travel inquiry form.
                            </p>
                        </td>
                    </tr>

                </table>

            </td>
        </tr>
    </table>
</body>
</html>
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
