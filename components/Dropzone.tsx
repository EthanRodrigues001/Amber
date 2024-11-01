"use client";

import React, { useCallback, useRef, useState } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import { Loader2, X } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { pinata } from "@/lib/config";
import { deleteImage } from "@/app/actions";

const mainVariant = {
  initial: {
    x: 0,
    y: 0,
  },
  animate: {
    x: 20,
    y: -20,
    opacity: 0.9,
  },
};

const secondaryVariant = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
};

export function FileUpload() {
  const [files, setFiles] = useState<
    Array<{ file: File; uploading: boolean; id?: string }>
  >([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadFile = async (file: File) => {
    try {
      setFiles((prevFiles) =>
        prevFiles.map((f) => (f.file === file ? { ...f, uploading: true } : f))
      );

      const keyRequest = await fetch("/api/key");
      const keyData = await keyRequest.json();

      const upload = await pinata.upload.file(file).key(keyData.JWT);

      setFiles((prevFiles) =>
        prevFiles.map((f) =>
          f.file === file ? { ...f, uploading: false, id: upload.id } : f
        )
      );

      toast.success(`File ${file.name} uploaded successfully`);
    } catch (error) {
      console.log(error);

      setFiles((prevFiles) =>
        prevFiles.map((f) => (f.file === file ? { ...f, uploading: false } : f))
      );

      toast.error("Something went wrong");
    }
  };

  const removeFile = async (fileId: string, fileName: string) => {
    if (fileId) {
      const result = await deleteImage(fileId);

      if (result.success) {
        setFiles((prevFiles) => prevFiles.filter((f) => f.id !== fileId));
        toast.success(`File ${fileName} deleted successfully`);
      } else {
        toast.error("Error deleting File...");
      }
    }
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length) {
      setFiles((prevFiles) => [
        ...prevFiles,
        ...acceptedFiles.map((file) => ({ file, uploading: false })),
      ]);

      acceptedFiles.forEach(uploadFile);
    }
  }, []);

  const rejectedFiles = useCallback((fileRejections: FileRejection[]) => {
    if (fileRejections.length) {
      const tooManyFiles = fileRejections.find(
        (rejection) => rejection.errors[0].code === "too-many-files"
      );

      const fileSizeTooBig = fileRejections.find(
        (rejection) => rejection.errors[0].code === "file-too-large"
      );

      if (tooManyFiles) {
        toast.error("Too many files selected, max is 5");
      }

      if (fileSizeTooBig) {
        toast.error("File size exceeds 5mb limit");
      }
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    onDropRejected: rejectedFiles,
    maxFiles: 5,
    maxSize: 1024 * 1024 * 5, // 5mb
    accept: {
      "image/*": [],
    },
  });

  return (
    <>
      <div
        {...getRootProps()}
        className="p-16 mt-10 border-dashed rounded-lg border-2 w-full cursor-pointer"
      >
        <input {...getInputProps()} ref={fileInputRef} className="hidden" />
        {isDragActive ? (
          <p className="text-center">Drop the files here ...</p>
        ) : (
          <div className="flex flex-col items-center gap-y-3">
            <p>Drag 'n' drop some files here, or click to select files</p>
            <Button>Select Files</Button>
          </div>
        )}
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4">
        {files.map(({ file, uploading, id }) => (
          <div key={file.name} className="relative w-full group">
            <div className="relative">
              <Image
                src={URL.createObjectURL(file)}
                alt={file.name}
                width={200}
                height={200}
                className={cn(
                  uploading ? "opacity-50" : "",
                  "rounded-lg object-cover size-32"
                )}
              />

              {uploading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Loader2 className="size-8 animate-spin text-primary" />
                </div>
              )}
            </div>

            <form
              action={() => removeFile(id!, file.name)}
              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Button
                type="submit"
                variant="destructive"
                size="icon"
                className="rounded-full"
              >
                <X className="h-4 w-4" />
              </Button>
            </form>

            <p className="mt-2 text-sm text-gray-500 truncate">{file.name}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export function GridPattern() {
  const columns = 41;
  const rows = 11;
  return (
    <div className="flex bg-gray-100 dark:bg-neutral-900 flex-shrink-0 flex-wrap justify-center items-center gap-x-px gap-y-px scale-105">
      {Array.from({ length: rows }).map((_, row) =>
        Array.from({ length: columns }).map((_, col) => {
          const index = row * columns + col;
          return (
            <div
              key={`${col}-${row}`}
              className={`w-10 h-10 flex flex-shrink-0 rounded-[2px] ${
                index % 2 === 0
                  ? "bg-gray-50 dark:bg-neutral-950"
                  : "bg-gray-50 dark:bg-neutral-950 shadow-[0px_0px_1px_3px_rgba(255,255,255,1)_inset] dark:shadow-[0px_0px_1px_3px_rgba(0,0,0,1)_inset]"
              }`}
            />
          );
        })
      )}
    </div>
  );
}
