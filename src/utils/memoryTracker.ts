// Define a safe, partial interface for browsers that expose Performance.memory
interface ExtendedPerformance extends Performance {
  memory?: {
    usedJSHeapSize: number;
    totalJSHeapSize?: number;
    jsHeapSizeLimit: number;
  };
}

export function startMemoryMonitor(intervalMs: number = 10000): void {
  if (typeof window === "undefined" || !("performance" in window)) {
    console.warn("Memory tracking not supported in this environment.");
    return;
  }

  const perf = window.performance as ExtendedPerformance;

  if (!perf.memory) {
    console.warn(
      "Performance.memory not available in this browser (only Chrome/Edge support it)."
    );
    return;
  }

  setInterval(() => {
    const used = perf.memory!.usedJSHeapSize / 1024 / 1024;
    const total = perf.memory!.jsHeapSizeLimit / 1024 / 1024;
    console.log(`JS Heap Used: ${used.toFixed(2)} MB / ${total.toFixed(2)} MB`);
  }, intervalMs);
}
