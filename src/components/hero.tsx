import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { playfair } from "@/lib/fonts";

const searchFields = [
  { label: "Location", placeholder: "Address, City Or Zip" },
  { label: "Date/Duration", placeholder: "Anytime/3 Days" },
  { label: "Budget", placeholder: "$0-$3000" },
  { label: "People", placeholder: "5-10" },
];

export function Hero() {
  return (
    <section className="relative flex min-h-[calc(100svh-3.5rem)] flex-col">
      <Image
        src="/images/Banner.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/20" />

      <div className="relative flex flex-1 flex-col items-center justify-center px-4 text-center">
        <h1
          className={`${playfair.className} font-medium text-5xl leading-[1.1] text-white sm:text-6xl lg:text-7xl`}
        >
          Discover Your
          <br />
          Next Adventure
        </h1>
        <p className="mt-6 max-w-lg text-sm text-white sm:text-base">
          Explore breathtaking destinations and create unforgettable memories
          with our curated travel experiences.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="#"
            className="inline-flex h-11 items-center gap-2 rounded-sm bg-brand px-8 text-sm font-semibold tracking-wide text-white uppercase hover:bg-brand/90"
          >
            Explore Now
            <ArrowRight className="size-4" />
          </Link>
          <Link
            href="/destinations"
            className="inline-flex h-10 items-center rounded-sm bg-white/50 px-6 text-sm font-semibold tracking-wide text-white uppercase hover:bg-white/60"
          >
            View Destination
          </Link>
        </div>
      </div>

      <div className="relative grid grid-cols-2 divide-x divide-white/20 border-t border-white/10 bg-white/10 backdrop-blur-sm md:grid-cols-5">
        {searchFields.map((field) => (
          <div key={field.label} className="px-5 py-2.5">
            <p className="text-sm font-semibold text-white">{field.label}</p>
            <p className="text-xs text-white/80">{field.placeholder}</p>
          </div>
        ))}
        <button
          type="button"
          className="col-span-2 flex min-h-12 items-center justify-center bg-brand px-5 font-semibold text-white hover:bg-brand/90 md:col-span-1 md:min-h-0"
        >
          Search
        </button>
      </div>
    </section>
  );
}
