import Link from "next/link";
import { useParams } from "next/navigation";
import { CalendarDays, List } from "lucide-react";

interface NavProps {}

const Nav = ({}: NavProps) => {
  const params = useParams();

  if (!params.teamid) {
    return null;
  }

  return (
    <nav className="flex items-center space-x-4 lg:space-x-6">
      <Link
        href={`/team/${params.teamid}/calendar/month`}
        className="h-9 w-9 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground"
      >
        <CalendarDays size={19.2} />
      </Link>
      <Link
        href={`/team/${params.teamid}/piece`}
        className="h-9 w-9 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground"
      >
        <List size={19.2} />
      </Link>
    </nav>
  );
};

export default Nav;
