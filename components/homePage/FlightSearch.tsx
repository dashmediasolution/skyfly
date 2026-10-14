"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import {
    ArrowLeftRight,
    CalendarDays,
    ChevronDown,
    Bed,
    Users,
    PlaneTakeoff,
    Search,
    Minus,
    Plus,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";

import AirportAutocomplete, {
    type Airport,
} from "@/components/AirportAutocomplete";

import InquiryDialog from "@/components/InquiryDialog";

type SearchType = "flights" | "hotels";

export default function FlightSearch() {
    const pathname = usePathname();

    const [searchType, setSearchType] = useState<SearchType>("flights");
    const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

    const [from, setFrom] = useState("Delhi DEL");
    const [to, setTo] = useState("Bali DPS");

    const [fromAirport, setFromAirport] = useState<Airport | null>(null);
    const [toAirport, setToAirport] = useState<Airport | null>(null);

    const [departure, setDeparture] = useState("2026-11-12");
    const [returnDate, setReturnDate] = useState("2026-11-18");

    const [adults, setAdults] = useState(1);
    const [children, setChildren] = useState(0);
    const [cabinClass, setCabinClass] = useState("Economy");

    const [travellerOpen, setTravellerOpen] = useState(false);
    const [inquiryOpen, setInquiryOpen] = useState(false);

    const totalTravellers = adults + children;

    const travellers = `${adults} Adult${adults !== 1 ? "s" : ""}, ${children} Child${children !== 1 ? "ren" : ""}, ${cabinClass}`;

    function swapLocations() {
        setFrom(to);
        setTo(from);
        setFromAirport(toAirport);
        setToAirport(fromAirport);
    }

    function handleSearch(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setMobileSearchOpen(false);
        setInquiryOpen(true);
    }

    const searchForm = (
        <form
            onSubmit={handleSearch}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_1fr_1.2fr_auto] lg:items-end lg:gap-3"
        >
            {/* From */}
            <div className="relative min-w-0">
                <AirportAutocomplete
                    label={searchType === "flights" ? "From" : "Check-in city"}
                    value={from}
                    onChange={(value) => {
                        setFrom(value);
                        setFromAirport(null);
                    }}
                    onSelect={setFromAirport}
                    excludeCode={
                        toAirport?.iata ?? toAirport?.code ?? toAirport?.icao ?? undefined
                    }
                    placeholder="Search departure airport"
                />

                <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    title="Swap locations"
                    aria-label="Swap locations"
                    onClick={swapLocations}
                    className="absolute right-2 top-[37px] z-10 h-9 w-9 rounded-full border-gray-200 bg-white text-gray-500 hover:border-[#548746] hover:text-[#548746]"
                >
                    <ArrowLeftRight size={17} />
                </Button>
            </div>

            {/* To */}
            <div className="min-w-0">
                <AirportAutocomplete
                    label={searchType === "flights" ? "To" : "Destination"}
                    value={to}
                    onChange={(value) => {
                        setTo(value);
                        setToAirport(null);
                    }}
                    onSelect={setToAirport}
                    excludeCode={
                        fromAirport?.iata ??
                        fromAirport?.code ??
                        fromAirport?.icao ?? undefined
                    }
                    placeholder="Search destination airport"
                />
            </div>

            {/* Departure */}
            <div className="min-w-0">
                <label
                    htmlFor="departure-date"
                    className="mb-2 block text-sm font-semibold text-gray-600"
                >
                    {searchType === "flights" ? "Departure" : "Check-in"}
                </label>

                <div className="flex h-[58px] items-center gap-2 rounded-xl border border-gray-200 px-3 focus-within:border-[#548746]">
                    <CalendarDays
                        size={20}
                        className="shrink-0 text-[#548746]"
                    />

                    <input
                        id="departure-date"
                        type="date"
                        value={departure}
                        min={new Date().toLocaleDateString("en-CA")}
                        onChange={(event) => {
                            const nextDate = event.target.value;
                            setDeparture(nextDate);

                            if (nextDate > returnDate) {
                                setReturnDate(nextDate);
                            }
                        }}
                        required
                        className="w-full min-w-0 bg-transparent text-sm font-semibold text-gray-700 outline-none"
                    />
                </div>
            </div>

            {/* Return */}
            <div className="min-w-0">
                <label
                    htmlFor="return-date"
                    className="mb-2 block text-sm font-semibold text-gray-600"
                >
                    {searchType === "flights" ? "Return" : "Check-out"}
                </label>

                <div className="flex h-[58px] items-center gap-2 rounded-xl border border-gray-200 px-3 focus-within:border-[#548746]">
                    <CalendarDays
                        size={20}
                        className="shrink-0 text-[#548746]"
                    />

                    <input
                        id="return-date"
                        type="date"
                        value={returnDate}
                        min={departure}
                        onChange={(event) => setReturnDate(event.target.value)}
                        required
                        className="w-full min-w-0 bg-transparent text-sm font-semibold text-gray-700 outline-none"
                    />
                </div>
            </div>

            {/* Travellers */}
            <div className="min-w-0">
                <label className="mb-2 block text-sm font-semibold text-gray-600">
                    {searchType === "flights" ? "Travellers & Class" : "Guests"}
                </label>

                <Popover
                    open={travellerOpen}
                    onOpenChange={setTravellerOpen}
                >
                    <PopoverTrigger asChild>
                        <Button
                            type="button"
                            variant="outline"
                            className="flex h-[58px] w-full justify-between rounded-xl border-gray-200 px-3 text-left font-normal hover:bg-white"
                        >
                            <span className="flex min-w-0 items-center gap-2">
                                <Users
                                    size={20}
                                    className="shrink-0 text-[#548746]"
                                />

                                <span className="truncate text-sm font-semibold text-gray-700">
                                    {totalTravellers} Traveller
                                    {totalTravellers !== 1 ? "s" : ""}
                                    {searchType === "flights" ? `, ${cabinClass}` : ""}
                                </span>
                            </span>

                            <ChevronDown
                                size={16}
                                className="shrink-0 text-gray-500"
                            />
                        </Button>
                    </PopoverTrigger>

                    <PopoverContent
                        align="start"
                        sideOffset={8}
                        className="w-[min(320px,calc(100vw-32px))] rounded-2xl p-4"
                    >
                        <div className="space-y-5">
                            {/* Adults */}
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-semibold text-gray-900">Adults</p>
                                    <p className="text-xs text-gray-500">Age 12+</p>
                                </div>

                                <div className="flex items-center gap-3">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="icon"
                                        aria-label="Remove adult"
                                        disabled={adults <= 1}
                                        onClick={() =>
                                            setAdults((count) => Math.max(1, count - 1))
                                        }
                                        className="h-9 w-9 rounded-full border-[#548746] text-[#548746]"
                                    >
                                        <Minus size={16} />
                                    </Button>

                                    <span className="w-5 text-center font-semibold">
                                        {adults}
                                    </span>

                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="icon"
                                        aria-label="Add adult"
                                        disabled={totalTravellers >= 9}
                                        onClick={() => setAdults((count) => count + 1)}
                                        className="h-9 w-9 rounded-full border-[#548746] text-[#548746]"
                                    >
                                        <Plus size={16} />
                                    </Button>
                                </div>
                            </div>

                            <Separator />

                            {/* Children */}
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-semibold text-gray-900">Children</p>
                                    <p className="text-xs text-gray-500">Age 2–11</p>
                                </div>

                                <div className="flex items-center gap-3">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="icon"
                                        aria-label="Remove child"
                                        disabled={children <= 0}
                                        onClick={() =>
                                            setChildren((count) => Math.max(0, count - 1))
                                        }
                                        className="h-9 w-9 rounded-full border-[#548746] text-[#548746]"
                                    >
                                        <Minus size={16} />
                                    </Button>

                                    <span className="w-5 text-center font-semibold">
                                        {children}
                                    </span>

                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="icon"
                                        aria-label="Add child"
                                        disabled={totalTravellers >= 9}
                                        onClick={() => setChildren((count) => count + 1)}
                                        className="h-9 w-9 rounded-full border-[#548746] text-[#548746]"
                                    >
                                        <Plus size={16} />
                                    </Button>
                                </div>
                            </div>

                            {/* Cabin class */}
                            {searchType === "flights" && (
                                <>
                                    <Separator />

                                    <div className="space-y-2">
                                        <label
                                            htmlFor="cabin-class"
                                            className="text-sm font-semibold text-gray-900"
                                        >
                                            Cabin class
                                        </label>

                                        <select
                                            id="cabin-class"
                                            value={cabinClass}
                                            onChange={(event) =>
                                                setCabinClass(event.target.value)
                                            }
                                            className="h-10 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm outline-none focus:border-[#548746]"
                                        >
                                            <option value="Economy">Economy</option>
                                            <option value="Premium Economy">Premium Economy</option>
                                            <option value="Business">Business</option>
                                            <option value="First Class">First Class</option>
                                        </select>
                                    </div>
                                </>
                            )}

                            <Button
                                type="button"
                                onClick={() => setTravellerOpen(false)}
                                className="w-full rounded-lg bg-[#548746] font-semibold hover:bg-[#416d36]"
                            >
                                Done
                            </Button>
                        </div>
                    </PopoverContent>
                </Popover>
            </div>

            {/* Search */}
            <Button
                type="submit"
                className="h-[58px] w-full rounded-full bg-[#548746] px-8 text-base font-bold text-white shadow-md transition hover:bg-[#416d36] hover:shadow-lg focus-visible:ring-[#548746] sm:col-span-2 lg:col-span-1 lg:min-w-[130px] lg:px-6"
            >
                <Search size={19} />
                Search
            </Button>
        </form>
    );

    return (
        <>
            <section
                id="flights"
                className={`relative z-10 ${pathname === "/"
                    ? "-mt-5 md:mt-8 lg:-mt-15"
                    : "mt-2 md:mt-6 lg:-mt-10"
                    } mx-auto w-full max-w-[1440px] px-4 sm:px-8 lg:px-12`}
            >
                {/* Mobile and tablet: empty search input */}
                <button
                    type="button"
                    onClick={() => setMobileSearchOpen(true)}
                    aria-label="Open flight search form"
                    className="flex h-12 w-full items-center gap-3 rounded-full border border-gray-200 bg-white px-5 text-left shadow-sm transition hover:border-[#548746] hover:shadow-md lg:hidden"
                >
                    <Search size={21} className="shrink-0 text-[#548746]" />
                    <span className="text-base text-gray-400">
                        Search flights
                    </span>
                </button>

                {/* Desktop: full search form */}
                <div className="hidden drop-shadow-[0_8px_20px_rgba(17,24,39,0.07)] lg:block">
                    {pathname === "/" && (
                        <div className="relative flex h-[44px] w-[calc(50%-40px)] items-end gap-14 rounded-tl-[26px] bg-white px-7">
                            <Button
                                type="button"
                                variant="ghost"
                                onClick={() => setSearchType("flights")}
                                className={`h-auto rounded-none border-b-[3px] px-0 pb-2 text-base font-bold hover:bg-transparent ${searchType === "flights"
                                    ? "border-[#548746] text-[#548746]"
                                    : "border-transparent text-gray-500"
                                    }`}
                            >
                                <PlaneTakeoff size={19} />
                                Flights
                            </Button>

                            <Button
                                type="button"
                                variant="ghost"
                                onClick={() => setSearchType("hotels")}
                                className={`h-auto rounded-none border-b-[3px] px-0 pb-2 text-base font-bold hover:bg-transparent ${searchType === "hotels"
                                    ? "border-[#548746] text-[#548746]"
                                    : "border-transparent text-gray-500"
                                    }`}
                            >
                                <Bed size={19} />
                                Hotels
                            </Button>

                            <svg
                                aria-hidden="true"
                                viewBox="0 0 80 44"
                                preserveAspectRatio="none"
                                className="pointer-events-none absolute -bottom-px left-[calc(100%-1px)] h-[45px] w-[81px]"
                            >
                                <path
                                    d="M0 0 C40 0 40 44 80 44 L0 44 Z"
                                    fill="#fff"
                                />
                            </svg>
                        </div>
                    )}

                    <div className={` ${pathname === "/" ? "rounded-tr-[26px] rounded-br-[26px] rounded-bl-[26px]" : "rounded-[26px]"} bg-white p-6`}>
                        {searchForm}
                    </div>
                </div>
            </section>

            {/* Mobile and tablet: full form inside dialog */}
            <Dialog
                open={mobileSearchOpen}
                onOpenChange={setMobileSearchOpen}
            >
                <DialogContent className="max-h-[90dvh] w-[calc(100%-24px)] max-w-3xl overflow-y-auto rounded-2xl bg-white p-4 sm:w-[calc(100%-40px)] sm:p-6 lg:hidden">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-bold text-gray-900">
                            Search your trip
                        </DialogTitle>
                    </DialogHeader>

                    {/* Tabs inside the dialog */}
                    {pathname === "/" && (
                        <div className="flex gap-7 border-b border-gray-200">
                            <Button
                                type="button"
                                variant="ghost"
                                onClick={() => setSearchType("flights")}
                                className={`rounded-none border-b-[3px] px-1 pb-3 font-semibold hover:bg-transparent ${searchType === "flights"
                                    ? "border-[#548746] text-[#548746]"
                                    : "border-transparent text-gray-500"
                                    }`}
                            >
                                <PlaneTakeoff size={18} />
                                Flights
                            </Button>

                            <Button
                                type="button"
                                variant="ghost"
                                onClick={() => setSearchType("hotels")}
                                className={`rounded-none border-b-[3px] px-1 pb-3 font-semibold hover:bg-transparent ${searchType === "hotels"
                                    ? "border-[#548746] text-[#548746]"
                                    : "border-transparent text-gray-500"
                                    }`}
                            >
                                <Bed size={18} />
                                Hotels
                            </Button>
                        </div>
                    )}

                    {searchForm}
                </DialogContent>
            </Dialog>

            {/* Inquiry Dialog */}
            <InquiryDialog
                open={inquiryOpen}
                onOpenChange={setInquiryOpen}
                from={from}
                to={to}
                departure={departure}
                returnDate={returnDate}
                travellers={travellers}
                searchType={searchType}
            />
        </>
    );
}
