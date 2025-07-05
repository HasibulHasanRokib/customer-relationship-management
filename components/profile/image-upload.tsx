"use client";

import type React from "react";
import { Button } from "@/components/ui/button";
import { Upload, X } from "lucide-react";
import { useUploadThing } from "@/lib/uploadthing";
import { toast } from "sonner";

interface ImageUploadProps {
  value: string | undefined;
  onChange: (url: string) => void;
}

export function ImageUpload({ value, onChange }: ImageUploadProps) {
  const { startUpload, isUploading } = useUploadThing("profileUploader");

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const uploaded = await startUpload([file]);
    if (!uploaded || uploaded.length === 0) {
      toast("Error message", { description: "Upload failed." });
      return;
    }
    onChange(uploaded[0].ufsUrl);
  };

  const handleRemove = () => {
    onChange("");
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => document.getElementById("image-upload")?.click()}
          disabled={isUploading}
        >
          <Upload className="mr-2 h-4 w-4" />
          {value ? "Change Image" : "Upload Image"}
        </Button>
        {value && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleRemove}
            className="text-destructive"
          >
            <X className="mr-2 h-4 w-4" />
            Remove
          </Button>
        )}
      </div>
      <input
        id="image-upload"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleUpload}
        disabled={isUploading}
      />
      {isUploading && (
        <p className="text-muted-foreground text-sm">Uploading...</p>
      )}
    </div>
  );
}
