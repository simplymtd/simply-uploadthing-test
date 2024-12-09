import {
    generateUploadButton,
    generateReactHelpers,
    generateUploadDropzone
} from "@uploadthing/react";

export const UploadButton = generateUploadButton();
export const UploadDropzone = generateUploadDropzone();

export const { useUploadThing, uploadFiles } = generateReactHelpers();