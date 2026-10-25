import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  MapPin,
  Pencil,
  Star,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { EditDestination, type Destination } from "@/components/Editdestination";
import { DeleteDestination } from "@/components/deletedestination";
import { playfair } from "@/lib/fonts";

const rating = "4.5";
const reviews = "234";

const perks = [
  "Free cancellation up to 7 days",
  "Travel insurance included",
  "24/7 customer support",
];

function formatDuration(duration: string) {
  const days = Number(duration);

  if (!Number.isFinite(days) || duration.trim() === "") {
    return duration;
  }

  const nights = Math.max(days - 1, 1);
  return `${days} Days / ${nights} Nights`;
}

function formatDepartureDate(departureDate: string) {
  const [year, month, day] = departureDate.split("-");

  if (!year || !month || !day) {
    return departureDate;
  }

  return `${month}/${day}/${year}`;
}

export default async function DestinationDetailsPage({
  params,
}: PageProps<"/destinations/[id]">) {
  const { id } = await params;
  const res = await fetch(`http://localhost:5000/destinations/${id}`);

  if (!res.ok) {
    notFound();
  }

  const data: Destination = await res.json();

  if (!data?._id) {
    notFound();
  }

  const highlights = [
    `${formatDuration(data.duration)} itinerary`,
    `${data.category} travel package`,
    `Departs ${formatDepartureDate(data.departureDate)}`,
    `From $${data.price} per person`,
  ];

  return (
    <div className="mx-auto w-full max-w-[1256px] px-6 py-12">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Link
          href="/destinations"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back to Destinations
        </Link>

        <div className="flex items-center gap-3">
          <EditDestination destination={data}>
            <Pencil className="size-4" />
            Edit
          </EditDestination>
          <DeleteDestination destination={data}>
            <Trash2 className="size-4" />
            Delete
          </DeleteDestination>
        </div>
      </div>

      <div className="relative mt-6 aspect-[4/3] overflow-hidden rounded-xl bg-muted md:aspect-[16/6]">
        {data.imageUrl ? (
          <Image
            src={data.imageUrl}
            alt={data.name}
            fill
            sizes="(min-width: 1256px) 1256px, 100vw"
            className="object-cover"
          />
        ) : null}
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        <div className="flex flex-col gap-6 lg:col-span-2">
          <div>
            <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin className="size-4" />
              {data.country}
            </p>

            <h1 className={`${playfair.className} mt-1 text-4xl font-medium`}>
              {data.name}
            </h1>

            <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
              <span className="flex items-center gap-1.5">
                <Star className="size-4 fill-green-600 text-green-600" />
                <span className="font-medium">{rating}</span>
                <span className="text-muted-foreground">({reviews} reviews)</span>
              </span>

              <span className="flex items-center gap-1.5 text-muted-foreground">
                <CalendarDays className="size-4" />
                {formatDuration(data.duration)}
              </span>
            </div>
          </div>

          <section>
            <h2 className={`${playfair.className} text-2xl font-medium`}>
              Overview
            </h2>
            <p className="mt-2 leading-relaxed text-muted-foreground">
              {data.description}
            </p>
          </section>

          <section>
            <h2 className={`${playfair.className} text-2xl font-medium`}>
              Highlights
            </h2>
            <ul className="mt-3 grid gap-3 sm:grid-cols-2">
              {highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="flex items-start gap-2 text-sm text-muted-foreground"
                >
                  <Check className="mt-0.5 size-4 shrink-0 text-green-600" />
                  {highlight}
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Booking Card */}

        <Card className="h-fit gap-4 p-6!">
          <div>
            <p className="text-sm text-muted-foreground">Starting from</p>
            <p className="text-3xl font-bold text-brand">${data.price}</p>
            <p className="text-xs text-muted-foreground">per person</p>
          </div>

          <div className="rounded-md bg-muted px-4 py-2.5 text-sm">
            {formatDepartureDate(data.departureDate)}
          </div>

          <Button className="h-10 w-full bg-brand! text-white! hover:bg-brand/90">
            Book Now
            <ArrowRight className="size-4" />
          </Button>

          <ul className="flex flex-col gap-2.5">
            {perks.map((perk) => (
              <li
                key={perk}
                className="flex items-start gap-2 text-sm text-muted-foreground"
              >
                <Check className="mt-0.5 size-4 shrink-0 text-green-600" />
                {perk}
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}
