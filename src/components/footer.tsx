import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { SVGProps } from "react";
import { playfair } from "@/lib/fonts";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Destinations", href: "#" },
  { label: "My Bookings", href: "#" },
  { label: "My Profile", href: "#" },
];

const supportLinks = [
  { label: "Help Center", href: "#" },
  { label: "Terms of Service", href: "#" },
  { label: "Privacy Policy", href: "#" },
];

// lucide-react no longer ships brand icons, so they are inline here.
function XIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M18.9 1.15h3.68l-8.04 9.19 9.46 12.51h-7.41l-5.8-7.58-6.64 7.58H.47l8.6-9.83L0 1.15h7.59l5.24 6.93 6.07-6.93Zm-1.29 19.5h2.04L6.49 3.24H4.3l13.31 17.4Z" />
    </svg>
  );
}

function LinkedInIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.55V9h3.57v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
    </svg>
  );
}

function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

const socials = [
  { label: "X (Twitter)", href: "#", Icon: XIcon },
  { label: "LinkedIn", href: "#", Icon: LinkedInIcon },
  { label: "Instagram", href: "#", Icon: InstagramIcon },
];

export function Footer() {
  return (
    <footer className="bg-neutral-950 text-white">
      <div className="mx-auto max-w-[1256px] px-6 pb-8 pt-20">
        <h2 className={`${playfair.className} text-6xl leading-none font-bold lg:text-7xl`}>
          Wanderlast
        </h2>
        <p className="mt-4 text-[15px] text-neutral-400">
          Your gateway to extraordinary travel experiences around the world.
        </p>

        <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_0.8fr]">
          <div>
            <h3 className="text-sm font-medium tracking-wider uppercase">
              Newsletter
            </h3>
            <p className="mt-3 text-[13px] text-neutral-400">
              Subscribe for exclusive travel deals and inspiration.
            </p>
            <div className="relative mt-4 max-w-[255px]">
              <input
                type="email"
                placeholder="Enter email"
                aria-label="Email address"
                className="h-11 w-full rounded-sm bg-neutral-800 px-4 text-sm text-white placeholder:text-neutral-400 focus:outline-2 focus:outline-offset-2 focus:outline-brand"
              />
              <button
                type="button"
                aria-label="Subscribe"
                className="absolute inset-y-0 right-0 flex w-10 items-center justify-center text-white hover:text-brand"
              >
                <ArrowUpRight className="size-4" />
              </button>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium tracking-wider uppercase">
              Quick Links
            </h3>
            <ul className="mt-4 flex flex-col gap-2.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[15px] text-neutral-400 hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-medium tracking-wider uppercase">
              Support
            </h3>
            <ul className="mt-4 flex flex-col gap-2.5">
              {supportLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[15px] text-neutral-400 hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-medium tracking-wider uppercase">
              Contact Us
            </h3>
            <ul className="mt-4 flex flex-col gap-2.5 text-[15px] text-neutral-400">
              <li>
                <a href="tel:+17869011622" className="hover:text-white">
                  786 901 1622
                </a>
              </li>
              <li>
                <a href="mailto:info@wandarland.com" className="hover:text-white">
                  info@wandarland.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-neutral-800 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-neutral-400">
            © 2026 Wanderlust. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {socials.map(({ label, href, Icon }) => (
              <Link key={label} href={href} aria-label={label}>
                <Icon className="size-5 hover:text-brand" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
