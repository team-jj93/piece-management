import { HTMLAttributes } from "react";
import Link from "next/link";
import { CalendarDays, List } from "lucide-react";

import { cn } from "@/utils";

type AppNavProps = {
  teamId: string;
  classNames?: {
    mobileNav?: string;
    mobileLink?: string;
    desktopNav?: string;
    desktopLink?: string;
  };
  currentURL?: string;
} & HTMLAttributes<HTMLElement>;

const AppNav = ({
  teamId,
  className,
  classNames = {},
  currentURL,
  ...restProps
}: AppNavProps) => {
  const calendarURL = `/team/${teamId}/calendar`;
  const listURL = `/team/${teamId}/piece`;

  return (
    <nav className={cn("w-fit h-fit", className)} {...restProps}>
      <div
        className={cn(
          "md:hidden flex items-center space-x-4 lg:space-x-6",
          classNames.mobileNav
        )}
      >
        <Link
          href={calendarURL}
          className={cn(
            "h-9 w-9 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground",
            classNames.mobileLink
          )}
        >
          <CalendarDays size={19.2} />
        </Link>
        <Link
          href={listURL}
          className={cn(
            "h-9 w-9 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground",
            classNames.mobileLink
          )}
        >
          <List size={19.2} />
        </Link>
      </div>

      <div
        className={cn(
          "hidden md:flex items-center space-x-4 lg:space-x-6",
          classNames.desktopNav
        )}
      >
        <Link
          href={calendarURL}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            { ["text-muted-foreground"]: currentURL !== calendarURL },
            classNames.desktopLink
          )}
        >
          일정
        </Link>
        <Link
          href={listURL}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            { ["text-muted-foreground"]: currentURL !== listURL },
            classNames.desktopLink
          )}
        >
          목록
        </Link>
      </div>
    </nav>
  );
};

export default AppNav;
