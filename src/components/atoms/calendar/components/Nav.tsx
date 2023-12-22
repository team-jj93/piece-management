import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

import { cn } from "@/utils";

interface NavProps {
  onClickLeft: React.MouseEventHandler<HTMLButtonElement>;
  onClickRight: React.MouseEventHandler<HTMLButtonElement>;
  onClickCenter: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  classNames?: {
    navButton?: string;
    navButtonPrevious?: string;
    navButtonNext?: string;
    navButtonToday?: string;
  };
}

const Nav = ({
  onClickLeft,
  onClickRight,
  onClickCenter,
  className,
  classNames = {},
}: NavProps) => (
  <div
    className={cn(
      "space-x-1 flex items-center h-4 w-fit justify-center box-content pt-1",
      className
    )}
  >
    <button
      type="button"
      onClick={onClickLeft}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input shadow-sm hover:bg-accent hover:text-accent-foreground h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
        classNames.navButton,
        classNames.navButtonPrevious
      )}
    >
      <ChevronLeftIcon className="h-4 w-4" />
    </button>
    <button
      type="button"
      onClick={onClickCenter}
      className={cn(
        "px-3 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input shadow-sm hover:bg-accent hover:text-accent-foreground h-7 w-fit bg-transparent opacity-50 hover:opacity-1001",
        classNames.navButton,
        classNames.navButtonToday
      )}
    >
      오늘
    </button>
    <button
      type="button"
      onClick={onClickRight}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input shadow-sm hover:bg-accent hover:text-accent-foreground h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-1001",
        classNames.navButton,
        classNames.navButtonNext
      )}
    >
      <ChevronRightIcon className="h-4 w-4" />
    </button>
  </div>
);

export default Nav;
