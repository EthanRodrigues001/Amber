"use client";

import React, { useCallback, useState } from "react";
import { motion } from "framer-motion";
import { FileRejection, useDropzone } from "react-dropzone";
import { Loader2, Upload, X } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { pinata } from "@/lib/config";
import { deleteImage } from "@/app/actions";

const mainVariant = {
  initial: { x: 0, y: 0 },
  animate: { x: 20, y: -20, opacity: 0.9 },
};

const secondaryVariant = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
};

export const FileUpload = ({}: //   onChange,
{
  onChange?: (files: File[]) => void;
}) => {
  const [files, setFiles] = useState<
    Array<{ file: File; uploading: boolean; id?: string }>
  >([]);

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
      console.error(error);
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
        console.log("Too many files selected, max is 5");
      }

      if (fileSizeTooBig) {
        toast.error("File size exceeds 5mb limit");
        console.log("File size exceeds 5mb limit");
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
    <div className="w-full" {...getRootProps()}>
      <motion.div
        whileHover="animate"
        className="p-10 group/file block rounded-lg cursor-pointer w-full relative overflow-hidden"
      >
        <input
          {...getInputProps()}
          id="file-upload-handle"
          className="hidden"
        />
        <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]"></div>
        <div className="flex flex-col items-center justify-center">
          <p className="relative z-20 font-sans font-bold text-neutral-700 dark:text-neutral-300 text-base">
            Upload image
          </p>
          <p className="relative z-20 font-sans font-normal text-neutral-400 dark:text-neutral-400 text-base mt-2">
            Drag or drop your image here or click to upload
          </p>
          <div className="relative w-full mt-10 max-w-xl mx-auto">
            {files.length > 0 ? (
              files.map(({ file, uploading, id }, idx) => (
                <motion.div
                  key={"file" + idx}
                  layoutId={idx === 0 ? "file-upload" : "file-upload-" + idx}
                  className={cn(
                    "relative overflow-hidden z-40 bg-white dark:bg-neutral-900 flex flex-col items-start justify-start p-4 mt-4 w-full mx-auto rounded-md",
                    "shadow-sm"
                  )}
                >
                  <div className="flex justify-between w-full items-center gap-4">
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      layout
                      className="text-base text-neutral-700 dark:text-neutral-300 truncate max-w-xs"
                    >
                      {file.name}
                    </motion.p>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      layout
                      className="rounded-lg px-2 py-1 w-fit flex-shrink-0 text-sm text-neutral-600 dark:bg-neutral-800 dark:text-white shadow-input"
                    >
                      {(file.size / (1024 * 1024)).toFixed(2)} MB
                    </motion.p>
                  </div>

                  <div className="flex text-sm md:flex-row flex-col items-start md:items-center w-full mt-2 justify-between text-neutral-600 dark:text-neutral-400">
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      layout
                      className="px-1 py-0.5 rounded-md bg-gray-100 dark:bg-neutral-800"
                    >
                      {file.type}
                    </motion.p>

                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      layout
                    >
                      modified{" "}
                      {new Date(file.lastModified).toLocaleDateString()}
                    </motion.p>
                  </div>

                  <div className="mt-4 w-full">
                    <Image
                      src={URL.createObjectURL(file)}
                      alt={file.name}
                      width={300}
                      height={200}
                      className="rounded-md object-cover w-full h-48"
                    />
                  </div>

                  {uploading ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                      <Loader2 className="h-8 w-8 animate-spin text-white" />
                    </div>
                  ) : (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFile(id!, file.name);
                      }}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                    >
                      <X size={16} />
                    </button>
                  )}
                </motion.div>
              ))
            ) : (
              <>
                <motion.div
                  layoutId="file-upload"
                  variants={mainVariant}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                  }}
                  className={cn(
                    "relative group-hover/file:shadow-2xl z-40 bg-white dark:bg-neutral-900 flex items-center justify-center h-32 mt-4 w-full max-w-[8rem] mx-auto rounded-md",
                    "shadow-[0px_10px_50px_rgba(0,0,0,0.1)]"
                  )}
                >
                  {isDragActive ? (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-neutral-600 flex flex-col items-center"
                    >
                      Drop it
                      <Upload className="h-4 w-4 text-neutral-600 dark:text-neutral-400" />
                    </motion.p>
                  ) : (
                    <Upload className="h-4 w-4 text-neutral-600 dark:text-neutral-300" />
                  )}
                </motion.div>

                <motion.div
                  variants={secondaryVariant}
                  className="absolute opacity-0 border border-dashed border-amber-500 inset-0 z-30 bg-transparent flex items-center justify-center h-32 mt-4 w-full max-w-[8rem] mx-auto rounded-md"
                ></motion.div>
              </>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
