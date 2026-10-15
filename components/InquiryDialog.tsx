 "use client";

import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
    CheckCircle2,
    ArrowRight,
    Headset,
    Phone,
} from "lucide-react";

type Props = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    from: string;
    to: string;
    departure: string;
    returnDate: string;
    travellers: string;
    searchType: "flights" | "hotels";
};

export default function InquiryDialog({
    open,
    onOpenChange,
    from,
    to,
    departure,
    returnDate,
    travellers,
    searchType,
}: Props) {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleSubmit(
        event: React.FormEvent<HTMLFormElement>
    ) {
        event.preventDefault();

        if (loading) return;

        setLoading(true);
        setError("");

        try {
            const response = await fetch("/api/inquiry", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: name.trim(),
                    email: email.trim(),
                    phone: phone.trim(),
                    from,
                    to,
                    departure,
                    returnDate,
                    travellers,
                    searchType,
                }),
            });

            const result = await response.json();

            if (!response.ok || !result.success) {
                throw new Error(
                    result.message ||
                        "Unable to send your inquiry. Please try again."
                );
            }

            setSubmitted(true);
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Something went wrong. Please try again."
            );
        } finally {
            setLoading(false);
        }
    }

    function handleClose(nextOpen: boolean) {
        if (loading && !nextOpen) return;

        onOpenChange(nextOpen);

        if (!nextOpen) {
            setTimeout(() => {
                setSubmitted(false);
                setName("");
                setPhone("");
                setEmail("");
                setError("");
                setLoading(false);
            }, 200);
        }
    }

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="max-h-[95dvh] w-[calc(100%-24px)] max-w-[560px] overflow-y-auto rounded-2xl border border-border bg-background p-0 text-foreground shadow-2xl">
                {!submitted ? (
                    <div className="relative px-5 pb-5 pt-4 sm:px-7 sm:pb-5 sm:pt-5">
                        <DialogHeader className="space-y-1 text-center">
                            <DialogTitle className="text-xl font-extrabold leading-tight text-foreground sm:text-2xl">
                                We're Here to Help!
                            </DialogTitle>

                            <DialogDescription className="mx-auto max-w-lg text-xs leading-5 text-muted-foreground sm:text-sm">
                                Connect with our travel team for assistance
                                with your next journey.
                            </DialogDescription>
                        </DialogHeader>

                        <a
                            href="tel:+18555093791"
                            className="mt-3 flex items-center justify-center gap-2 text-xl font-extrabold tracking-tight text-primary transition-opacity hover:opacity-80 sm:text-2xl"
                        >
                            <Phone className="h-5 w-5 shrink-0" />
                            <span>1-855-509-3791</span>
                        </a>

                        <div className="mt-4 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 rounded-xl bg-primary/5 px-3 py-3 text-center">
                            <span className="text-xs font-medium text-foreground sm:text-sm">
                                Save Up to
                            </span>

                            <span className="text-xl font-extrabold leading-none text-primary sm:text-2xl">
                                40% OFF
                            </span>

                            <span className="text-xs font-medium text-foreground sm:text-sm">
                                Your Next Flight
                            </span>
                        </div>

                        <div className="mb-4 mt-5">
                            <h3 className="text-lg font-extrabold leading-tight text-foreground sm:text-xl">
                                Let's Get You in Touch
                            </h3>

                            <p className="mt-1 text-xs leading-5 text-muted-foreground sm:text-sm">
                                Share your contact details and our team
                                will reach out to assist you.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-3">
                            <div className="space-y-1.5">
                                <Label
                                    htmlFor="inquiry-name"
                                    className="text-sm font-semibold text-primary"
                                >
                                    Full Name
                                </Label>

                                <Input
                                    id="inquiry-name"
                                    value={name}
                                    onChange={(event) =>
                                        setName(event.target.value)
                                    }
                                    placeholder="Enter your full name"
                                    autoComplete="name"
                                    required
                                    minLength={2}
                                    maxLength={100}
                                    className="h-10 rounded-lg border-input bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground focus-visible:ring-primary"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <Label
                                    htmlFor="inquiry-email"
                                    className="text-sm font-semibold text-primary"
                                >
                                    Email Address
                                </Label>

                                <Input
                                    id="inquiry-email"
                                    type="email"
                                    value={email}
                                    onChange={(event) =>
                                        setEmail(event.target.value)
                                    }
                                    placeholder="you@example.com"
                                    autoComplete="email"
                                    required
                                    maxLength={254}
                                    className="h-10 rounded-lg border-input bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground focus-visible:ring-primary"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <Label
                                    htmlFor="inquiry-phone"
                                    className="text-sm font-semibold text-primary"
                                >
                                    Phone Number
                                </Label>

                                <Input
                                    id="inquiry-phone"
                                    type="tel"
                                    value={phone}
                                    onChange={(event) =>
                                        setPhone(event.target.value)
                                    }
                                    placeholder="Enter your phone number"
                                    autoComplete="tel"
                                    pattern="[+]?[0-9 ()-]{7,20}"
                                    title="Enter a valid phone number"
                                    required
                                    className="h-10 rounded-lg border-input bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground focus-visible:ring-primary"
                                />
                            </div>

                            {error && (
                                <p
                                    role="alert"
                                    className="text-sm text-destructive"
                                >
                                    {error}
                                </p>
                            )}

                            <Button
                                type="submit"
                                disabled={loading}
                                className="h-10 w-full rounded-xl bg-primary text-sm font-bold text-primary-foreground shadow-md shadow-primary/20 transition-all hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {loading ? "Sending..." : "Send Message"}

                                {!loading && (
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                )}
                            </Button>

                            <p className="text-center text-[11px] leading-4 text-muted-foreground">
                                Your information will only be used to
                                respond to your enquiry.
                            </p>
                        </form>
                    </div>
                ) : (
                    <div className="px-6 py-7 text-center sm:px-8 sm:py-8">
                        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                            <CheckCircle2 className="h-8 w-8" />
                        </div>

                        <DialogHeader className="space-y-2">
                            <DialogTitle className="text-center text-2xl font-extrabold text-foreground">
                                Thank You, {name}!
                            </DialogTitle>

                            <DialogDescription className="text-center text-sm leading-6 text-muted-foreground">
                                Your inquiry has been sent successfully.
                                Our team will reach out to assist you with
                                your travel plans.
                            </DialogDescription>
                        </DialogHeader>

                        <a
                            href="tel:+18555093791"
                            className="my-5 flex items-center justify-center gap-3 rounded-xl border border-primary/15 bg-primary/5 p-4 text-primary transition-colors hover:bg-primary/10"
                        >
                            <Headset className="h-6 w-6 shrink-0" />

                            <div className="text-left">
                                <p className="text-xs text-muted-foreground">
                                    Need immediate assistance?
                                </p>

                                <p className="mt-1 text-lg font-extrabold">
                                    1-855-509-3791
                                </p>
                            </div>
                        </a>

                        <Button
                            onClick={() => handleClose(false)}
                            variant="outline"
                            className="h-10 w-full rounded-xl border-primary font-bold text-primary hover:bg-primary/5"
                        >
                            Done
                        </Button>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}
 