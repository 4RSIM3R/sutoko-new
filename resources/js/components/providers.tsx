import { router } from '@inertiajs/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'components/theme-provider';
import React from 'react';
import { RouterProvider } from 'react-aria-components';

export function Providers({ children }: { children: React.ReactNode }) {

    const queryClient = new QueryClient()

    return (
        <RouterProvider navigate={(to, options) => router.visit(to, options as any)}>
            <QueryClientProvider client={queryClient}>
                <ThemeProvider>{children}</ThemeProvider>
            </QueryClientProvider>
        </RouterProvider>
    );
}
