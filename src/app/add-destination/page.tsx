"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { Save, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import { Textarea } from "@/components/ui/textarea";
import { playfair } from "@/lib/fonts";
import { toast } from "@/components/ui/toast";

const categories = ["Beach", "Mountain", "City", "Adventure", "Cultural"];

const inputClassName = "h-9 rounded-md bg-muted/50";

const initialForm = {
  name: "",
  country: "",
  category: "",
  price: "",
  duration: "",
  departureDate: "",
  imageUrl: "",
  description: "",
};

type FormState = typeof initialForm;

export default function AddDestinationPage() {
  const [form, setForm] = useState<FormState>(initialForm);

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
    const res = await fetch("http://localhost:5000/add-destination", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (res.ok) {
      toast.add({
        type: "success",
        title: "Travel package added",
        description:
          data?.message ?? `${form.name} has been added successfully.`,
      });
    }

    setForm(initialForm);
  }

  return (
    <div className="mx-auto w-full max-w-[1256px] px-6 py-12">
      <h1 className={`${playfair.className} text-3xl md:text-4xl`}>
        Add New Travel Package
      </h1>

      <Card className="mx-auto mt-12 w-full max-w-[560px] gap-0 p-6 shadow-sm">
        <CardContent className="px-0">
          <form onSubmit={onSubmit} className="flex flex-col gap-4">
            <Field>
              <FieldLabel htmlFor="name">Destination Name</FieldLabel>
              <Input
                id="name"
                placeholder="Bali Paradise"
                value={form.name}
                onChange={handleChange("name")}
                className={inputClassName}
              />
            </Field>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="country">Country</FieldLabel>
                <Input
                  id="country"
                  placeholder="Indonesia"
                  value={form.country}
                  onChange={handleChange("country")}
                  className={inputClassName}
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="category">Category</FieldLabel>
                <NativeSelect
                  id="category"
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
                <FieldLabel htmlFor="price">Price (USD)</FieldLabel>
                <Input
                  id="price"
                  type="number"
                  min="0"
                  placeholder="e.g. 1299"
                  value={form.price}
                  onChange={handleChange("price")}
                  className={inputClassName}
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="duration">Duration</FieldLabel>
                <Input
                  id="duration"
                  placeholder="e.g. 7 Days/6 Nights"
                  value={form.duration}
                  onChange={handleChange("duration")}
                  className={inputClassName}
                />
              </Field>
            </div>

            <Field>
              <FieldLabel htmlFor="departure-date">Departure Date</FieldLabel>
              <Input
                id="departure-date"
                type="date"
                value={form.departureDate}
                onChange={handleChange("departureDate")}
                className={inputClassName}
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="image-url">Image URL</FieldLabel>
              <Input
                id="image-url"
                type="url"
                placeholder="https://example.com/image.jpg"
                value={form.imageUrl}
                onChange={handleChange("imageUrl")}
                className={inputClassName}
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="description">Description</FieldLabel>
              <Textarea
                id="description"
                placeholder="Describe the travel experience..."
                value={form.description}
                onChange={handleChange("description")}
                className="min-h-[120px] rounded-md bg-muted/50"
              />
            </Field>

            <div className="mt-2 flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={() => setForm(initialForm)}
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
                Add Travel Package
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
