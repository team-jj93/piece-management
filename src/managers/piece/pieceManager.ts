import { Piece, PieceBlockFrames, PieceProps } from "./entities/piece";
import { MonthlyPieces, PieceManagerInterface, PieceManagerListener, PieceServiceInterface, PieceState, PieceStoreInterface } from "./interface";

// TO-DO
// 실패했을때 규칙이 필요함.
export class PieceManager implements PieceManagerInterface {
  private state: PieceState = {
    isLoadingStatus: null,
    monthlyPieces: {},
    pieceList: []
  };
  private isLoadingStatus: "monthly" | "list" | "update" | "sync" | null = null;
  private monthlyPiecesProps: Date = new Date();
  private pieceListProps: [status: "received" | "delayed" | "departured", index: number, count?: number] = ["received", 0, 10];
  private monthlyPieces: MonthlyPieces = {};
  private pieceList: Piece[] = [];
  private listeners: Set<PieceManagerListener> = new Set();

  constructor(private pieceStore: PieceStoreInterface) { }

  private fail() {
    return;
  }

  private setState() {
    this.state = {
      isLoadingStatus: this.isLoadingStatus,
      monthlyPieces: this.monthlyPieces,
      pieceList: this.pieceList
    }
  }

  private notify() {
    this.setState();
    this.listeners.forEach(listener => listener(this.state));
  }

  public subscribe(listener: PieceManagerListener) {
    this.listeners.add(listener);

    return () => {
      this.listeners.delete(listener);
    }
  }

  private async refrechPieces() {
    this.monthlyPieces = await this.pieceStore.getMonthlyPieces(this.monthlyPiecesProps) ?? {};
    this.pieceList = await this.pieceStore.getStatusBasedPieces(...this.pieceListProps) ?? [];
  }

  public getState() {
    return this.state;
  }

  public async getMonthlyPieces(date: Date) {
    const monthlyPieces = await this.pieceStore.getMonthlyPieces(date);

    if (!monthlyPieces) {
      return null;
    }

    this.monthlyPiecesProps = date;
    this.monthlyPieces = monthlyPieces;

    this.notify();
  }

  public async getPieceList(status: "received" | "delayed" | "departured", index: number, count: number = 10) {
    const pieceList = await this.pieceStore.getStatusBasedPieces(status, index, count);

    if (!pieceList) {
      return null;
    }

    this.pieceListProps = [status, index, count];
    this.pieceList = pieceList;

    this.notify();
  }

  public async createPiece(pieceProps: PieceProps) {
    this.isLoadingStatus = "update";
    this.notify();
    await this.pieceStore.createPiece(pieceProps);

    this.isLoadingStatus = null;

    this.refrechPieces();
    this.notify();
  };

  public async updatePiece(pieceId: number, pieceBlockProps: PieceBlockFrames) {
    this.isLoadingStatus = "update";
    this.notify();
    await this.pieceStore.updatePiece(pieceId, pieceBlockProps);

    this.isLoadingStatus = null;

    this.refrechPieces();
    this.notify();
  };

  public async deletePiece(pieceId: number) {
    this.isLoadingStatus = "update";
    this.notify();
    const success = await this.pieceStore.deletePiece(pieceId);

    this.isLoadingStatus = null;

    this.refrechPieces();
    this.notify();
  };

}