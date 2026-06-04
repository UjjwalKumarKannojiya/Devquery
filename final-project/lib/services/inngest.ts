import { Inngest } from "inngest";

export const inngest = new Inngest({
  id: "devquery-forum",
  isDev: process.env.NODE_ENV !== "production",
  baseUrl:
    process.env.NODE_ENV !== "production"
      ? "http://127.0.0.1:8288"
      : undefined,
});