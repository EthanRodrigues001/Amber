import ImageViewer from "@/components/imageViewer";
import { getData } from "../actions";
import { redirect } from "next/navigation";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";

interface SearchParams {
  cid?: string;
}

export default async function DynamicImage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const cid = searchParams.cid as string;
  if (!cid) {
    redirect("/");
  }
  try {
    const { base64Data, contentType } = await getData(cid);
    return (
      <BackgroundBeamsWithCollision className="flex flex-col items-center justify-center min-h-screen p-4">
        <div>
          <div className="bg-zinc-800 p-8 rounded-lg shadow-md w-full max-w-md">
            <ImageViewer
              base64Data={base64Data}
              contentType={contentType}
              cid={cid}
            />
          </div>
        </div>
      </BackgroundBeamsWithCollision>
    );
  } catch (error) {
    console.error("Error fetching image data:", error);
    return (
      <BackgroundBeamsWithCollision>
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
          <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
            <h1 className="text-red-500 text-xl font-bold mb-4">Error</h1>
            <p>
              Failed to fetch the image. Please check your CID and try again.
            </p>
          </div>
        </div>
      </BackgroundBeamsWithCollision>
    );
  }
}
