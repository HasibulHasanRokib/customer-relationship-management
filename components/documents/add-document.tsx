"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { PlusCircle } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { documentsSchema } from "@/lib/zod";
import { useUploadThing } from "@/lib/uploadthing";
import { Alert, AlertDescription } from "../ui/alert";
import { Spinner } from "../spinner";
import { uploadDocument } from "@/actions/documents";
import { toast } from "sonner";

export function AddDocument() {
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const form = useForm<z.infer<typeof documentsSchema>>({
    resolver: zodResolver(documentsSchema),
    defaultValues: {
      name: "",
      relatedTo: "",
      relatedType: "",
      tags: "",
      file: "",
    },
  });

  const [isPending, startTransition] = useTransition();
  const { startUpload } = useUploadThing("documentUploader");

  const onSubmit = async (values: z.infer<typeof documentsSchema>) => {
    const file = values.file?.[0];

    setIsUploading(true);
    setError(null);

    try {
      const uploaded = await startUpload([file]);
      if (!uploaded || uploaded.length === 0) {
        setError("Upload failed.");
        return;
      }

      const docData = {
        name: values.name || file.name,
        type: file.name.split(".").pop().toUpperCase(),
        size: formatFileSize(uploaded[0].size),
        relatedTo: values.relatedTo || "",
        relatedType: values.relatedType || "",
        tags: values.tags,
        url: uploaded[0].ufsUrl,
      };

      startTransition(async () => {
        const result = await uploadDocument(docData);
        if (result.error) {
          setError(result.error);
        } else {
          toast("Document uploaded", {
            description: "Your file was successfully uploaded.",
          });
          form.reset();
        }
      });
    } catch (err) {
      console.log(err);
      setError("Unexpected error occurred.");
    } finally {
      setIsUploading(false);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return (
      Number.parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i]
    );
  };

  return (
    <div>
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
            Upload Document
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload Document</DialogTitle>
            <DialogDescription>
              Upload a document and associate it with a record in your CRM.
            </DialogDescription>
          </DialogHeader>
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="file"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>File</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        onChange={(e) => {
                          const files = e.target.files
                            ? Array.from(e.target.files)
                            : null;
                          field.onChange(files);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Document Name (Optional)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Leave blank to use filename"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="relatedType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Related To</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select record type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Contact">Contact</SelectItem>
                          <SelectItem value="Company">Company</SelectItem>
                          <SelectItem value="Opportunity">
                            Opportunity
                          </SelectItem>
                          <SelectItem value="Campaign">Campaign</SelectItem>
                          <SelectItem value="Event">Event</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="relatedTo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Record Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., ABC Corporation" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tags (comma separated)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., proposal, sales, contract"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button disabled={isUploading || isPending}>
                  {isUploading || isPending ? <Spinner /> : "Upload"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
