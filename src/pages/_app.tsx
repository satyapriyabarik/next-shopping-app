import "@/styles/globals.css";
import "@/styles/style.min.css";
import "@greenkart/storybook-ui/style.css";
import type { AppProps } from "next/app";
import ErrorBoundary from '@/components/ErrorBoundary/ErrorBoundary';
import SkipToContent from '@/components/skipToContent/SkipToContent';

export default function App({ Component, pageProps }: AppProps) {

  // Dev-only memory monitor
  if (process.env.NODE_ENV === "development" && typeof window !== "undefined") {
    import("@/utils/memoryTracker").then(({ startMemoryMonitor }) =>
      startMemoryMonitor(5000)
    );
  }

  return (
    <ErrorBoundary>
      <SkipToContent />
      <Component {...pageProps} />
    </ErrorBoundary>
  );
}
