import { Suspense } from "react";
import { DestinationExplorerSkeleton } from "@/components/destination-explorer-skeleton";
import { playfair } from "@/lib/fonts";
import { DestinationList } from "./destination-list";

export default function DestinationPage() {
  return (
    <div className="mx-auto w-full max-w-[1256px] px-6 py-12">
      <h1 className={`${playfair.className} text-4xl font-medium md:text-5xl`}>
        Explore All Destinations
      </h1>
      <p className="mt-2 text-muted-foreground">
        Find your perfect travel experience from our curated collection
      </p>

      <Suspense fallback={<DestinationExplorerSkeleton />}>
        <DestinationList />
      </Suspense>
    </div>
  );
}
