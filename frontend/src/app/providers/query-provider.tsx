import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import type { ReactNode } from "react";

export const AppQueryProvider = ({ children }: { children: ReactNode }) => {
  // Create a client ensuring data is not refetched immediately on window focus
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Data is considered fresh for 1 minute
            staleTime: 60 * 1000,
            // Don't refetch automatically when switching windows (optional, good for dev)
            refetchOnWindowFocus: false,
            retry: 1,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
