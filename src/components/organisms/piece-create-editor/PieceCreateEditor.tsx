"use client";

import { useRouter } from "next/navigation";

import PieceForm, { PieceFormValues } from "@/components/molecules/piece-form";
import { pieceService } from "@/services/piece";
import { APIError } from "@/utils/fetch";

const PieceCreateEditor = () => {
  const router = useRouter();

  const handleSubmit = async (data: PieceFormValues) => {
    try {
      await pieceService.createPiece(data);

      router.push("/team/1/calendar");
    } catch (error) {
      console.error(error);

      if (error instanceof APIError) {
        window.alert(error.get().message);
      } else {
        window.alert("error");
      }
    }
  };

  const getImageUrl = (file: File) => {
    return pieceService.uploadImage(file);
  };

  return <PieceForm onSubmit={handleSubmit} getImageUrl={getImageUrl} />;
};

export default PieceCreateEditor;
