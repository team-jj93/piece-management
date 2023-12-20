import type { Piece } from "@/entities/piece";
import PieceDetailView from "./PieceDetailView";

interface PieceDetailProps {
  piece: Piece;
}

const PieceDetail = ({
  piece: {
    name,
    status,
    imgUrl,
    submitter,
    requester,
    receivedDate,
    scheduledDepartureDate,
    departureDate,
    label,
    memo,
  },
}: PieceDetailProps) => {
  const props = {
    name,
    status,
    imgUrl,
    submitter,
    requester,
    receivedDate,
    scheduledDepartureDate,
    departureDate,
    label,
    memo,
  };

  return <PieceDetailView {...props} />;
};

export default PieceDetail;
