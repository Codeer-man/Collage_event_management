import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";
type uploadBufferResult = {
  public_id: string;
  url: string;
};

type imagePublicId = "profile_publicId" | "event_publicId";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadImage(
  folderBuffer: Buffer,
  publicId: imagePublicId,
  folder = "collage/project",
): Promise<uploadBufferResult> {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        public_id: publicId,
        resource_type: "image",
        folder,
      },
      (error, result) => {
        if (error) {
          return reject(error);
        }

        if (!result) {
          return new Error("Cloudinary failed to upload");
        }

        resolve({
          public_id: result.public_id,
          url: result.url,
        });
      },
    );

    streamifier.createReadStream(folderBuffer).pipe(uploadStream);
  });
}
