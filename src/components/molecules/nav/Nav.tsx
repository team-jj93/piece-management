import Link from "next/link";
import { useParams } from "next/navigation";
import { CalendarDays, List } from "lucide-react";

import { cn } from "@/utils";

const Nav = ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => {
  const params = useParams();

  if (!params.teamId) {
    return null;
  }

  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Link
        href={`/team/${params.teamId}/calendar/month`}
        className="h-9 w-9 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground"
      >
        <CalendarDays size={19.2} />
      </Link>
      <Link
        href={`/team/${params.teamId}/piece`}
        className="h-9 w-9 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground"
      >
        <List size={19.2} />
      </Link>
    </nav>
  );
};

export default Nav;
