import Image from "next/image";

import type { Piece } from "@/entities/piece";
import AspectRatio from "@/components/atoms/aspect-ratio";
import { Badge } from "@/components/atoms/badge";
import { Button } from "@/components/atoms/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/atoms/card";

const STATUS_TEXT: { [key in Piece["status"]]: string } = {
  received: "입고중",
  delayed: "출고 예정일이 지남",
  departured: "출고 됨",
};

interface PieceDetailProps {
  piece: Piece;
  action?: (piece: Piece) => void;
}

const PieceDetail = ({ piece, action }: PieceDetailProps) => {
  const {
    name,
    status,
    imgUrl,
    author,
    requester,
    receivedDate,
    scheduledDepartureDate,
    departureDate,
    label,
    memo,
  } = piece;

  return (
    <div className="w-full min-w-[320px] p-3 h-auto">
      <Card>
        <div className="overflow-hidden relative pt-4 pl-4 pr-4 pb-0">
          <AspectRatio ratio={4 / 3} className="bg-muted">
            {imgUrl && (
              <Image
                className="rounded-md object-cover"
                src={imgUrl}
                alt={name}
                fill
                unoptimized
              />
            )}
          </AspectRatio>
        </div>

        <CardHeader className="space-y-0 pt-4 pl-4 pr-4 pb-0">
          <CardTitle className="text-base">{name}</CardTitle>

          <div className="w-full h-4" />

          <div className="w-fit h-full flex items-center">
            <Badge
              variant={
                status === "delayed"
                  ? "destructive"
                  : status === "departured"
                    ? "outline"
                    : "default"
              }
            >
              {STATUS_TEXT[status]}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="p-4 flex flex-col gap-3">
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">입고</p>
            <p className="text-sm text-muted-foreground">
              {receivedDate.toLocaleDateString()}
            </p>
          </div>

          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">출고 예정일</p>
            <p className="text-sm text-muted-foreground">
              {scheduledDepartureDate.toLocaleDateString()}
            </p>
          </div>

          {departureDate && (
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">출고</p>
              <p className="text-sm text-muted-foreground">
                {departureDate.toLocaleDateString()}
              </p>
            </div>
          )}

          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">등록자</p>
            <p className="text-sm text-muted-foreground">{author}</p>
          </div>

          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">요청</p>
            <p className="text-sm text-muted-foreground">{requester}</p>
          </div>

          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">메모</p>
            <p className="text-sm text-muted-foreground">{memo}</p>
          </div>
        </CardContent>

        <CardFooter className="p-4">
          <Button className="w-full" onClick={() => action && action(piece)}>
            출고
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PieceDetail;
