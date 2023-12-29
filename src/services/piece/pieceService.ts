import { Piece } from "@/entities/piece";


abstract class PieceServiceInterface {
  public abstract addPieceMap: (pieces: Piece[]) => void;
}

export class PieceService {
  private groupId: string = "";
  private pieceIdSet = new Set<number>();
  private pieceMap = new Map<number, Piece>();
}