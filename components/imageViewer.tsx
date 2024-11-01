"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface ImageViewerProps {
  base64Data: string;
  contentType: string;
  cid: string;
}

export default function ImageViewer({
  base64Data,
  contentType,
  cid,
}: ImageViewerProps) {
  const [error, setError] = useState<string | null>(null);

  const handleDownload = () => {
    try {
      const byteString = atob(base64Data.split(",")[1]);
      const mimeString = base64Data.split(",")[0].split(":")[1].split(";")[0];
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      const blob = new Blob([ab], { type: mimeString });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `image-${cid}.${contentType.split("/")[1]}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading image:", error);
      setError("Failed to download the image. Please try again.");
    }
  };

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <>
      <Image
        src={base64Data}
        alt="Fetched image"
        width={400}
        height={400}
        className="max-w-full h-auto mb-4 rounded"
      />
      <Button onClick={handleDownload} className="w-full">
        Download Image
      </Button>
    </>
  );
}
