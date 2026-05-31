#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */

/**
 * Setup Verification Script for DevQuery Forum
 * Checks all environment variables and configurations are correct
 */

const fs = require("fs");
const path = require("path");

const colors = {
  reset: "\x1b[0m",
  green: "\x1b[32m",
  red: "\x1b[31m",
  yellow: "\x1b[33m",
  cyan: "\x1b[36m",
  bold: "\x1b[1m",
};

function log(message, color = "reset") {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function section(title) {
  console.log("\n" + "=".repeat(70));
  log(title, "cyan");
  console.log("=".repeat(70) + "\n");
}

function check(name, condition, required = true) {
  const status = condition ? "✓" : "✗";
  const color = condition ? "green" : required ? "red" : "yellow";
  const requiredText = required ? "(REQUIRED)" : "(optional)";
  log(`${status} ${name} ${requiredText}`, color);
  return condition;
}

// Main verification
let passed = 0;
let failed = 0;
let warnings = 0;

section("SETUP VERIFICATION - DevQuery Forum");

// Check Node.js version
const nodeVersion = process.version;
const nodeVersionOk = parseInt(nodeVersion.slice(1)) >= 18;
if (check("Node.js version >= 18", nodeVersionOk)) passed++;
else failed++;

log(`  Current version: ${nodeVersion}\n`);

// Check .env.local exists
const envLocalPath = path.join(__dirname, ".env.local");
const envLocalExists = fs.existsSync(envLocalPath);
if (check(".env.local file exists", envLocalExists)) passed++;
else failed++;

// Load environment variables
require("dotenv").config({ path: envLocalPath });

section("REQUIRED ENVIRONMENT VARIABLES");

// Database
const dbUrl = process.env.DATABASE_URL;
const dbOk = dbUrl && dbUrl.includes("postgresql");
if (check("DATABASE_URL", dbOk)) passed++;
else failed++;
if (!dbOk) log("  ℹ Format: postgresql://user:password@host:port/dbname\n");

// Auth secrets
const nextAuthSecret = process.env.NEXTAUTH_SECRET;
if (check("NEXTAUTH_SECRET", !!nextAuthSecret)) passed++;
else failed++;

const betterAuthSecret = process.env.BETTER_AUTH_SECRET;
if (check("BETTER_AUTH_SECRET", !!betterAuthSecret)) passed++;
else failed++;

// Inngest
const inngestApiKey = process.env.INNGEST_API_KEY;
const inngestApiKeyOk = inngestApiKey && inngestApiKey.startsWith("inngest_");
if (check("INNGEST_API_KEY", inngestApiKeyOk)) passed++;
else failed++;
if (!inngestApiKeyOk) log("  ℹ Get from: https://app.inngest.com\n");

// OpenAI
const openaiKey = process.env.OPENAI_API_KEY;
const openaiKeyOk = openaiKey && openaiKey.startsWith("sk-");
if (check("OPENAI_API_KEY", openaiKeyOk)) passed++;
else failed++;
if (!openaiKeyOk) log("  ℹ Get from: https://platform.openai.com/api-keys\n");

section("OPTIONAL SERVICES");

// Resend
const resendKey = process.env.RESEND_API_KEY;
if (check("RESEND_API_KEY (emails)", !!resendKey, false)) {
  passed++;
} else {
  warnings++;
  log("  → Signup emails will be disabled\n", "yellow");
}

// AWS S3
const awsRegion = process.env.AWS_REGION;
const awsAccessKey = process.env.AWS_ACCESS_KEY_ID;
const awsSecretKey = process.env.AWS_SECRET_ACCESS_KEY;
const awsS3Bucket = process.env.AWS_S3_BUCKET_NAME;
const awsOk = awsRegion && awsAccessKey && awsSecretKey && awsS3Bucket;
if (check("AWS S3 (image uploads)", awsOk, false)) {
  passed++;
} else {
  warnings++;
  log("  → Image uploads will be disabled\n", "yellow");
}

// Upstash Redis
const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
if (check("UPSTASH_REDIS_REST_URL (caching)", !!redisUrl, false)) {
  passed++;
} else {
  warnings++;
  log("  → Caching will be disabled, rate limiting may not work\n", "yellow");
}

section("APPLICATION CONFIG");

const nodeEnv = process.env.NODE_ENV;
log(`Node Environment: ${nodeEnv || "development"}`);

const appUrl = process.env.NEXT_PUBLIC_APP_URL;
log(`App URL: ${appUrl || "http://localhost:3000"}`);

const enableAi = process.env.NEXT_PUBLIC_ENABLE_AI_ANSWERS;
log(`AI Answers Enabled: ${enableAi !== "false" ? "Yes" : "No"}`);

section("QUICK START");

log("1. Install dependencies:", "bold");
log("   npm install\n");

log("2. Set up database:", "bold");
log("   npm run db:push\n");

log("3. Start development server:", "bold");
log("   npm run dev\n");

log("4. Open in browser:", "bold");
log("   http://localhost:3000\n");

log("5. Start Inngest dev server (in another terminal):", "bold");
log("   npm run inngest\n");

log("6. Monitor jobs:", "bold");
log("   http://localhost:8288\n");

section("SUMMARY");

log(`Passed: ${passed}`, "green");
log(`Warnings: ${warnings}`, warnings > 0 ? "yellow" : "green");
log(`Failed: ${failed}`, failed > 0 ? "red" : "green");

if (failed === 0) {
  log("\n✓ All required configuration is set up!", "green");
  log("Ready to start development!", "bold");
  process.exit(0);
} else {
  log("\n✗ Some required configuration is missing!", "red");
  log("See ENVIRONMENT_SETUP.md for detailed instructions", "yellow");
  process.exit(1);
}
