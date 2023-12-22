import type { Piece } from "@/entities/piece";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/atoms/tabs";
import PieceList from "../piece-list";

interface PieceTabsProps {
  pieces: Piece[];
}

const PieceTabs = ({ pieces }: PieceTabsProps) => {
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
          <PieceList pieces={pieces} />
        </TabsContent>
        <TabsContent value="received">
          <PieceList
            pieces={pieces.filter(({ status }) => status === "received")}
          />
        </TabsContent>
        <TabsContent value="delayed">
          <PieceList
            pieces={pieces.filter(({ status }) => status === "delayed")}
          />
        </TabsContent>
        <TabsContent value="departured">
          <PieceList
            pieces={pieces.filter(({ status }) => status === "departured")}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PieceTabs;
