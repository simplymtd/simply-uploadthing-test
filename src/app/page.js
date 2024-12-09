// import Image from "next/image";
// import styles from "./page.module.css";
'use client'
import { UploadButton, useUploadThing } from "@/utils/uploadthing";
import { useDropzone } from "@uploadthing/react";

export default function Home() {
  const onDrop = () => {

  }

  const { getRootProps, getInputProps, isDragActive, isDragReject, fileRejections } = useDropzone({
    // multiple,
    // disabled,
    onDrop,
    // accept: fileTypes ? generateClientDropzoneAccept(fileTypes) : undefined,
    // ...other,
  });


  const { startUpload, routeConfig } = useUploadThing(
    "commonImageUploader",
    {
      onClientUploadComplete: (res) => {
        alert("image upload success")
      },
      onUploadError: (e) => {
        console.log("upload error ", e);
        alert("image upload error")
      },
      onUploadBegin: ({ file }) => {
        console.log("upload has begun for", file);
      },
    },
  );

  return (
    <div>
      <p>Uploadthing using pages router test</p>

      <UploadButton
        endpoint="commonImageUploader"
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log("Files: ", res);
          alert("Upload Completed");
        }}
        onUploadError={(error) => {
          // Do something with the error.
          console.log("onUploadError ", error);
          
          alert(`ERROR! ${error.message}`);
        }}
      />

      {/* <p>CUSTOM</p>
      <div {...getRootProps()} style={{ border: "1px solid black", width: "200px", height: "200px" }}>

      </div> */}
    </div>
  );
}
