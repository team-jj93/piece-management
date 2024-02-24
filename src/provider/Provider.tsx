import QueryProvider from "./providers/QueryProvider";
import ThemeProvider from "./providers/ThemeProvider";

interface ProviderProps {
  children: React.ReactNode;
}

const Provider = ({ children }: ProviderProps) => (
  <QueryProvider>
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  </QueryProvider>
);

export default Provider;
