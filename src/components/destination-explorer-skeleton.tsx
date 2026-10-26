import { Skeleton } from "@/components/ui/skeleton";

function DestinationCardSkeleton() {
  return (
    <div className="flex flex-col gap-4 rounded-xl border border-border bg-card p-4">
      <Skeleton className="aspect-4/3 w-full rounded-xl" />
      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-24" />
        <div className="flex items-baseline justify-between gap-3">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-5 w-20" />
        </div>
        <Skeleton className="h-4 w-28" />
        <Skeleton className="mt-1 h-4 w-24" />
      </div>
    </div>
  );
}

export function DestinationExplorerSkeleton() {
  return (
    <>
      <div className="mt-8 grid grid-cols-1 divide-y divide-border rounded-md border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        <Skeleton className="h-12 w-full rounded-none" />
        <Skeleton className="h-12 w-full rounded-none" />
        <Skeleton className="h-12 w-full rounded-none" />
      </div>

      <Skeleton className="mt-4 h-4 w-40" />

      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <DestinationCardSkeleton key={index} />
        ))}
      </div>
    </>
  );
}
