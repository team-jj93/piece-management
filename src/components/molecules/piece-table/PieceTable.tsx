import { ReactNode } from "react";
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

interface PieceAccordionProps {
  pieces?: Piece[];
  defaultValue?: string;
  value: string;
  title: string;
  children: ReactNode;
}

const PieceAccordion = ({
  pieces,
  defaultValue,
  value,
  title,
  children,
}: PieceAccordionProps) => {
  if (!pieces) {
    return null;
  }

  return (
    <Accordion
      type="single"
      defaultValue={defaultValue}
      collapsible
      className="w-full"
    >
      <AccordionItem value={value} className="border-b-0">
        <div className="w-full h-fit">
          <AccordionPrimitive.Header className="border-b px-3">
            <AccordionPrimitive.Trigger className="[&[data-state=closed]>svg]:text-muted-foreground [&[data-state=closed]]:text-muted-foreground [&[data-state=open]]:font-semibold w-full flex justify-between items-center gap-4 px-1 py-4 text-base font-medium text-start transition-all [&[data-state=open]>svg]:rotate-180 overflow-hidden">
              <h3 className="flex justify-start items-center gap-2 w-full leading-none tracking-tight text-ellipsis overflow-hidden">
                {title} {pieces.length !== 0 && `(${pieces.length})`}
                {children}
              </h3>
              <ChevronDownIcon className="h-4 w-4 shrink-0 transition-transform duration-200" />
            </AccordionPrimitive.Trigger>
          </AccordionPrimitive.Header>

          <AccordionContent className="pb-0">
            {pieces.length ? (
              <PieceList pieces={pieces} />
            ) : (
              <div className="flex h-[120px] w-full items-center justify-center text-sm">
                비어 있음.
              </div>
            )}
          </AccordionContent>
        </div>
      </AccordionItem>
    </Accordion>
  );
};

interface PieceTableProps {
  defaultValue?: string;
  received?: Piece[];
  expected?: Piece[];
  delayed?: Piece[];
  departured?: Piece[];
}

const PieceTable = ({
  defaultValue,
  expected,
  delayed,
  received,
  departured,
}: PieceTableProps) => {
  if (!expected && !delayed && !received && !departured) {
    return (
      <div className="flex max-h-[400px] h-[60vh] w-full items-center justify-center text-sm">
        예정된 그림이 없습니다.
      </div>
    );
  }

  return (
    <div className="w-full h-fit">
      <PieceAccordion
        defaultValue={defaultValue}
        pieces={delayed}
        value="delayed"
        title="출고지연"
      >
        <AlertCircle className="text-red-500" size={16} />
      </PieceAccordion>

      <PieceAccordion
        defaultValue={defaultValue}
        pieces={expected}
        value="expected"
        title="출고예정"
      >
        <CalendarClock size={16} />
      </PieceAccordion>

      <PieceAccordion
        defaultValue={defaultValue}
        pieces={received}
        value="received"
        title="입고"
      >
        <Disc2 size={16} />
      </PieceAccordion>

      <PieceAccordion
        defaultValue={defaultValue}
        pieces={departured}
        value="departured"
        title="출고"
      >
        <CheckCircle2 className="text-green-500" size={16} />
      </PieceAccordion>
    </div>
  );
};

export default PieceTable;
