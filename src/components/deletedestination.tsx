"use client";

import { useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { Trash2, TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "@/components/ui/toast";
import type { Destination } from "@/components/Editdestination";

export function DeleteDestination({
  destination,
  children,
}: {
  destination: Destination;
  children: ReactNode;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  async function handleDelete() {
    try {
      const res = await fetch(
        `http://localhost:5000/destinations/${destination._id}`,
        {
          method: "DELETE",
        },
      );

      if (!res.ok) {
        throw new Error("Delete failed");
      }

      toast.add({
        type: "success",
        title: "Travel package deleted",
        description: `${destination.name} has been deleted successfully.`,
      });

      setOpen(false);
      router.push("/destinations");
      router.refresh();
    } catch {
      toast.add({
        type: "error",
        title: "Delete failed",
        description: "Could not delete the travel package. Please try again.",
      });
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger
        render={
          <Button
            variant="outline"
            size="lg"
            className="border-red-200 px-3 text-red-500 hover:bg-red-50 hover:text-red-600"
          />
        }
      >
        {children}
      </AlertDialogTrigger>

      <AlertDialogContent className="sm:max-w-lg">
        <AlertDialogHeader>
          <AlertDialogMedia className="rounded-full bg-red-100 text-red-500">
            <TriangleAlert />
          </AlertDialogMedia>
          <AlertDialogTitle>Delete Travel Package</AlertDialogTitle>
        </AlertDialogHeader>

        <AlertDialogDescription>
          Are you sure you want to delete{" "}
          <strong className="font-semibold text-foreground">
            &quot;{destination.name}&quot;
          </strong>
          ? This action cannot be undone and will permanently remove this
          travel package from the system.
        </AlertDialogDescription>

        <AlertDialogFooter className="border-transparent bg-transparent">
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="bg-red-500 text-white hover:bg-red-600"
          >
            <Trash2 className="size-4" />
            Delete Package
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
