import { Piece } from "@/entities/piece";
import { APIError } from "@/utils/fetch";
import { PieceFetchInterface, PieceServiceInterface } from "./interface";
import { UpdatePieceProps, pieceSchema, createPiecePropsSchema, piecesSchema, updatePiecePropsSchema, CreatePieceProps } from "./schema";
import { createFormData } from "@/utils";


export class PieceService implements PieceServiceInterface {
  constructor(private pieceFetch: PieceFetchInterface) { }

  private errorHandler(error: any) {
    switch (error.status) {
      case 403:
        throw new APIError().reset("잘못된 인증 방식입니다.");

      case 400:
        throw new APIError().alert(error.message);

      case 404:
        throw new APIError().alert(error.message);

      default:
        console.error(error);
        throw new APIError().reset("알 수 없는 에러입니다.");
    }
  }

  public async getPiece(pieceId: number) {
    try {
      const data = await this.pieceFetch.get(`piece/${pieceId}`);

      return pieceSchema.parse(data) as Piece;
    } catch (error) {
      this.errorHandler(error);
    }

    return null;
  }

  public async getMonthlyPieces(date: Date) {
    try {
      const data = await this.pieceFetch.get("piece", { query: { date: date.toDateString() } });

      return piecesSchema.parse(data) as Piece[];
    } catch (error) {
      this.errorHandler(error);
    }

    return [];
  }

  public async getStatusBasedPieces(status: "received" | "delayed" | "departured" | "all", index: number, count: number = 10) {
    try {
      const query = status === "all" ? {
        index: String(index), count: String(count)
      } : {
        status,
        index: String(index), count: String(count)
      }

      const data = await this.pieceFetch.get("piece", { query });

      return piecesSchema.parse(data) as Piece[];
    } catch (error) {
      this.errorHandler(error);
    }

    return [];
  }

  public async uploadImage(image: File) {
    try {
      const formData = createFormData({ image });

      const imgUrl = await this.pieceFetch.post("image/piece", formData, { contentType: "multipart/form-data" });

      if (typeof imgUrl !== "string") {
        throw new APIError().alert();
      }

      return imgUrl;
    } catch (error) {
      this.errorHandler(error);
    }

    return "";
  }

  public async createPiece(createPieceProps: CreatePieceProps) {
    try {
      const validatedPieceProps = createPiecePropsSchema.parse(createPieceProps);

      const id = await this.pieceFetch.post("piece", validatedPieceProps);
      const numberedId = Number(id);

      if (Number.isNaN(numberedId)) {
        throw new APIError().reset("알 수 없는 에러입니다.");
      }

      return numberedId;
    } catch (error) {
      this.errorHandler(error);
    }

    return null;
  }

  public async updatePiece(pieceId: number, updatePieceProps: UpdatePieceProps) {
    try {
      const validatedPieceProps = updatePiecePropsSchema.parse(updatePieceProps);

      await this.pieceFetch.patch(`piece/${pieceId}`, validatedPieceProps);

      return true;
    } catch (error) {
      this.errorHandler(error);
    }

    return false;
  }

  public async deletePiece(pieceId: number) {
    try {
      if (typeof pieceId !== "number") {
        throw new APIError().alert();
      }

      await this.pieceFetch.delete(`piece/${pieceId}`);

      return true;
    } catch (error) {
      this.errorHandler(error);
    }

    return false;
  }

  public async completePiece(pieceId: number) {
    try {
      if (typeof pieceId !== "number") {
        throw new APIError().alert();
      }

      await this.pieceFetch.patch(`completePiece/${pieceId}`);

      return true;
    } catch (error) {
      this.errorHandler(error);
    }

    return false;
  }

}