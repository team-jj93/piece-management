import { ChangeEvent } from "react";
import Image from "next/image";

import AspectRatio from "@/components/atoms/aspect-ratio";
import { Input } from "@/components/atoms/input";
import { APIError } from "@/utils/fetch";

interface ImageInputProps {
  getImageUrl: (file: File) => Promise<string>;
  onChange: (event: any) => void;
}

const ImageInput = ({ onChange, getImageUrl }: ImageInputProps) => {
  const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
    try {
      const file = event.target.files && event.target.files[0];

      if (!file) {
        throw new Error("not image");
      }

      if (!file.type.includes("image")) {
        throw new Error("not image");
      }

      const imageUrl = await getImageUrl(file);

      onChange({ target: { value: imageUrl } });
    } catch (error) {
      console.error(error);
      if (error instanceof APIError) {
        window.alert(error.get().message);
      } else {
        window.alert("이미지 업로드에 실패했습니다.");
      }
    }
  };

  return (
    <Input
      type="file"
      accept="image/jpg,image/png,image/jpeg"
      onChange={handleChange}
    ></Input>
  );
};

interface ImageFieldProps {
  value: string | undefined;
  getImageUrl: (file: File) => Promise<string>;
  onChange: (event: any) => void;
}

const ImageField = ({ value, getImageUrl, onChange }: ImageFieldProps) => {
  return (
    <>
      <ImageInput getImageUrl={getImageUrl} onChange={onChange} />
      {value && (
        <div className="w-full overflow-hidden rounded-md">
          <AspectRatio ratio={4 / 3}>
            <Image
              fill
              src={value}
              alt="Image"
              className="object-cover"
              unoptimized
            />
          </AspectRatio>
        </div>
      )}
    </>
  );
};

export default ImageField;
