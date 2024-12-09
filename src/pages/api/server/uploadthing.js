
import { createUploadthing } from "uploadthing/next-legacy";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing({
    errorFormatter: (err) => {
        console.log("Error uploading file", err.message);
        console.log("  - Above error caused by:", err.cause);

        return { message: err.message };
    }
});

const auth = (req, res) => ({ id: "fakeId" }); // Fake auth function

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
    commonImageUploader: f(
        { image: { maxFileSize: "4MB" } },
        // { awaitServerData: false }
    )
        .middleware(async ({ req, res }) => {
            const user = await auth(req, res);
            // If you throw, the user will not be able to upload
            if (!user) throw new UploadThingError("Unauthorized");
            // Whatever is returned here is accessible in onUploadComplete as `metadata`
            return { userId: user.id };
        })
        // eslint-disable-next-line arrow-body-style
        .onUploadComplete(async ({ metadata, file }) => {
            console.log("file url", file.url);
            return { uploadedBy: metadata.userId };
        })
        .onUploadError(async (err) => {
            console.log("err onUploadError ", err);
        })
};

