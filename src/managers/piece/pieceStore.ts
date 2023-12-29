import { Piece, PieceBlockFrames, PieceProps } from "./entities";
import { PieceServiceInterface, DateBasedPiecesMap, StatusBasedPiecesMap, PieceDateField, PieceStoreInterface } from "./interface";

export class PieceStore implements PieceStoreInterface {
  private pieceMap: Map<Piece["id"], Piece> = new Map();
  private dateBasedPiecesMap: DateBasedPiecesMap = {};
  private statusBasedPieces: StatusBasedPiecesMap = {};
  private monthlyPiecesRequestCache: Set<string> = new Set();
  private statusBasedPiecesRequestCache: {
    [Key in Piece["status"] | "all"]: number;
  } = {
      all: 0,
      received: 0,
      delayed: 0,
      departured: 0,
    };

  constructor(private pieceService: PieceServiceInterface) { }

  private addStatusBasedPieces(piece: Piece) {
    const status = piece.status;

    if (!this.statusBasedPieces[status]) {
      this.statusBasedPieces[status] = [];
    }

    this.statusBasedPieces[status]?.push(piece);
  }

  private sortStatusBasedPieces() {
    if (this.statusBasedPieces.all) {
      this.statusBasedPieces.all.sort((a, b) => a.receivedDate.getTime() - b.receivedDate.getTime());
    }

    if (this.statusBasedPieces.received) {
      this.statusBasedPieces.received.sort((a, b) => a.scheduledDepartureDate.getTime() - b.scheduledDepartureDate.getTime());
    }

    if (this.statusBasedPieces.delayed) {
      this.statusBasedPieces.delayed.sort((a, b) => a.scheduledDepartureDate.getTime() - b.scheduledDepartureDate.getTime());
    }

    if (this.statusBasedPieces.departured) {
      this.statusBasedPieces.departured.sort((a, b) => (a.departureDate?.getTime() ?? 0) - (b.departureDate?.getTime() ?? 0));
    }
  }

  private setDateBasedPieces(piece: Piece, dateField: PieceDateField) {
    const pieceDate = piece[dateField];

    if (!pieceDate) {
      return;
    }

    const year = pieceDate.getFullYear();
    const month = pieceDate.getMonth();
    const date = pieceDate.getDate();

    if (!this.dateBasedPiecesMap[year]) {
      this.dateBasedPiecesMap[year] = { [month]: { [date]: { [dateField]: [] } } };
    }

    if (!this.dateBasedPiecesMap[year][month]) {
      this.dateBasedPiecesMap[year][month] = { [date]: { [dateField]: [] } };
    }

    if (!this.dateBasedPiecesMap[year][month][date]) {
      this.dateBasedPiecesMap[year][month][date] = { [dateField]: [] };
    }

    if (!this.dateBasedPiecesMap[year][month][date][dateField]) {
      this.dateBasedPiecesMap[year][month][date][dateField] = [];
    }

    this.dateBasedPiecesMap[year][month][date][dateField]?.push(piece);
  }

  private addDateBasedPiecesMap(piece: Piece) {
    this.setDateBasedPieces(piece, "receivedDate");
    this.setDateBasedPieces(piece, "scheduledDepartureDate");
    this.setDateBasedPieces(piece, "departureDate");
  }

  private organizePieces(target?: "date" | "list") {
    if (target === "date") {
      this.dateBasedPiecesMap = {
        receivedDate: {},
        scheduledDepartureDate: {},
        departureDate: {}
      };

      this.pieceMap.forEach(piece => {
        this.addDateBasedPiecesMap(piece);
      });

      return;
    }


    if (target === "list") {
      this.statusBasedPieces = {};
      this.pieceMap.forEach(piece => {
        this.addStatusBasedPieces(piece);
      });
      this.sortStatusBasedPieces();
    }

    this.dateBasedPiecesMap = {
      receivedDate: {},
      scheduledDepartureDate: {},
      departureDate: {}
    };
    this.statusBasedPieces = {};

    this.pieceMap.forEach(piece => {
      this.addStatusBasedPieces(piece);
      this.addDateBasedPiecesMap(piece);
    });
    this.sortStatusBasedPieces();
  }

  public addPieceMap(pieces: Piece | Piece[], target?: "date" | "list") {
    if (!Array.isArray(pieces)) {
      this.pieceMap.set(pieces.id, pieces);
    } else {
      pieces.forEach(piece => {
        this.pieceMap.set(piece.id, piece);
      });
    }

    this.organizePieces(target);
  }

  public deletePieceMap(pieceIds: Piece["id"] | Piece["id"][], target?: "date" | "list") {
    if (!Array.isArray(pieceIds)) {
      this.pieceMap.delete(pieceIds);
    } else {
      pieceIds.forEach(id => {
        this.pieceMap.delete(id);
      });
    }

    this.organizePieces(target);
  }

  public async createPiece(pieceProps: PieceProps) {
    const piece = await this.pieceService.createPiece(pieceProps);

    if (!piece) {
      // TO-DO: Error 
      return;
    }

    this.addPieceMap(piece);
  }

  public async updatePiece(id: Piece["id"], pieceBlockProps: PieceBlockFrames) {
    const piece = await this.pieceService.updatePiece(id, pieceBlockProps);

    if (!piece) {
      // TO-DO: Error 
      return;
    }

    this.addPieceMap(piece);
  }

  public async deletePiece(id: Piece["id"]) {
    const isSuccess = await this.pieceService.deletePiece(id);

    if (!isSuccess) {
      // TO-DO: Error 
      return;
    }

    this.deletePieceMap(id);
  }

  public async getPiece(pieceId: Piece["id"]) {
    if (!this.pieceMap.has(pieceId)) {
      const piece = await this.pieceService.getPiece(pieceId);

      if (!piece) {
        return null;
      }

      this.addPieceMap(piece);
    }

    return this.pieceMap.get(pieceId) ?? null;
  }

  public async getMonthlyPieces(date: Date) {
    const year = date.getFullYear();
    const month = date.getMonth();
    const monthlyDate = `${year}-${month}`;

    if (!this.monthlyPiecesRequestCache.has(monthlyDate)) {
      const pieces = await this.pieceService.getMonthlyPieces(date);

      if (!pieces) {
        return null;
      }

      this.addPieceMap(pieces, "date");
    }

    return this.dateBasedPiecesMap[year][month] ?? null;
  }

  public async getStatusBasedPieces(status: Piece["status"] | "all", index: number, count: number = 10) {
    if (index < 1) {
      return [];
    }

    if (this.statusBasedPiecesRequestCache[status] < index * count) {
      const currentIndex = Math.floor(this.statusBasedPiecesRequestCache[status] / count);
      const pieces = await this.pieceService.getStatusBasedPieces(status, currentIndex + 1, (index - currentIndex) * count);

      this.statusBasedPiecesRequestCache[status] = index * count;
      this.addPieceMap(pieces, "list");
    }

    return this.statusBasedPieces[status]?.slice(index - 1, count) ?? [];
  }

}