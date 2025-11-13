import lighthouse from "lighthouse";
import puppeteer from "puppeteer";

(async () => {
  console.log("🚀 Launching headless browser...");
  const browser = await puppeteer.launch({ headless: true });
  const port = new URL(browser.wsEndpoint()).port;

  console.log("📸 Running Lighthouse audit...");
  const result = await lighthouse("http://localhost:3000", {
    port: Number(port),
    output: "json",
    logLevel: "silent",
  });

  // ✅ Runtime and type-safe validation
  if (!result?.lhr) {
    console.error("❌ Lighthouse result is missing LHR data.");
    await browser.close();
    process.exit(1);
  }

  const performanceCategory = result.lhr.categories?.performance;
  const performanceScore =
    typeof performanceCategory?.score === "number"
      ? performanceCategory.score * 100
      : null;

  if (performanceScore === null) {
    console.error("⚠️ Performance score unavailable in Lighthouse result.");
    await browser.close();
    process.exit(1);
  }

  console.log(`⚡ Lighthouse Performance Score: ${performanceScore}`);

  const MIN_SCORE = 80;
  if (performanceScore < MIN_SCORE) {
    console.error(`❌ Performance below ${MIN_SCORE}. Please optimize.`);
    await browser.close();
    process.exit(1);
  } else {
    console.log("✅ Performance within acceptable range.");
  }

  await browser.close();
})();
