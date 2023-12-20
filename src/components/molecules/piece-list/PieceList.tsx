"use client";

import React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import {
  AlertCircle,
  CalendarClock,
  CheckCircle2,
  MoreVertical,
} from "lucide-react";

import PieceDetail from "@/components/molecules/piece-detail";
import type { Piece } from "@/entities/piece";
import {
  Accordion,
  AccordionItem,
  AccordionContent,
} from "@/components/atoms/accordion";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/atoms/tabs";

interface PieceItemProps {
  piece: Piece;
}

const PieceItem = ({ piece }: PieceItemProps) => {
  return (
    <AccordionItem value={piece.id} key={piece.id}>
      <div className="w-full h-fit flex justify-between">
        <AccordionPrimitive.Header className="px-4 flex w-full justify-between gap-4">
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
                  {piece.scheduledDepartureDate}
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
  );
};

interface PieceListProps {
  pieces: Piece[];
}

const PieceList = ({ pieces }: PieceListProps) => {
  return (
    <div className="w-full h-auto">
      <Tabs defaultValue="all" className="w-full">
        <div className="px-4">
          <TabsList>
            <TabsTrigger value="all">전체</TabsTrigger>
            <TabsTrigger value="received">입고</TabsTrigger>
            <TabsTrigger value="delayed">입출 지연</TabsTrigger>
            <TabsTrigger value="departured">입출</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="all">
          <Accordion type="single" collapsible className="w-full">
            {pieces.map((piece) => (
              <PieceItem piece={piece} key={piece.id} />
            ))}
          </Accordion>
        </TabsContent>
        <TabsContent value="received">
          <Accordion type="single" collapsible className="w-full">
            {pieces
              .filter(({ status }) => status === "received")
              .map((piece) => (
                <PieceItem piece={piece} key={piece.id} />
              ))}
          </Accordion>
        </TabsContent>
        <TabsContent value="delayed">
          <Accordion type="single" collapsible className="w-full">
            {pieces
              .filter(({ status }) => status === "delayed")
              .map((piece) => (
                <PieceItem piece={piece} key={piece.id} />
              ))}
          </Accordion>
        </TabsContent>
        <TabsContent value="departured">
          <Accordion type="single" collapsible className="w-full">
            {pieces
              .filter(({ status }) => status === "departured")
              .map((piece) => (
                <PieceItem piece={piece} key={piece.id} />
              ))}
          </Accordion>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PieceList;
