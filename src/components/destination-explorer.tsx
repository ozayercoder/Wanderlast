"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CalendarDays, MapPin, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import { playfair } from "@/lib/fonts";

export type Destination = {
  _id: string;
  name: string;
  country: string;
  category: string;
  price: string;
  duration: string;
  departureDate: string;
  imageUrl: string;
  description: string;
};

type SortValue = "featured" | "price-asc" | "price-desc" | "name";

const rating = "4.5";

const filterClassName =
  "w-full [&_select]:h-12 [&_select]:w-full [&_select]:rounded-none [&_select]:border-0 [&_select]:bg-transparent [&_select]:pl-4 [&_select]:pr-10 [&_select]:text-sm [&_select]:font-medium [&_select]:uppercase [&_select]:tracking-wide focus-visible:[&_select]:ring-0";

function formatDuration(duration: string) {
  const days = Number(duration);

  if (!Number.isFinite(days) || duration.trim() === "") {
    return duration;
  }

  const nights = Math.max(days - 1, 1);
  return `${days} Days/${nights} Nights`;
}

function sortDestinations(destinations: Destination[], sort: SortValue) {
  const sorted = [...destinations];

  if (sort === "price-asc") {
    sorted.sort((a, b) => Number(a.price) - Number(b.price));
  } else if (sort === "price-desc") {
    sorted.sort((a, b) => Number(b.price) - Number(a.price));
  } else if (sort === "name") {
    sorted.sort((a, b) => a.name.localeCompare(b.name));
  }

  return sorted;
}

export function DestinationExplorer({
  destinations,
}: {
  destinations: Destination[];
}) {
  const [sort, setSort] = useState<SortValue>("featured");
  const sorted = sortDestinations(destinations, sort);

  return (
    <>
      {/* Static category / price selects — only sorting is wired up */}
      <div className="mt-8 grid grid-cols-1 divide-y divide-border rounded-md border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        <NativeSelect className={filterClassName} defaultValue="all">
          <NativeSelectOption value="all">Category</NativeSelectOption>
          <NativeSelectOption value="beach">Beach</NativeSelectOption>
          <NativeSelectOption value="mountain">Mountain</NativeSelectOption>
          <NativeSelectOption value="city">City</NativeSelectOption>
          <NativeSelectOption value="adventure">Adventure</NativeSelectOption>
          <NativeSelectOption value="cultural">Cultural</NativeSelectOption>
        </NativeSelect>

        <NativeSelect className={filterClassName} defaultValue="all">
          <NativeSelectOption value="all">Price Range</NativeSelectOption>
          <NativeSelectOption value="0-1000">$0 - $1000</NativeSelectOption>
          <NativeSelectOption value="1000-3000">$1000 - $3000</NativeSelectOption>
          <NativeSelectOption value="3000+">$3000+</NativeSelectOption>
        </NativeSelect>

        <NativeSelect
          className={filterClassName}
          value={sort}
          onChange={(event) => setSort(event.target.value as SortValue)}
        >
          <NativeSelectOption value="featured">Sort By</NativeSelectOption>
          <NativeSelectOption value="price-asc">
            Price: Low to High
          </NativeSelectOption>
          <NativeSelectOption value="price-desc">
            Price: High to Low
          </NativeSelectOption>
          <NativeSelectOption value="name">Name: A to Z</NativeSelectOption>
        </NativeSelect>
      </div>

      <p className="mt-3 text-sm text-muted-foreground">
        Showing {sorted.length} destinations
      </p>

      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {sorted.map((destination) => (
          <Card
            key={destination._id}
            className="group gap-4! overflow-hidden rounded-xl border border-border bg-card p-4! shadow-none ring-0! transition-shadow hover:shadow-md"
          >
            <div className="relative aspect-4/3 overflow-hidden rounded-xl bg-muted">
              {destination.imageUrl ? (
                <Image
                  src={destination.imageUrl}
                  alt={destination.name}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              ) : null}

              <Badge className="absolute top-3 right-3 h-7 gap-1 rounded-md bg-white px-2.5 text-sm font-semibold text-foreground shadow-sm">
                <Star className="fill-black text-black" />
                {rating}
              </Badge>
            </div>

            <CardContent className="flex flex-col gap-2 px-0">
              <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <MapPin className="size-4" />
                {destination.country}
              </p>

              <div className="flex items-baseline justify-between gap-3">
                <h2 className={`${playfair.className} text-xl font-semibold`}>
                  {destination.name}
                </h2>
                <p className="text-xl font-bold whitespace-nowrap">
                  ${destination.price}
                  <span className="text-xs font-normal text-muted-foreground">
                    /Person
                  </span>
                </p>
              </div>

              <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <CalendarDays className="size-4" />
                {formatDuration(destination.duration)}
              </p>

              <Link
                href={`/destinations/${destination._id}`}
                className={`${buttonVariants({
                  variant: "ghost",
                  size: "sm",
                })} mt-1 justify-start gap-1 px-0 text-sm font-bold tracking-wide text-blue-600 uppercase hover:bg-transparent hover:text-blue-700`}
              >
                Book Now
                <ArrowUpRight className="size-4" />
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
