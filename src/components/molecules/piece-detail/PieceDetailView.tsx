import Image from "next/image";

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
import { Piece } from "@/entities/piece";

const STATUS_TEXT: { [key in Piece["status"]]: string } = {
  received: "입고중",
  delayed: "출고 예정일이 지남",
  departured: "출고 됨",
};

interface PieceDetailViewProps {
  name: string;
  imgUrl: string;
  submitter: string;
  requester: string | null;
  memo: string;
  label: string[];
  status: Piece["status"];
  receivedDate: string;
  scheduledDepartureDate: string;
  departureDate: string | null;
}

const PieceDetailView = ({
  name,
  status,
  imgUrl,
  submitter,
  requester,
  receivedDate,
  scheduledDepartureDate,
  departureDate,
  memo,
}: PieceDetailViewProps) => (
  <div className="w-full min-w-[320px] p-3 h-auto">
    <Card>
      <div className="overflow-hidden relative pt-4 pl-4 pr-4 pb-0">
        <AspectRatio ratio={4 / 3} className="bg-muted">
          <Image
            className="rounded-md object-cover"
            src={imgUrl}
            alt={name}
            fill
            unoptimized
          />
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
          <p className="text-sm text-muted-foreground">{receivedDate}</p>
        </div>

        <div className="space-y-1">
          <p className="text-sm font-medium leading-none">입출 예정일</p>
          <p className="text-sm text-muted-foreground">
            {scheduledDepartureDate}
          </p>
        </div>

        {departureDate && (
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">입출</p>
            <p className="text-sm text-muted-foreground">{departureDate}</p>
          </div>
        )}

        <div className="space-y-1">
          <p className="text-sm font-medium leading-none">등록자</p>
          <p className="text-sm text-muted-foreground">{submitter}</p>
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
        <Button className="w-full">출고</Button>
      </CardFooter>
    </Card>
  </div>
);

export default PieceDetailView;
