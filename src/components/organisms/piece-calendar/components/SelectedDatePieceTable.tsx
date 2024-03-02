import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

import { compareDate, useCalendarState } from "@/components/atoms/calendar";
import PieceTable from "@/components/molecules/piece-table";
import { pieceService } from "@/services/piece";

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
    queryKey: ["getPiecesByStatus", selectedDate],
    queryFn: async () => {
      const piecesByStatus = await pieceService.getPiecesByStatus(selectedDate);

      if (defaultValue === "received") {
        piecesByStatus.delayed = undefined;

        return piecesByStatus;
      }

      if (defaultValue === "expected") {
        piecesByStatus.delayed = undefined;
        piecesByStatus.departured = undefined;

        return piecesByStatus;
      }

      return piecesByStatus;
    },
    initialData: {},
  });

  return <PieceTable defaultValue={defaultValue} {...data} />;
};

export default SelectedDatePieceTable;
