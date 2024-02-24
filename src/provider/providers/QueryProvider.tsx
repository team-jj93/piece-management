"use client";

import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { ReactNode } from "react";

const queryClient = new QueryClient();

interface QueryProviderProps {
  children: ReactNode;
}

const QueryProvider = ({ children }: QueryProviderProps) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

export default QueryProvider;
