import { PieceFetchInterface, Query, RequestConfig } from "./interface";
import { Piece } from "@/entities/piece";
import { schemaOfCreatePieceProps, schemaOfUpdatePieceProps } from "./schema";

class APIError extends Error {
  status: number | string = 400;

  setStatus(status: number | string) {
    this.status = status;

    return this;
  }
}

export class ResourcePieceFetch implements PieceFetchInterface {
  private id: number = 1;
  private initialPiece: Piece = {
    id: 0,
    name: "",
    author: "",
    requester: null,
    imgUrl: null,
    label: null,
    memo: null,
    status: "received",
    receivedDate: new Date(),
    scheduledDepartureDate: new Date(),
    departureDate: null,
  }
  private pieces: Piece[] = [];

  private createPiece(pieceProps: any): number {
    try {
      const validatedPieceProps = schemaOfCreatePieceProps.parse(pieceProps);

      const piece = {
        ...this.initialPiece,
        id: this.id++,
        ...validatedPieceProps
      };

      this.pieces.push(piece);

      return piece.id;
    } catch (error) {
      console.error(error);
      throw new APIError("잘못된 요청입니다.");
    }
  }

  private updatePiece(pieceId: string | number, pieceProps: any): string {
    try {
      const id = Number(pieceId);

      if (Number.isNaN(id)) {
        throw new APIError("잘못된 요청입니다.");
      }

      const validatedPieceProps = schemaOfUpdatePieceProps.parse(pieceProps);

      if (!this.pieces.filter(piece => piece.id === id)[0]) {
        throw new APIError("Piece가 존재하지 않습니다.").setStatus(404);
      }

      this.pieces = this.pieces.map(piece => piece.id !== id ? piece : { ...piece, ...validatedPieceProps });

      return "success";
    } catch (error) {
      console.error(error);
      throw new APIError("잘못된 요청입니다.");
    }
  }

  private deletePiece(pieceId: string | number): string {
    try {
      const id = Number(pieceId);

      if (Number.isNaN(id)) {
        throw new APIError("잘못된 요청입니다.");
      }

      if (!this.pieces.filter(piece => piece.id === id)[0]) {
        throw new APIError("Piece가 존재하지 않습니다.").setStatus(404);
      }

      this.pieces = this.pieces.filter(piece => piece.id !== id);

      return "success";
    } catch (error) {
      console.error(error);
      throw new APIError("잘못된 요청입니다.");
    }
  }

  private completePiece(pieceId: string | number): string {
    try {
      const id = Number(pieceId);

      if (Number.isNaN(id)) {
        throw new APIError("잘못된 요청입니다.");
      }

      if (!this.pieces.filter(piece => piece.id === id)[0]) {
        throw new APIError("Piece가 존재하지 않습니다.").setStatus(404);
      }

      this.pieces = this.pieces.map(piece => piece.id !== id ? piece : { ...piece, status: "departured" });

      return "success";
    } catch (error) {
      console.error(error);
      throw new APIError("잘못된 요청입니다.");
    }
  }

  private getPaths(path: string) {
    return String(path).split("/");
  }

  private getPiece({ param, query }: { param?: string, query?: Query }) {
    if (param) {
      const piece = this.pieces.filter(({ id }) => id === Number(param))[0];

      if (!piece) {
        throw new APIError("Piece가 존재하지 않습니다.").setStatus(404);
      }

      return piece;
    }

    if (!query) {
      throw new APIError("잘못된 요청입니다.");
    }

    const { status, index, count, date } = query;

    if (!status && !date) {
      return this.pieces.slice(0, 10);
    }

    let pieces = this.pieces;

    if (status) {
      pieces = this.pieces.filter(piece => piece.status === status);
    }

    if (date) {
      const targetDate = new Date(date);
      const year = targetDate.getFullYear();
      const month = targetDate.getMonth();

      pieces = pieces.filter(({ receivedDate, scheduledDepartureDate, departureDate }) => {
        if (receivedDate.getFullYear() === year && receivedDate.getMonth() === month) {
          return true;
        }

        if (scheduledDepartureDate.getFullYear() === year && scheduledDepartureDate.getMonth() === month) {
          return true;
        }

        if (departureDate && departureDate.getFullYear() === year && departureDate.getMonth() === month) {
          return true;
        }

        return false;
      });
    }

    if (index) {
      const appliedIndex = Number(index);
      const appliedCount = count ? Number(count) : 10;

      pieces = pieces.slice(appliedIndex * appliedCount, appliedIndex * appliedCount + appliedCount);
    }

    return pieces;
  }

  public async get(path: string, config: RequestConfig = {}) {
    const paths = String(path).split("/");

    if (paths[0] === "piece") {
      return this.getPiece({ param: paths[1], query: config.query });
    }

    throw new APIError("잘못된 요청입니다.");
  }

  public async post(path: string, data?: object | any[], config?: RequestConfig) {
    const paths = this.getPaths(path);

    switch (paths[0]) {
      case "piece":
        return this.createPiece(data);

      case "image":
        if (paths[1] === "piece") {
          return "";
        }

      default:
        throw new APIError("잘못된 요청입니다.");
    }
  };

  public async put(path: string, data?: object | any[], config?: RequestConfig) {
    throw new APIError("잘못된 요청입니다.");
  }

  public async patch(path: string, data?: object | any[], config?: RequestConfig) {
    const paths = this.getPaths(path);

    if (paths[0] === "piece" && paths[1]) {
      return this.updatePiece(paths[1], data);
    }

    if (paths[0] === "completePiece" && paths[1]) {
      return this.completePiece(paths[1]);
    }

    throw new APIError("잘못된 요청입니다.");
  }

  public async delete(path: string, data?: object | any[], config?: RequestConfig) {
    const paths = this.getPaths(path);

    if (paths[0] === "piece" && paths[1]) {
      return this.deletePiece(paths[1]);
    }

    throw new APIError("잘못된 요청입니다.");
  }
}