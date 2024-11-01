"use client";

import { LayoutGrid } from "@/components/ui/layout-grid";
import React, { useState, useEffect } from "react";
// import { pinata } from "@/lib/config";
import { viewFiles } from "../actions";

const SkeletonContent = ({ title }: { title: string }) => (
  <div>
    <p className="font-bold md:text-4xl text-xl text-white">{title}</p>
    <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
      Dynamic content loaded from Pinata.
    </p>
  </div>
);

export default function Page() {
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchAndFormatFiles() {
      try {
        setIsLoading(true);
        const files = await viewFiles();
        if (!Array.isArray(files)) {
          throw new Error("Unexpected response format from Pinata");
        }
        const formattedCards = files.map((file) => ({
          id: file.id,
          content: <SkeletonContent title={file.name} />,
          className: "col-span-1",
          thumbnail: `https://aquamarine-tough-hoverfly-728.mypinata.cloud/files/${file.cid}`,
        }));

        setCards(formattedCards);
      } catch (error) {
        console.error("Error in fetchAndFormatFiles:", error);
        setError(
          (error as Error).message || "Failed to fetch files from Pinata"
        );
      } finally {
        setIsLoading(false);
      }
    }

    fetchAndFormatFiles();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen text-white">
        <p className="text-2xl font-semibold">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-white">
        <p className="text-2xl font-semibold">{error}</p>
      </div>
    );
  }

  return (
    <div className="h-screen py-20 w-full">
      {cards.length > 0 ? (
        <LayoutGrid cards={cards} />
      ) : (
        <div className="flex justify-center items-center h-full text-white">
          <p className="text-2xl font-semibold">No images available</p>
        </div>
      )}
    </div>
  );
}
