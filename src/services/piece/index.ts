import { PieceService } from "./pieceService";
import { ResourcePieceFetch } from "./resource";

export type { CreatePieceProps, UpdatePieceProps } from "./schema";
export const pieceService = new PieceService(new ResourcePieceFetch());