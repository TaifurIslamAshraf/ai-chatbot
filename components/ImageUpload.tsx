"use client";

import { CldUploadButton } from "next-cloudinary";
import Image from "next/image";
import { useEffect, useState } from "react";

interface ImageUploadProps {
  value: string;
  onChange: (src: string) => void;
  disabled?: boolean;
}

const ImageUpload = ({ value, onChange, disabled }: ImageUploadProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="flex justify-center items-center space-y-4 w-full">
      <CldUploadButton
        options={{
          maxFiles: 1,
        }}
        uploadPreset="izt96pwi"
        onUpload={(result: any)=> onChange(result.info.secure_url)}
      >
        <div
          className="
            p-4
            border-4
            border-dashed
            border-primary/10
            flex
            flex-col
            justify-center
            items-center
            space-y-2
            rounded-lg
            hover:opacity-75
            transition
            "
        >
          <div
            className="w-40 h-40 relative"
          >
            <Image src={value || "/placeholder.svg"} fill alt="Upload" className="rounded-lg object-cover" />
          </div>
        </div>
      </CldUploadButton>
    </div>
  );
};

export default ImageUpload;
