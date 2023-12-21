import DarkModeToggle from "@/components/molecules/dark-mode-toggle";
import Nav from "@/components/molecules/nav";

const Header = () => (
  <>
    <header className="fixed bottom-0 z-50 w-full border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex container h-14 items-center justify-between">
        <Nav />
        <DarkModeToggle />
      </div>
    </header>
  </>
);

export default Header;
