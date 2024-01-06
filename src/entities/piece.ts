export interface Piece {
  id: number;
  name: string;
  author: string;
  requester: string | null;
  imgUrl: string | null;
  label: string | null;
  memo: string | null;
  status: "received" | "delayed" | "departured";
  receivedDate: Date;
  scheduledDepartureDate: Date;
  departureDate: Date | null;
}