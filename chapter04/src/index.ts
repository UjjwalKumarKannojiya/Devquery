import express from "express";
import { serve } from "inngest/express";
import { inngest } from "./inngest/client";
import { dailySalesReport, abandonedCartRecovery } from "./inngest/functions/scheduled";

const app = express();
const port = 3000;

app.use(express.json({ limit: "4mb" }));

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

app.use(
  "/api/inngest",
  serve({
    client: inngest,
    functions: [dailySalesReport, abandonedCartRecovery],
  })
);

app.get("/", (req, res) => {
  res.json({
    status: "healthy",
    message: "Enterprise Features Server with Scheduled Tasks",
    endpoints: {
      inngest: "/api/inngest",
      health: "/health",
    },
    scheduledFunctions: {
      dailySalesReport: "0 9 * * * (Every day at 9 AM EST)",
      abandonedCartRecovery: "*/2 * * * * (Every 2 hours)",
    },
  });
});

app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

app.listen(port, () => {
  console.log("\n" + "=".repeat(60));
  console.log("🚀 Enterprise Features Server Started");
  console.log("=".repeat(60));
  console.log(`✅ Server: http:
  console.log(`📡 Inngest endpoint: http:
  console.log(`🎛️  Inngest Dev UI: http:
  console.log("=".repeat(60));
  console.log("\nScheduled Functions:");
  console.log("  • dailySalesReport - Runs at 9 AM EST daily");
  console.log("  • abandonedCartRecovery - Runs every 2 hours");
  console.log("=".repeat(60) + "\n");
});
