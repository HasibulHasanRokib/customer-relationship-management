"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import { PlusCircle } from "lucide-react";
import { Alert, AlertDescription } from "../ui/alert";
import { Input } from "../ui/input";
import { contactSchema } from "@/lib/zod";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Spinner } from "../spinner";
import { createContact } from "@/actions/contacts";
import { CustomField } from "@prisma/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export function AddContactForm({
  customFields,
}: {
  customFields: CustomField[];
}) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      company: "",
      customFields: {},
    },
  });

  const onSubmit = (values: z.infer<typeof contactSchema>) => {
    setError("");

    const { customFields: customFieldValues, ...contactData } = values;

    const customFieldsArray = Object.entries(customFieldValues).map(
      ([customFieldId, value]) => ({
        customFieldId,
        value: String(value),
      }),
    );

    startTransition(async () => {
      const response = await createContact({
        values,
        customFields: customFieldsArray,
      });
      if (response.error) {
        setError(response.error);
      } else {
        toast("Contact created", {
          description: "Your contact was successfully created.",
        });
        form.reset();

        setError("");
      }
    });
  };

  return (
    <>
      <Dialog
        open={open}
        onOpenChange={(isOpen) => {
          setOpen(isOpen);
          if (!isOpen) form.reset();
        }}
      >
        <DialogTrigger asChild>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Contact
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Contact</DialogTitle>
            <DialogDescription>
              Fill in the details to add a new contact to your CRM.
            </DialogDescription>
          </DialogHeader>
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John" {...field} name="firstName" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Doe" {...field} name="lastName" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="john@example.com"
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input {...field} value={field.value || ""} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company</FormLabel>
                    <FormControl>
                      <Input {...field} value={field.value || ""} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Dynamic Custom Fields */}
              {customFields.map((field) => {
                const fieldName = `customFields.${field.id}` as const;

                if (field.type === "DROPDOWN") {
                  const options = (field.options ?? "")
                    .toString()
                    .split(",")
                    .map((opt: string) => opt.trim())
                    .filter(Boolean);

                  return (
                    <FormField
                      key={field.id}
                      control={form.control}
                      name={fieldName}
                      render={({ field: f }) => (
                        <FormItem>
                          <FormLabel className="capitalize">
                            {field.name}
                          </FormLabel>
                          <Select onValueChange={f.onChange} value={f.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue
                                  placeholder={`Select ${field.name}`}
                                />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {options.map((opt: string) => (
                                <SelectItem
                                  className="capitalize"
                                  key={opt}
                                  value={opt}
                                >
                                  {opt}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  );
                }

                return (
                  <FormField
                    key={field.id}
                    control={form.control}
                    name={fieldName}
                    render={({ field: f }) => (
                      <FormItem>
                        <FormLabel className="capitalize">
                          {field.name}
                        </FormLabel>
                        <FormControl>
                          <Input {...f} required={field.required} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                );
              })}

              <DialogFooter>
                <Button type="submit" disabled={isPending}>
                  {isPending ? <Spinner /> : "Add Contact"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
