export interface RawPieceMeta {
  id: number;
  authorId: number; // 사용자 token에 있음
  lastUpdateUserId: number; // 사용자 token에 있고 업데이트시 사용
  status: number; // project에서 구성할때만 구성가능.
  createdDate: Date;
  updatedDate: Date;
  deletedDate: Date | null;
  groupId: number; // 사용자 token에 있음
  receivedDate: Date;
  scheduledDepartureDate: Date;
  departureDate: Date | null; // 마지막에 추가되는 것.
}

export interface BlockGenericType<T extends string, P> {
  type: T;
  content: P;
}

export type TextBlockGenericType = BlockGenericType<"string", "string">;
export type ImageBlockGenericType = BlockGenericType<"image", string>;
export type NumberBlockGenericType = BlockGenericType<"number", number>;
export type DateBlockGenericType = BlockGenericType<"date", Date>;
export type ReceivedDateBlockGenericType = BlockGenericType<"receivedDate", Date>;
export type ScheduledDepartureDateBlockGenericType = BlockGenericType<"scheduledDepartureDate", Date>;
export type DepartureDateBlockGenericType = BlockGenericType<"departureDate", Date | null>;

export type UnionBlockGenericType = TextBlockGenericType | ImageBlockGenericType | NumberBlockGenericType | DateBlockGenericType | ReceivedDateBlockGenericType | ScheduledDepartureDateBlockGenericType | DepartureDateBlockGenericType;

export interface RawPieceBlock<T extends UnionBlockGenericType> {
  id: number;
  key: string;
  authorId: string;
  index: number;
  isAlert: boolean;
  createdDate: Date;
  deletedDate: Date;
  label: string;
  subLabel: string | null;
  type: T["type"];
  content: T["content"];
}

export type TextRawPieceBlock = RawPieceBlock<TextBlockGenericType>;
export type ImageRawPieceBlock = RawPieceBlock<ImageBlockGenericType>;
export type NumberRawPieceBlock = RawPieceBlock<NumberBlockGenericType>;
export type DateRawPieceBlock = RawPieceBlock<DateBlockGenericType>;
export type ReceivedDateRawPieceBlock = RawPieceBlock<ReceivedDateBlockGenericType>;
export type ScheduledDepartureDateRawPieceBlock = RawPieceBlock<ScheduledDepartureDateBlockGenericType>;
export type DepartureDateRawPieceBlock = RawPieceBlock<DepartureDateBlockGenericType>;

export type UnionRawPieceBlock = TextRawPieceBlock | ImageRawPieceBlock | NumberRawPieceBlock | DateRawPieceBlock | ReceivedDateRawPieceBlock | ScheduledDepartureDateRawPieceBlock | DepartureDateRawPieceBlock;

export interface RawPiece extends RawPieceMeta {
  blocks: UnionRawPieceBlock[];
}

/** 
 * 이러한 형태
interface PieceBlock<T extends UnionBlockGenericType> {
  id: number;
  key: string;
  index: number;
  label: string;
  subLabel: string | null;
  type: T["type"];
  content: T["content"];
}
**/

export type PieceBlock<T extends UnionRawPieceBlock> = Omit<T, "authorId" | "createdDate" | "deletedDate">;

export type TextPieceBlock = PieceBlock<TextRawPieceBlock>;
export type ImagePieceBlock = PieceBlock<ImageRawPieceBlock>;
export type NumberPieceBlock = PieceBlock<NumberRawPieceBlock>;
export type DatePieceBlock = PieceBlock<DateRawPieceBlock>;
export type ReceivedDatePieceBlock = PieceBlock<ReceivedDateRawPieceBlock>;
export type ScheduledDepartureDatePieceBlock = PieceBlock<ScheduledDepartureDateRawPieceBlock>;
export type DepartureDatePieceBlock = PieceBlock<DepartureDateRawPieceBlock>;

export type UnionPieceBlock = TextPieceBlock | ImagePieceBlock | NumberPieceBlock | DatePieceBlock | ReceivedDatePieceBlock | ScheduledDepartureDatePieceBlock | DepartureDatePieceBlock;

/**
interface Piece {
  id: number;
  authorId: number;
  status: number;
  groupId: number;
  projectId: number | null;
  receivedDate: Date;
  scheduledDepartureDate: Date;
  departureDate: Date | null;
  blocks: UnionPieceBlock[];
}
 */

export type Piece = Omit<RawPieceMeta, "status" | "lastUpdateUserId" | "createdDate" | "updatedDate" | "deletedDate"> & {
  status: "received" | "delayed" | "departured";
  blocks: UnionPieceBlock[];
}

export interface PieceBlockFrame<T extends UnionBlockGenericType> {
  key: string;
  index: number;
  isAlert: boolean;
  label: string;
  subLabel: string | null;
  type: T["type"];
  content: T["content"];
}

export type PieceBlockFrames = PieceBlockFrame<UnionBlockGenericType>[];

// blockFrame을 사용하면 됨.
/**
type CreatedPieceBlockProps = {
  key: string;
  index: number;
  isAlert: boolean; // 변경될 때 필요한 것.
  label: string;
  subLabel: string | null;
  type: string;
  content: any;
  

update = {
  id: number;
  index?: number;
  isAlert?: boolean; // 변경될 때 필요한 것.
  label?: string;
  subLabel?: string | null;
  type?: string;
  content?: any;
  
*/
//

export type PieceProps = Omit<Piece, "id" | "authorId" | "groupId" | "status" | "departureDate" | "blocks"> & {
  blocks: [ReceivedDatePieceBlock, ScheduledDepartureDatePieceBlock] & PieceBlockFrame<UnionBlockGenericType>[];
}