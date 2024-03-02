import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

import { useCalendarState } from "@/components/atoms/calendar";
import PieceTable from "@/components/molecules/piece-table";
import { pieceService } from "@/services/piece";

const SelectedDatePieceTable = () => {
  const { selectedDate, selectedDatePosition } = useCalendarState();

  const defaultValue = useMemo(() => {
    if (selectedDatePosition > 0) {
      return "expected";
    } else if (selectedDatePosition < 0) {
      return "received";
    }

    return "delayed";
  }, [selectedDatePosition]);

  const { isPending, error, data } = useQuery({
    queryKey: ["getPiecesByStatus", selectedDate],
    queryFn: async () => {
      const piecesByStatus = await pieceService.getPiecesByStatus(selectedDate);

      if (selectedDatePosition < 0) {
        piecesByStatus.delayed = undefined;

        return piecesByStatus;
      }

      if (selectedDatePosition > 0) {
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
