import { cn } from "@/utils";
import { Plus } from "lucide-react";
import Link from "next/link";

interface CreatePieceLinkProps {
  className?: string;
}

const CreatePieceLink = ({ className }: CreatePieceLinkProps) => {
  return (
    <div className={cn("w-auto h-auto pointer-events-none", className)}>
      <Link
        className="pointer-events-auto flex justify-center items-center w-10 h-10 rounded-full bg-primary-foreground transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input shadow-sm hover:bg-accent hover:text-accent-foreground"
        href="/team/1/create-piece"
      >
        <Plus size={20} />
      </Link>
    </div>
  );
};

export default CreatePieceLink;
