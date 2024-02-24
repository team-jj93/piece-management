import Image from "next/image";

import * as AccordionPrimitive from "@radix-ui/react-accordion";
import {
  AlertCircle,
  CalendarClock,
  CheckCircle2,
  MoreVertical,
} from "lucide-react";

import type { Piece } from "@/entities/piece";
import {
  Accordion,
  AccordionItem,
  AccordionContent,
} from "@/components/atoms/accordion";
import PieceDetail from "../piece-detail";
import AspectRatio from "@/components/atoms/aspect-ratio";

interface PieceListProps {
  pieces: Piece[];
}

const PieceList = ({ pieces }: PieceListProps) => {
  return (
    <Accordion type="single" collapsible className="w-full">
      {pieces.map((piece) => (
        <AccordionItem value={piece.id} key={piece.id}>
          <div className="w-full h-fit flex justify-between">
            <AccordionPrimitive.Header className="px-4 flex w-full justify-between gap-4">
              <div className="w-12 h-12 overflow-hidden">
                <AspectRatio ratio={1 / 1} className="bg-muted w-full h-full">
                  {piece.imgUrl ? (
                    <Image
                      className="rounded-md object-cover"
                      src={piece.imgUrl}
                      alt={piece.name}
                      fill
                      unoptimized
                    />
                  ) : (
                    <div className="w-full bg-slate-400" />
                  )}
                </AspectRatio>
              </div>
              <AccordionPrimitive.Trigger className="flex-auto flex justify-between items-center gap-4 px-1 py-4 text-sm font-medium transition-all hover:font-bold [&[data-state=open]>svg]:rotate-180 w-10/12 overflow-hidden">
                <div className="flex-auto overflow-hidden flex h-full justify-start gap-4">
                  <h3 className="font-semibold leading-none tracking-tight flex-auto text-ellipsis overflow-hidden">
                    {piece.name}
                  </h3>
                  <div className="flex-none w-4 h-full flex items-center">
                    {piece.status === "delayed" ? (
                      <AlertCircle className="text-red-500 text-xs" size={16} />
                    ) : (
                      piece.status === "departured" && (
                        <CheckCircle2 className="text-green-500" size={16} />
                      )
                    )}
                  </div>
                </div>

                <div className="flex-none">
                  <div className="flex justify-start items-center gap-2">
                    <CalendarClock size={16} />
                    <p className="text-sm text-muted-foreground">
                      {piece.scheduledDepartureDate.toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </AccordionPrimitive.Trigger>
              <button>
                <MoreVertical size={16} />
              </button>
            </AccordionPrimitive.Header>
          </div>

          <AccordionContent>
            <PieceDetail piece={piece} />
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default PieceList;
