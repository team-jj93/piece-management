import { Piece, RawPiece, PieceProps, PieceBlockFrames } from "./entities";

export type PieceDateField = "receivedDate" | "scheduledDepartureDate" | "departureDate";

export type MonthlyPieces = {
  [date: number | string]: {
    [Key in PieceDateField]?: Piece[];
  };
}

export type DateBasedPiecesMap = {
  [year: number | string]: {
    [month: number | string]: MonthlyPieces;
  }
}

export type StatusBasedPiecesMap = {
  [Key in Piece["status"] | "all"]?: Piece[];
}

export interface PieceState {
  isLoadingStatus: "monthly" | "list" | "update" | "sync" | null;
  monthlyPieces: {
    [Key in PieceDateField]?: MonthlyPieces;
  };
  pieceList: Piece[];
}

export type PieceManagerListener = (state: PieceState) => void;

export abstract class PieceServiceInterface {
  public abstract getPiece: (pieceId: Piece["id"]) => Promise<Piece | null>;
  public abstract getRawPiece: (pieceId: Piece["id"]) => Promise<RawPiece | null>;
  public abstract getMonthlyPieces: (date: Date) => Promise<Piece[] | null>;
  public abstract getStatusBasedPieces: (status: Piece["status"] | "all", index: number, count?: number) => Promise<Piece[]>;
  public abstract createPiece: (pieceProps: PieceProps) => Promise<Piece | null>;
  public abstract updatePiece: (pieceId: Piece["id"], pieceBlockProps: PieceBlockFrames) => Promise<Piece>;
  public abstract deletePiece: (pieceId: Piece["id"]) => Promise<boolean>;
}

export abstract class PieceStoreInterface {
  public abstract addPieceMap: (pieces: Piece[] | Piece, target?: "date" | "list") => void;
  public abstract deletePieceMap: (pieceIds: Piece["id"] | Piece["id"][], target?: "date" | "list") => void;
  public abstract createPiece: (piece: PieceProps) => Promise<void>;
  public abstract deletePiece: (pieceId: Piece["id"]) => Promise<void>;
  public abstract updatePiece: (pieceId: Piece["id"], pieceBlockProps: PieceBlockFrames) => Promise<void>;
  public abstract getMonthlyPieces: (date: Date) => Promise<MonthlyPieces | null>;
  public abstract getStatusBasedPieces: (status: Piece["status"], index: number, count?: number) => Promise<Piece[] | null>;
  public abstract getPiece: (pieceId: Piece["id"]) => Promise<Piece | null>;
}

export abstract class PieceManagerInterface {
  public abstract getMonthlyPieces: (date: Date) => void;
  public abstract getPieceList: (status: Piece["status"], index: number, count?: number) => void;
  public abstract createPiece: (pieceProps: PieceProps) => void;
  public abstract updatePiece: (pieceId: Piece["id"], pieceBlockProps: PieceBlockFrames) => void;
  public abstract deletePiece: (pieceId: Piece["id"]) => void;
  public abstract getState: () => PieceState;
  public abstract subscribe: (listener: PieceManagerListener) => void;
}