import { Piece } from "@/entities/piece";
import { CreatePieceProps, UpdatePieceProps } from "./schema";

export abstract class PieceServiceInterface {
  public abstract getPiece: (pieceId: Piece["id"]) => Promise<Piece | null>;
  public abstract getMonthlyPieces: (date: Date) => Promise<Piece[]>;
  public abstract getStatusBasedPieces: (status: Piece["status"] | "all", index: number, count?: number) => Promise<Piece[]>;
  public abstract createPiece: (createPieceProps: CreatePieceProps) => Promise<number | null>;
  public abstract updatePiece: (pieceId: Piece["id"], updatePieceProps: UpdatePieceProps) => Promise<boolean>;
  public abstract deletePiece: (pieceId: Piece["id"]) => Promise<boolean>;
  public abstract completePiece: (pieceId: Piece["id"]) => Promise<boolean>;
  public abstract uploadImage: (image: File) => Promise<string>;
}

export interface RequestConfig {
  query?: Query;
  contentType?: string;
}

export type Query = {
  [key: string]: string | undefined;
}

export interface PieceFetchInterface {
  get: (path: string, config?: RequestConfig) => Promise<any>;
  post: (path: string, data?: object | any[], config?: RequestConfig) => Promise<any>;
  put: (path: string, data?: object | any[], config?: RequestConfig) => Promise<any>;
  patch: (path: string, data?: object | any[], config?: RequestConfig) => Promise<any>;
  delete: (path: string, data?: object | any[], config?: RequestConfig) => Promise<any>;
}