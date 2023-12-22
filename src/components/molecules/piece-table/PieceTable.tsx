import { useMemo } from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import {
  AlertCircle,
  CalendarClock,
  CheckCircle2,
  ChevronDownIcon,
  Disc2,
} from "lucide-react";

import {
  Accordion,
  AccordionItem,
  AccordionContent,
} from "@/components/atoms/accordion";
import { Piece } from "@/entities/piece";
import PieceList from "../piece-list";

interface PieceTableProps {
  pieces: Piece[];
}

// TO-DO
// 입고 상태인 것도 보여줘야 함.
interface PieceMap {
  scheduledDeparture: Piece[];
  delayed: Piece[];
  received: Piece[];
  departured: Piece[];
}

// TO-DO
// 입고, 출고 예정에 맞춰 수정해야 함.
const PieceTable = ({ pieces }: PieceTableProps) => {
  const { scheduledDeparture, delayed, received, departured } = useMemo(() => {
    const pieceTable = pieces.reduce(
      (acc, cur) => {
        acc[cur.status].push(cur);

        return acc;
      },
      {
        scheduledDeparture: [],
        delayed: [],
        departured: [],
        received: [],
      } as PieceMap
    );

    pieceTable.scheduledDeparture = [...pieceTable.received];

    pieceTable.received.sort(
      (a, b) =>
        a.scheduledDepartureDate.getTime() - b.scheduledDepartureDate.getTime()
    );
    pieceTable.delayed.sort(
      (a, b) =>
        a.scheduledDepartureDate.getTime() - b.scheduledDepartureDate.getTime()
    );
    pieceTable.departured
      .filter(({ departureDate }) => departureDate)
      .sort((a, b) => {
        if (!a.departureDate || !b.departureDate) {
          return 0;
        }
        return a.departureDate.getTime() - b.departureDate.getTime();
      });

    return pieceTable;
  }, [pieces]);

  return (
    <div className="w-full h-fit">
      <Accordion
        type="single"
        collapsible
        defaultValue="scheduledDeparture"
        className="w-full"
      >
        <AccordionItem value="scheduledDeparture" className="border-b-0">
          <div className="w-full h-fit">
            <AccordionPrimitive.Header className="border-b px-3">
              <AccordionPrimitive.Trigger className="[&[data-state=closed]>svg]:text-muted-foreground [&[data-state=closed]]:text-muted-foreground [&[data-state=open]]:font-semibold w-full flex justify-between items-center gap-4 px-1 py-4 text-base font-medium text-start transition-all [&[data-state=open]>svg]:rotate-180 overflow-hidden">
                <h3 className="flex justify-start items-center gap-2 w-full leading-none tracking-tight text-ellipsis overflow-hidden">
                  출고 예정{" "}
                  {scheduledDeparture[0] && `(${scheduledDeparture.length})`}
                  <CalendarClock size={16} />
                </h3>
                <ChevronDownIcon className="h-4 w-4 shrink-0 transition-transform duration-200" />
              </AccordionPrimitive.Trigger>
            </AccordionPrimitive.Header>

            <AccordionContent className="pb-0">
              {scheduledDeparture[0] ? (
                <PieceList pieces={scheduledDeparture} />
              ) : (
                <div className="flex h-[120px] w-full items-center justify-center text-sm">
                  비어 있음.
                </div>
              )}
            </AccordionContent>
          </div>
        </AccordionItem>
      </Accordion>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="delayed" className="border-b-0">
          <div className="w-full h-fit">
            <AccordionPrimitive.Header className="border-b px-3">
              <AccordionPrimitive.Trigger className="[&[data-state=closed]>svg]:text-muted-foreground [&[data-state=closed]]:text-muted-foreground [&[data-state=open]]:font-semibold w-full flex justify-between items-center gap-4 px-1 py-4 text-base font-medium text-start transition-all [&[data-state=open]>svg]:rotate-180 overflow-hidden">
                <h3 className="flex justify-start items-center gap-2 w-full leading-none tracking-tight text-ellipsis overflow-hidden">
                  출고 지연 {delayed[0] && `(${delayed.length})`}
                  <AlertCircle className="text-red-500" size={16} />
                </h3>
                <ChevronDownIcon className="h-4 w-4 shrink-0 transition-transform duration-200" />
              </AccordionPrimitive.Trigger>
            </AccordionPrimitive.Header>

            <AccordionContent className="pb-0">
              {delayed[0] ? (
                <PieceList pieces={delayed} />
              ) : (
                <div className="flex h-[120px] w-full items-center justify-center text-sm">
                  비어 있음.
                </div>
              )}
            </AccordionContent>
          </div>
        </AccordionItem>
      </Accordion>

      <Accordion
        type="single"
        collapsible
        defaultValue="received"
        className="w-full"
      >
        <AccordionItem value="received" className="border-b-0">
          <div className="w-full h-fit">
            <AccordionPrimitive.Header className="border-b px-3">
              <AccordionPrimitive.Trigger className="[&[data-state=closed]>svg]:text-muted-foreground [&[data-state=closed]]:text-muted-foreground [&[data-state=open]]:font-semibold w-full flex justify-between items-center gap-4 px-1 py-4 text-base font-medium text-start transition-all [&[data-state=open]>svg]:rotate-180 overflow-hidden">
                <h3 className="flex justify-start items-center gap-2 w-full leading-none tracking-tight text-ellipsis overflow-hidden">
                  입고 {received[0] && `(${received.length})`}
                  <Disc2 size={16} />
                </h3>
                <ChevronDownIcon className="h-4 w-4 shrink-0 transition-transform duration-200" />
              </AccordionPrimitive.Trigger>
            </AccordionPrimitive.Header>

            <AccordionContent className="pb-0">
              {received[0] ? (
                <PieceList pieces={received} />
              ) : (
                <div className="flex h-[120px] w-full items-center justify-center text-sm">
                  비어 있음.
                </div>
              )}
            </AccordionContent>
          </div>
        </AccordionItem>
      </Accordion>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="departured" className="border-b-0">
          <div className="w-full h-fit">
            <AccordionPrimitive.Header className="border-b px-3">
              <AccordionPrimitive.Trigger className="[&[data-state=closed]>svg]:text-muted-foreground [&[data-state=closed]]:text-muted-foreground [&[data-state=open]]:font-semibold w-full flex justify-between items-center gap-4 px-1 py-4 text-base font-medium text-start transition-all [&[data-state=open]>svg]:rotate-180 overflow-hidden">
                <h3 className="flex justify-start items-center gap-2 w-full leading-none tracking-tight text-ellipsis overflow-hidden">
                  출고 {departured[0] && `(${departured.length})`}
                  <CheckCircle2 className="text-green-500" size={16} />
                </h3>
                <ChevronDownIcon className="h-4 w-4 shrink-0 transition-transform duration-200" />
              </AccordionPrimitive.Trigger>
            </AccordionPrimitive.Header>

            <AccordionContent className="pb-0">
              {departured[0] ? (
                <PieceList pieces={departured} />
              ) : (
                <div className="flex h-[120px] w-full items-center justify-center text-sm">
                  비어 있음.
                </div>
              )}
            </AccordionContent>
          </div>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default PieceTable;
