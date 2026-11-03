
import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const ALLOWED_FOLDERS = {
  skyfly_blogs: "blog-post",
  skyfly_deals: "deal",
  skyfly_group_travel: "group-travel",
  skyfly_flights: "flight",
} as const;

type UploadFolder = keyof typeof ALLOWED_FOLDERS;

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const file = formData.get("file");
    const folderValue = formData.get("folder");

    // Validate file
    if (!(file instanceof File)) {
      return NextResponse.json(
        { success: false, message: "No valid image uploaded." },
        { status: 400 }
      );
    }

    // Validate file type
    const allowedMimeTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/gif",
      "image/avif",
    ];

    if (!allowedMimeTypes.includes(file.type)) {
      return NextResponse.json(
        {
          success: false,
          message: "Only JPG, PNG, WEBP, GIF and AVIF images are allowed.",
        },
        { status: 400 }
      );
    }

    // Validate file size (5MB)
    const MAX_FILE_SIZE = 5 * 1024 * 1024;

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        {
          success: false,
          message: "Image size must be less than 5MB.",
        },
        { status: 400 }
      );
    }

    // Validate Cloudinary folder
    const folder: UploadFolder =
      typeof folderValue === "string" &&
      Object.prototype.hasOwnProperty.call(ALLOWED_FOLDERS, folderValue)
        ? (folderValue as UploadFolder)
        : "skyfly_blogs";

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload image to Cloudinary
    const result = await new Promise<{
      secure_url: string;
      public_id: string;
      format: string;
      width: number;
      height: number;
    }>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: "image",
          folder,
          tags: [ALLOWED_FOLDERS[folder]],
        },
        (error, result) => {
          if (error) {
            reject(error);
            return;
          }

          if (!result) {
            reject(new Error("Cloudinary returned an empty response."));
            return;
          }

          resolve({
            secure_url: result.secure_url,
            public_id: result.public_id,
            format: result.format,
            width: result.width,
            height: result.height,
          });
        }
      );

      uploadStream.end(buffer);
    });

    return NextResponse.json(
      {
        success: true,
        message: "Image uploaded successfully.",
        imageUrl: result.secure_url,
        publicId: result.public_id,
        format: result.format,
        width: result.width,
        height: result.height,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to upload image.",
      },
      { status: 500 }
    );
  }
}
