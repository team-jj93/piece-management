import { PieceService } from "./pieceService";
import { ResourcePieceFetch } from "./resource";

const pieceService = new PieceService(new ResourcePieceFetch());

test("pieceService", async () => {
  await pieceService.createPiece({ name: "그림2", receivedDate: new Date(2024, 0, 6), scheduledDepartureDate: new Date(2024, 0, 20) });
  await pieceService.createPiece({ name: "그림2", receivedDate: new Date(2024, 0, 6), scheduledDepartureDate: new Date(2024, 0, 20) });
  await pieceService.createPiece({ name: "그림3", receivedDate: new Date(2024, 0, 6), scheduledDepartureDate: new Date(2024, 0, 20) });
  await pieceService.createPiece({ name: "그림4", receivedDate: new Date(2024, 1, 6), scheduledDepartureDate: new Date(2024, 1, 19) });
  await pieceService.createPiece({ name: "그림5", receivedDate: new Date(2024, 1, 6), scheduledDepartureDate: new Date(2024, 1, 19) });
  await pieceService.createPiece({ name: "그림6", receivedDate: new Date(2024, 1, 6), scheduledDepartureDate: new Date(2024, 1, 19) });
  await pieceService.updatePiece(1, { name: "그림1" });
  await pieceService.completePiece(1);
  await pieceService.deletePiece(5);

  const pieces = await pieceService.getStatusBasedPieces("all", 0);
  const monthlyPieces = await pieceService.getMonthlyPieces(new Date("2024-1-20"));
  // console.log(pieces);
  // console.log(monthlyPieces);
  expect(pieces[0].name).toEqual("그림1");
});