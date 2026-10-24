"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, User, X } from "lucide-react";

const links = [
  { label: "Home", href: "/" },
  { label: "Destinations", href: "#" },
  { label: "My Bookings", href: "#" },
  { label: "Admin", href: "#" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const closeMenu = () => setOpen(false);

  return (
    <nav className="relative z-20 flex h-14 items-center justify-between bg-white px-4 sm:px-6">
      <div className="flex items-center">
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="-ml-2 p-2 lg:hidden"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>

        <ul className="hidden items-center gap-4 text-sm sm:gap-7 lg:flex">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className={
                    active
                      ? "underline underline-offset-4"
                      : "hover:underline underline-offset-4"
                  }
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <Link
        href="/"
        className="absolute left-1/2 -translate-x-1/2"
        aria-label="Wanderlast home"
      >
        <Image
          src="/images/Wanderlast.png"
          alt="Wanderlast"
          width={162}
          height={24}
          className="h-5 w-auto sm:h-6"
          priority
        />
      </Link>

      <div className="flex items-center gap-4 text-sm sm:gap-6">
        <Link
          href="#"
          className="hidden items-center gap-1.5 hover:opacity-70 lg:flex"
        >
          <User className="size-4" />
          Profile
        </Link>
        <Link href="#" className="hidden hover:opacity-70 lg:flex">
          Login
        </Link>
        <Link href="#" className="font-bold hover:opacity-70">
          Sign Up
        </Link>
      </div>

      {open && (
        <div
          id="mobile-menu"
          className="absolute top-full right-0 left-0 border-t border-neutral-200 bg-white shadow-lg lg:hidden"
        >
          <ul className="flex flex-col gap-1 px-4 py-4 text-sm">
            {links.map((link) => {
              const active = pathname === link.href;
              return (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    onClick={closeMenu}
                    className={`block rounded-md px-2 py-2.5 hover:bg-neutral-100 ${
                      active ? "bg-neutral-100 font-medium" : ""
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
            <li className="my-1 border-t border-neutral-200" />
            <li>
              <Link
                href="#"
                onClick={closeMenu}
                className="flex items-center gap-2 rounded-md px-2 py-2.5 hover:bg-neutral-100"
              >
                <User className="size-4" />
                Profile
              </Link>
            </li>
            <li>
              <Link
                href="#"
                onClick={closeMenu}
                className="block rounded-md px-2 py-2.5 hover:bg-neutral-100"
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                href="#"
                onClick={closeMenu}
                className="block rounded-md px-2 py-2.5 font-bold hover:bg-neutral-100"
              >
                Sign Up
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
