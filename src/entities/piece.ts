export interface PieceRaw {
  id: number;
  name: string;
  submitterId: number;
  requesterId: number | null;
  imgUrl: string;
  label: string[];
  memo: string;
  groupId: number;
  status: 0 | 1 | 2 // "received" | "delayed" | "departured";
  receivedDate: string;
  scheduledDepartureDate: string;
  departureDate: string | null;
  projectId: string | number | null;
}

export interface Piece {
  id: number;
  name: string;
  submitter: string;
  requester: string | null;
  imgUrl: string;
  label: string[];
  memo: string;
  groupId: number;
  status: "received" | "delayed" | "departured";
  receivedDate: Date;
  scheduledDepartureDate: Date;
  departureDate: Date | null;
}