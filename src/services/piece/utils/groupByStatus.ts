import { Piece } from "@/entities/piece";

export interface PiecesByStatus {
  received?: Piece[];
  expected?: Piece[];
  delayed?: Piece[];
  departured?: Piece[];
}

function getStatus(targetDate: Date, { receivedDate, scheduledDepartureDate, departureDate }: Piece): keyof PiecesByStatus | undefined {
  const target = targetDate.setHours(0, 0, 0, 0);
  const received = receivedDate.setHours(0, 0, 0, 0);
  const scheduled = scheduledDepartureDate.setHours(0, 0, 0, 0);
  const departure = departureDate ? departureDate.setHours(0, 0, 0, 0) : null;



  if (departure && target === departure) {
    return "departured";
  } else if (target === received) {
    return "received";
  } else if (target === scheduled) {
    return 'expected';
  } else if (target > scheduled) {
    return 'delayed';
  }
}

export function groupByStatus(targetDate: Date, pieces: Piece[]): PiecesByStatus {
  return pieces.reduce((piecesByStatus, piece) => {
    const status = getStatus(targetDate, piece);

    if (!status) {
      return piecesByStatus;
    }

    if (status && !piecesByStatus[status]) {
      piecesByStatus[status] = [];
    }

    piecesByStatus[status]?.push(piece);

    return piecesByStatus;
  }, {} as PiecesByStatus);
}