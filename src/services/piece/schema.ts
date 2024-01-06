import { z } from "zod";

export const schemaOfPiece = z.object({
  id: z.number(),
  name: z.string(),
  author: z.string(),
  requester: z.string().nullable(),
  imgUrl: z.string().nullable(),
  label: z.string().nullable(),
  memo: z.string().nullable(),
  status: z.string().regex(/^(received|delayed|departured)$/),
  receivedDate: z.date(),
  scheduledDepartureDate: z.date(),
  departureDate: z.date().nullable()
});

export const schemaOfPieces = z.array(schemaOfPiece);

export const schemaOfCreatePieceProps = z.object({
  name: z.string(),
  receivedDate: z.date(),
  scheduledDepartureDate: z.date(),
  requester: z.string().optional(),
  imgUrl: z.string().optional(),
  label: z.string().optional(),
  memo: z.string().optional(),
});

export type CreatePieceProps = z.infer<typeof schemaOfCreatePieceProps>;

export const schemaOfUpdatePieceProps = z.object({
  name: z.string().optional(),
  receivedDate: z.date().optional(),
  scheduledDepartureDate: z.date().optional(),
  requester: z.string().optional(),
  imgUrl: z.string().optional(),
  label: z.string().optional(),
  memo: z.string().optional(),
});

export type UpdatePieceProps = z.infer<typeof schemaOfUpdatePieceProps>;