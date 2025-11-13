import { execSync } from "child_process";

// Define the expected shape of each bundle entry
interface SourceMapStat {
  totalBytes: number;
  [key: string]: unknown;
}

try {
  console.log("🔍 Building app for performance analysis...");
  execSync("next build", { stdio: "inherit" });

  console.log("📦 Analyzing bundle...");
  const output = execSync(
    "npx source-map-explorer --json '.next/static/chunks/*.js'"
  ).toString();

  // Parse JSON safely
  const stats: Record<string, SourceMapStat> = JSON.parse(output);

  // ✅ Properly type reduce call
  const totalBytes = Object.values(stats).reduce<number>(
    (acc, item) => acc + (item.totalBytes ?? 0),
    0
  );

  const totalKB = totalBytes / 1024;

  console.log(`📦 Total JS bundle size: ${totalKB.toFixed(2)} KB`);

  // Threshold (adjust as needed)
  const MAX_SIZE_KB = 900;

  if (totalKB > MAX_SIZE_KB) {
    console.error(
      `❌ Bundle too large (${totalKB.toFixed(
        2
      )} KB). Optimize imports, enable dynamic imports, or use tree-shaking.`
    );
    process.exit(1);
  } else {
    console.log("✅ Bundle size within acceptable limits.");
  }
} catch (err) {
  console.error("🚨 Performance check failed:", err);
  process.exit(1);
}
