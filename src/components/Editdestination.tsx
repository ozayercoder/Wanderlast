"use client";

import { useState, type ChangeEvent, type FormEvent, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { Save, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/toast";

const categories = ["Beach", "Mountain", "City", "Adventure", "Cultural"];

const inputClassName = "h-9 rounded-md bg-muted/50";

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

type FormState = Omit<Destination, "_id">;

export function EditDestination({
  destination,
  children,
}: {
  destination: Destination;
  children: ReactNode;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<FormState>({
    name: destination.name,
    country: destination.country,
    category: destination.category,
    price: destination.price,
    duration: destination.duration,
    departureDate: destination.departureDate,
    imageUrl: destination.imageUrl,
    description: destination.description,
  });

  const handleChange =
    (field: keyof FormState) =>
    (
      event: ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >,
    ) =>
      setForm((prev) => ({ ...prev, [field]: event.target.value }));

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const res = await fetch(
        `http://localhost:5000/destinations/${destination._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        },
      );

      if (!res.ok) {
        throw new Error("Update failed");
      }

      toast.add({
        type: "success",
        title: "Travel package updated",
        description: `${form.name} has been updated successfully.`,
      });

      setOpen(false);
      router.refresh();
    } catch {
      toast.add({
        type: "error",
        title: "Update failed",
        description: "Could not update the travel package. Please try again.",
      });
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={<Button variant="outline" size="lg" className="px-3" />}
      >
        {children}
      </DialogTrigger>

      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Update Travel Package</DialogTitle>
          <DialogDescription>
            Make changes to the travel package details below
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <Input
            aria-label="Destination Name"
            placeholder="Bali Paradise"
            value={form.name}
            onChange={handleChange("name")}
            className={inputClassName}
          />

          <div className="grid gap-4 sm:grid-cols-2">
            <Field>
              <FieldLabel htmlFor="edit-country">Country</FieldLabel>
              <Input
                id="edit-country"
                placeholder="Indonesia"
                value={form.country}
                onChange={handleChange("country")}
                className={inputClassName}
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="edit-category">Category</FieldLabel>
              <NativeSelect
                id="edit-category"
                value={form.category}
                onChange={handleChange("category")}
                className="w-full [&_select]:h-9 [&_select]:rounded-md [&_select]:bg-muted/50"
              >
                <NativeSelectOption value="" disabled>
                  Select category
                </NativeSelectOption>
                {categories.map((category) => (
                  <NativeSelectOption key={category} value={category}>
                    {category}
                  </NativeSelectOption>
                ))}
              </NativeSelect>
            </Field>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field>
              <FieldLabel htmlFor="edit-price">Price (USD)</FieldLabel>
              <Input
                id="edit-price"
                type="number"
                min="0"
                placeholder="e.g., 1299"
                value={form.price}
                onChange={handleChange("price")}
                className={inputClassName}
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="edit-duration">Duration</FieldLabel>
              <Input
                id="edit-duration"
                placeholder="e.g., 7 Days/6 Nights"
                value={form.duration}
                onChange={handleChange("duration")}
                className={inputClassName}
              />
            </Field>
          </div>

          <Field>
            <FieldLabel htmlFor="edit-departure-date">
              Departure Date
            </FieldLabel>
            <Input
              id="edit-departure-date"
              type="date"
              value={form.departureDate}
              onChange={handleChange("departureDate")}
              className={inputClassName}
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="edit-image-url">Image URL</FieldLabel>
            <Input
              id="edit-image-url"
              type="url"
              placeholder="https://example.com/image.jpg"
              value={form.imageUrl}
              onChange={handleChange("imageUrl")}
              className={inputClassName}
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="edit-description">Description</FieldLabel>
            <Textarea
              id="edit-description"
              placeholder="Describe the travel experience..."
              value={form.description}
              onChange={handleChange("description")}
              className="min-h-[120px] rounded-md bg-muted/50"
            />
          </Field>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={() => setOpen(false)}
              className="border-red-200 px-4 text-red-500 hover:bg-red-50 hover:text-red-600"
            >
              <Trash2 className="size-4" />
              Cancel
            </Button>
            <Button
              type="submit"
              size="lg"
              className="bg-brand px-4 text-white hover:bg-brand/90"
            >
              <Save className="size-4" />
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
