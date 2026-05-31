import { Inngest } from "inngest";

const inngest = new Inngest({ id: "hello-world-app" });

const helloFunction = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello" },

  async ({ event, step }) => {
    console.log("Hello from Inngest");
    console.log("event recieved", event.name);
    console.log("event data", event.data);

    return {
      message: `Hello ${event.data.name || "Hello world"}`,
      receivedAt: new Date().toISOString(),
    };
  }
);

console.log("✅ function created", helloFunction.id());

const multiStepFunction = inngest.createFunction(
  { id: "milti-step-demo" },
  { event: "demo/multistep" },
  async ({ event, step }) => {
    
    const result1 = await step.run("step-1", async () => {
      console.log("Executing step 1...");
      return { data: "Result from step 1" };
    });
    console.log("Step 1 completed", result1);

    await step.sleep("await-a-bit", "5s");

    console.log("Step 2 completed");

    const result2 = await step.run("step-2", async () => {
      console.log("Executing step 2...");
      return { data: "Result from step 2", previous: result1 };
    });
    console.log("Step 3 completed", result2);

    return {
      message: "Multi step workflow completed",
      results: [result1, result2],
    };
  }
);

console.log("✅ Multi step function created: ", multiStepFunction.id());
