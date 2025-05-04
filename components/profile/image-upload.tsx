"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload, X } from "lucide-react";

interface ImageUploadProps {
  value: string | undefined;
  onChange: (url: string) => void;
}

export function ImageUpload({ value, onChange }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    // In a real app, you would upload the file to your server or a storage service
    // For this example, we'll simulate an upload and use a placeholder
    setTimeout(() => {
      // Generate a random placeholder with the file dimensions
      const url = `/placeholder.svg?height=128&width=128&text=${encodeURIComponent(file.name)}`;
      onChange(url);
      setIsUploading(false);
    }, 1500);
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
