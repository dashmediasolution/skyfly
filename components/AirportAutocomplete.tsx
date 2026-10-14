
"use client";

import { useEffect, useState } from "react";
import { MapPin, PlaneTakeoff } from "lucide-react";
import { Input } from "@/components/ui/input";

export type Airport = {
    id?: string;
    code?: string;
    iata?: string | null;
    icao?: string | null;
    name: string;
    municipality?: string;
    city?: string;
    country_name?: string;
    country?: string;
};

type Props = {
    label: string;
    value: string;
    onChange: (value: string) => void;
    onSelect: (airport: Airport) => void;
    placeholder: string;
    excludeCode?: string;
};

export default function AirportAutocomplete({
    label,
    value,
    onChange,
    onSelect,
    placeholder,
    excludeCode,
}: Props) {
    const [open, setOpen] = useState(false);
    const [airports, setAirports] = useState<Airport[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!open || value.trim().length < 2) {
            setAirports([]);
            setLoading(false);
            setError("");
            return;
        }

        const controller = new AbortController();

        const timer = setTimeout(async () => {
            setLoading(true);
            setError("");

            try {
                const response = await fetch(
                    `/api/airports?q=${encodeURIComponent(value.trim())}`,
                    { signal: controller.signal }
                );

                if (!response.ok) throw new Error("Airport search failed");

                const result = await response.json();
                setAirports(result.data ?? []);
            } catch (err) {
                if (
                    err instanceof Error &&
                    err.name !== "AbortError"
                ) {
                    setAirports([]);
                    setError("Unable to load airports. Please try again.");
                }
            } finally {
                if (!controller.signal.aborted) setLoading(false);
            }
        }, 300);

        return () => {
            clearTimeout(timer);
            controller.abort();
        };
    }, [value, open]);

    function selectAirport(airport: Airport) {
        const code = airport.iata || airport.code || airport.icao || "";
        const city = airport.municipality || airport.city || airport.name;

        onChange(`${city} ${code}`.trim());
        onSelect(airport);
        setOpen(false);
    }

    return (
        <div className="relative min-w-0">
            <label className="mb-2 block text-sm font-semibold text-gray-600">
                {label}
            </label>

            <div className="flex h-[58px] items-center gap-3 rounded-xl border border-gray-200 px-3 focus-within:border-[#548746]">
                <MapPin size={20} className="shrink-0 text-[#548746]" />

                <Input
                    value={value}
                    onChange={(event) => {
                        onChange(event.target.value);
                        setOpen(true);
                    }}
                    onFocus={() => setOpen(true)}
                    onBlur={() => setTimeout(() => setOpen(false), 150)}
                    placeholder={placeholder}
                    autoComplete="off"
                    aria-label={label}
                    className="h-full min-w-0 border-0 bg-transparent px-0 shadow-none focus-visible:ring-0"
                />
            </div>

            {open && value.trim().length >= 2 && (
                <div className="absolute left-0 top-full z-50 mt-2 w-full min-w-[280px] overflow-hidden rounded-xl border bg-white shadow-xl">
                    {loading && (
                        <p className="p-4 text-sm text-gray-500">
                            Searching airports...
                        </p>
                    )}

                    {!loading && error && (
                        <p className="p-4 text-sm text-red-600">{error}</p>
                    )}

                    {!loading && !error && airports
                        .filter((airport) => {
                            const code =
                                airport.iata || airport.code || airport.icao;
                            return code !== excludeCode;
                        }).length === 0 && (
                        <p className="p-4 text-sm text-gray-500">
                            No matching airports found.
                        </p>
                    )}

                    {!loading && !error && airports
                        .filter((airport) => {
                            const code =
                                airport.iata || airport.code || airport.icao;
                            return code !== excludeCode;
                        })
                        .slice(0, 10)
                        .map((airport) => {
                            const code =
                                airport.iata || airport.code || airport.icao || "";
                            const city =
                                airport.municipality || airport.city || airport.name;
                            const country =
                                airport.country_name || airport.country || "";

                            return (
                                <button
                                    key={airport.id || airport.code || airport.iata || airport.name}
                                    type="button"
                                    onMouseDown={(event) => event.preventDefault()}
                                    onClick={() => selectAirport(airport)}
                                    className="flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-[#548746]/10"
                                >
                                    <PlaneTakeoff
                                        size={18}
                                        className="shrink-0 text-[#548746]"
                                    />
                                    <span className="min-w-0 flex-1">
                                        <span className="block truncate text-sm font-semibold text-gray-800">
                                            {city}, {country}
                                        </span>
                                        <span className="block truncate text-xs text-gray-500">
                                            {airport.name}
                                        </span>
                                    </span>
                                    <span className="text-sm font-bold text-[#548746]">
                                        {code}
                                    </span>
                                </button>
                            );
                        })}
                </div>
            )}
        </div>
    );
}
