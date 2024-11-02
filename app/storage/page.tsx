"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import {
  Search,
  FileIcon,
  Loader2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { motion } from "framer-motion";
import { viewFiles } from "../actions";

interface FileObject {
  id: string;
  name: string;
  cid: string;
  size: number;
  number_of_files: number;
  mime_type: string;
  group_id: string | null;
  keyvalues: Record<string, unknown>;
  created_at: string;
}

const TOTAL_STORAGE = 1024 * 1024 * 1024; // 1GB in bytes
const ITEMS_PER_PAGE = 5;

export default function Storage() {
  const [files, setFiles] = useState<FileObject[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [totalUsed, setTotalUsed] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        setIsLoading(true);
        const data = await viewFiles();
        setFiles(data);
        const used = data.reduce((acc, file) => acc + file.size, 0);
        setTotalUsed(used);
      } catch (error) {
        console.error("Error fetching files:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFiles();
  }, []);

  const filteredFiles = files.filter((file) =>
    file.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredFiles.length / ITEMS_PER_PAGE);
  const paginatedFiles = filteredFiles.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const percentageUsed = (totalUsed / TOTAL_STORAGE) * 100;
  const formattedUsed = (totalUsed / (1024 * 1024)).toFixed(2);

  return (
    <div className="min-h-screen container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Storage</h1>
        <div className="relative">
          <Input
            type="text"
            placeholder="Search files..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-64"
          />
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
        </div>
      </div>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
            Storage Used
          </span>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
            {formattedUsed} MB / 1 GB
          </span>
        </div>
        <Progress value={percentageUsed} className="w-full" />
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="sr-only">Loading...</span>
        </div>
      ) : paginatedFiles.length > 0 ? (
        <>
          {paginatedFiles.map((file, idx) => (
            <motion.div
              key={"file" + idx}
              layoutId={idx === 0 ? "file-upload" : "file-upload-" + idx}
              className="relative overflow-hidden z-40 bg-white dark:bg-neutral-900 flex flex-col items-start justify-start md:h-28 p-4 mt-4 w-full mx-auto rounded-md shadow-sm"
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
                  className="absolute top-4 right-20 rounded-lg px-2 py-1 w-fit flex-shrink-0 text-sm text-neutral-600 dark:bg-neutral-800 dark:text-white shadow-input"
                >
                  {(file.size / (1024 * 1024)).toFixed(2)} MB
                </motion.p>
              </div>

              <div className="flex text-sm md:flex-row flex-col items-start md:items-center w-full mt-4 justify-between text-neutral-600 dark:text-neutral-400">
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  layout
                  className="px-1 py-0.5 rounded-md bg-gray-100 dark:bg-neutral-800"
                >
                  {file.mime_type || "Unknown"}
                </motion.p>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  layout
                  className="text-amber-500"
                >
                  {new Date(file.created_at).toLocaleDateString()}
                </motion.p>
              </div>

              <Link
                href={`http://amber.blingo.tech/img?cid=${file.cid}`}
                passHref
                className="absolute right-4 top-3"
              >
                <Button variant="outline" size="sm">
                  View
                </Button>
              </Link>
            </motion.div>
          ))}

          <div className="flex justify-between items-center mt-6">
            <Button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              variant="outline"
              size="sm"
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              variant="outline"
              size="sm"
            >
              Next
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </>
      ) : (
        <div className="text-center py-10">
          <FileIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-gray-100">
            No files found
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {searchTerm
              ? "No files match your search."
              : "Get started by uploading a file."}
          </p>
        </div>
      )}

      <div className="mt-8 text-center">
        <Link href="/" passHref>
          <Button size="lg">Upload More</Button>
        </Link>
      </div>
    </div>
  );
}
