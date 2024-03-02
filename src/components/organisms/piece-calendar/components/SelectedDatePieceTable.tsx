import { useMemo } from "react";

import { compareDate, useCalendarState } from "@/components/atoms/calendar";
import PieceTable from "@/components/molecules/piece-table";
import { Piece } from "@/entities/piece";
import { useQuery } from "@tanstack/react-query";
import { pieceService } from "@/services/piece";

interface PieceMap {
  received?: Piece[];
  expected?: Piece[];
  delayed?: Piece[];
  departured?: Piece[];
}

function groupByStatus(targetDate: Date, pieces: Piece[]): PieceMap {
  return pieces.reduce((pieceMap, piece) => {
    const receivedDate = new Date(piece.receivedDate);
    const scheduledDepartureDate = new Date(piece.scheduledDepartureDate);
    const departureDate = piece.departureDate
      ? new Date(piece.departureDate)
      : null;

    const isDelayed = compareDate(targetDate, scheduledDepartureDate);

    if (isDelayed < 0) {
      if (!pieceMap.delayed) {
        pieceMap.delayed = [];
      }

      pieceMap.delayed.push(piece);
    } else if (isDelayed === 0 && !departureDate) {
      if (!pieceMap.expected) {
        pieceMap.expected = [];
      }

      pieceMap.expected.push(piece);
    }

    if (compareDate(targetDate, receivedDate) === 0) {
      if (!pieceMap.received) {
        pieceMap.received = [];
      }

      pieceMap.received.push(piece);
    }

    if (departureDate && compareDate(targetDate, departureDate) === 0) {
      if (!pieceMap.departured) {
        pieceMap.departured = [];
      }

      pieceMap.departured.push(piece);
    }

    return pieceMap;
  }, {} as PieceMap);
}

const SelectedDatePieceTable = () => {
  const { selectedDate, todayDate } = useCalendarState();

  const defaultValue = useMemo(() => {
    const result = compareDate(todayDate, selectedDate);

    if (result > 0) {
      return "expected";
    } else if (result < 0) {
      return "received";
    }

    return "delayed";
  }, [selectedDate, todayDate]);

  const { isPending, error, data } = useQuery({
    queryKey: ["getDaliyPiece", selectedDate],
    queryFn: async () => {
      const pieces = await pieceService.getMonthlyPieces(selectedDate);

      const pieceMap = groupByStatus(selectedDate, pieces);

      if (defaultValue === "received") {
        pieceMap.delayed = undefined;

        return pieceMap;
      }

      if (defaultValue === "expected") {
        pieceMap.delayed = undefined;
        pieceMap.departured = undefined;

        return pieceMap;
      }

      return pieceMap;
    },
    initialData: {},
  });

  return <PieceTable defaultValue={defaultValue} {...data} />;
};

export default SelectedDatePieceTable;
