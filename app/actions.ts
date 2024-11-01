"use server";
import { pinata } from "@/lib/config";

export async function deleteImage(fileId: string) {
  try {
    await pinata.files.delete([fileId]);

    return {
      success: true,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Failed to delete file",
    };
  }
}

export async function viewFiles() {
  try {
    const response = await pinata.files.list();
    // Ensure name is always a string
    const files = response.files.map((file: any) => ({
      ...file,
      name: file.name || "Unnamed File",
    }));
    return files;
  } catch (error) {
    console.error("Error fetching files from Pinata:", error);
    throw error;
  }
}

export async function getData(cid: string) {
  try {
    const gateway = await pinata.gateways.get(cid);
    // console.log("Gateway response:", gateway);

    // Convert the Blob to a Base64 string
    let base64String = "";
    if (gateway.data instanceof Blob) {
      const arrayBuffer = await gateway.data.arrayBuffer();
      base64String = Buffer.from(arrayBuffer).toString("base64");
    }

    return {
      base64Data: `data:${gateway.contentType};base64,${base64String}`,
      contentType: gateway.contentType,
    };
  } catch (error) {
    console.error("Error in getData:", error);
    throw error;
  }
}
