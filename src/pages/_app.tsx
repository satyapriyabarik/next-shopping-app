import 'bootstrap/dist/css/bootstrap.min.css';
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SkipToContent from '@/components/skipToContent/SkipToContent';
import ErrorBoundary from '@/components/ErrorBoundary/ErrorBoundary';

const queryClient = new QueryClient();
export default function App({ Component, pageProps }: AppProps) {

  return (
    <ErrorBoundary>
      <SkipToContent />
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </ErrorBoundary>

  );
}

