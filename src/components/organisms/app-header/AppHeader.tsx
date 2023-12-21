import { useParams, usePathname, useRouter } from "next/navigation";

import AppNav from "@/components/atoms/app-nav";
import DarkModeToggle from "@/components/molecules/dark-mode-toggle";

const AppHeader = () => {
  const { teamId } = useParams();
  const pathName = usePathname();
  const router = useRouter();

  if (!teamId || Array.isArray(teamId)) {
    router.push("/");
    return null;
  }

  return (
    <header className="fixed bottom-0 z-50 w-full border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex container h-14 items-center justify-between">
        <AppNav teamId={teamId} currentURL={pathName} />
        <DarkModeToggle />
      </div>
    </header>
  );
};

export default AppHeader;
