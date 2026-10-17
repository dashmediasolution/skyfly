"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";
import { FaXTwitter, FaPinterestP, FaInstagram, FaFacebook } from "react-icons/fa6";



const quickLinks = [
  { name: "About Us", href: "/about" },
  { name: "Flights", href: "/flights" },
  { name: "Blog", href: "/blog" },
  { name: "Car Rental", href: "/car-rental" },
  { name: "Hotel", href: "/hotels" },
  { name: "Deals", href: "/deals" },
];

const usefulLinks = [
  { name: "Disclaimer", href: "/disclaimer" },
  { name: "Privacy Policy", href: "/privacy" },
  { name: "Terms & Conditions", href: "/terms" },
  { name: "Contact Us", href: "/contact" },
  { name: "Sitemap", href: "/sitemap" },
];

export function Footer() {
  return (
    <footer
      className="w-full overflow-hidden font-sans text-white bg-primary"

    >
      {/* Main Footer */}
      <div className="mx-auto max-w-[1440px] px-5 py-10 sm:px-8 sm:py-12 lg:px-12">
        <div className="grid grid-cols-1 gap-9 sm:grid-cols-2 lg:grid-cols-[1.5fr_0.8fr_1.1fr_1.2fr] lg:gap-10 xl:gap-16">

          {/* Logo and Description */}
          <div className="min-w-0">
            <Link
              href="/"
              aria-label="SkyFlyWithUs homepage"
              className="inline-flex items-center"
            >
              <Image
                src="/images/footer-logo.svg"
                alt="SkyFlyWithUs-logo"
                width={210}
                height={60}
                priority
                className="h-auto w-[185px] object-contain"
              />
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-[1.5rem] text-white/90">
              SkyFlyWithUs is your travel information resource for
              discovering destinations, exploring flight deals, and
              planning smoother journeys. Find helpful travel guides
              and tips for your next adventure.
            </p>

            {/* Social Media */}
            <div className="mt-5 flex items-center gap-2">
                    <div
                className="flex size-[30px] items-center justify-center bg-white text-[#00616A] transition hover:bg-white/80"
              >
                <FaXTwitter className="size-4" />
              </div>

                  <div
                className="flex size-[30px] items-center justify-center bg-white text-[#00616A] transition hover:bg-white/80"
              >
                <FaPinterestP className="size-4" />
              </div>

              <div
                
                className="flex size-[30px] items-center justify-center bg-white text-[#00616A] transition hover:bg-white/80"
              >
                <FaInstagram className="size-4" />
              </div>
                    <div
                className="flex size-[30px] items-center justify-center bg-white text-[#00616A] transition hover:bg-white/80"
              >
                <FaFacebook className="size-4" />
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="min-w-0">
            <h3 className="text-lg font-bold text-white">
              Quick Links
            </h3>

            <div className="relative mb-5 mt-2 h-px w-28 bg-white/70">
              <span className="absolute -left-0.5 -top-[3px] size-2 rounded-full bg-white" />
            </div>

            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/90 transition hover:text-white hover:underline"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Useful Links */}
          <div className="min-w-0">
            <h3 className="text-lg font-bold text-white">
              Useful Links
            </h3>

            <div className="relative mb-5 mt-2 h-px w-28 bg-white/70">
              <span className="absolute -left-0.5 -top-[3px] size-2 rounded-full bg-white" />
            </div>

            <ul className="space-y-2.5">
              {usefulLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/90 transition hover:text-white hover:underline"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Us */}
          <div className="min-w-0">
            <h3 className="text-lg font-bold text-white">
              Contact Us
            </h3>

            <div className="relative mb-5 mt-2 h-px w-28 bg-white/70">
              <span className="absolute -left-0.5 -top-[3px] size-2 rounded-full bg-white" />
            </div>

            <div className="space-y-5">
              <a
                href="tel:18555093791"
                className="flex items-start gap-3 text-sm text-white/90 transition hover:text-white"
              >
                <Phone className="mt-0.5 size-4 shrink-0 fill-white" />
                <span>1-855-509-3791</span>
              </a>

              <div
                className="flex items-start gap-3 text-sm text-white/90 transition hover:text-white"
              >
                <Mail className="mt-0.5 size-4 shrink-0  " />
                <span>support@skyflywithus.com</span>
              </div>

              <div className="flex items-start gap-3 text-sm leading-6 text-white/90">
                <MapPin className="mt-0.5 size-4 shrink-0" />
                <span>
                  1803 Hickory Avenue, Panama City, Florida 32405, United States
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 border-t border-white/60 pt-3">
          <p className="text-xs leading-5 text-white/90 sm:text-sm sm:leading-6">
            Disclaimer: The information provided on this website is for
            general informational purposes only. Flight policies,
            cancellation fees, change fees, and other airline rules may
            vary by airline and ticket type. Please confirm the applicable
            terms directly with your airline before making travel decisions.
          </p>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/10 bg-primary flex justify-center items-center">
        <p className="text-xs leading-5 text-white/85 sm:text-sm w-fit my-4">
          © {new Date().getFullYear()} SkyFlyWithUs. All rights reserved.
        </p>


      </div>
    </footer>
  );
}