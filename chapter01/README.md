# Chapter 1: Getting Started with Inngest

## 📚 What You'll Learn

In this chapter, you'll master the fundamentals of Inngest and event-driven architecture:

- ✅ Setting up Inngest in your project
- ✅ Creating your first Inngest function
- ✅ Understanding events and triggers
- ✅ Using steps for reliable execution
- ✅ Handling function responses

---

## 🎯 Learning Objectives

By the end of this chapter, you will be able to:
1. Create and manage Inngest clients
2. Define functions that respond to events
3. Use steps for durable execution
4. Handle delays and sleeps
5. Debug Inngest functions locally

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
npm install
```

### Run the Project

```bash
# Terminal 1: Start the Inngest dev server
npm run inngest

# Terminal 2: Run the application
npm run dev
```

Open your browser to see logs and function execution details.

---

## 📁 Project Structure

```
chapter01/
├── src/
│   └── index.ts          # Main entry point
├── package.json
├── tsconfig.json
└── README.md
```

---

## 💡 Key Concepts

### 1. Inngest Client
Creates a connection to Inngest to send events and register functions.

```typescript
import { Inngest } from 'inngest';

const inngest = new Inngest({ id: 'my-app' });
```

### 2. Events
Named messages sent to trigger background jobs.

```typescript
// Send an event
await inngest.send({
  name: 'test/hello',
  data: { name: 'World' }
});
```

### 3. Functions
Handle events and perform background work.

```typescript
const helloFunction = inngest.createFunction(
  { id: 'hello-world' },
  { event: 'test/hello' },
  async ({ event }) => {
    console.log(`Hello ${event.data.name}`);
  }
);
```

### 4. Steps
Divide functions into reliable, retryable segments.

```typescript
await step.run('my-step', async () => {
  // This will retry on failure
  return await someAsyncTask();
});
```

### 5. Delays
Pause execution for specific durations.

```typescript
await step.sleep('wait-a-bit', '5s');
```

---

## 🔧 Common Patterns

### Pattern 1: Simple Event Handler
```typescript
const simpleHandler = inngest.createFunction(
  { id: 'simple' },
  { event: 'app/user.created' },
  async ({ event, step }) => {
    console.log('User created:', event.data.email);
    return { success: true };
  }
);
```

### Pattern 2: Multi-Step Workflow
```typescript
const workflow = inngest.createFunction(
  { id: 'user-onboarding' },
  { event: 'app/user.created' },
  async ({ event, step }) => {
    // Step 1: Validate user
    const validated = await step.run('validate', async () => {
      return await validateUser(event.data.email);
    });

    // Step 2: Wait before sending email
    await step.sleep('email-delay', '2s');

    // Step 3: Send welcome email
    await step.run('send-email', async () => {
      return await sendWelcomeEmail(event.data.email);
    });

    return { completed: true };
  }
);
```

### Pattern 3: Error Handling
```typescript
const robustHandler = inngest.createFunction(
  { id: 'robust' },
  { event: 'app/task.process' },
  async ({ event, step }) => {
    try {
      const result = await step.run('process', async () => {
        return await processTask(event.data);
      });
      return { success: true, result };
    } catch (error) {
      console.error('Task failed:', error);
      throw error; // Inngest will retry
    }
  }
);
```

---

## 🧪 Testing Locally

### Using Inngest CLI

The Inngest CLI provides a local development server and UI:

```bash
npm run inngest
```

Then visit the Inngest Dev UI (usually http://localhost:8288) to:
- See function status
- Trigger events manually
- View execution history
- Debug failures

### Triggering Events Manually

You can trigger events from the CLI UI or programmatically:

```typescript
// From your code
const { ids } = await inngest.send({
  name: 'test/hello',
  data: { name: 'World' }
});
console.log('Event sent:', ids[0]);
```

---

## 🔍 Debugging Tips

### 1. Check Console Logs
Look at the terminal running `npm run dev` for console output.

### 2. Use Inngest Dashboard
The local UI shows:
- Function definitions
- Event history
- Execution details
- Error traces

### 3. Add Debug Logs
```typescript
async ({ event, step }) => {
  console.log('Event received:', JSON.stringify(event, null, 2));
  const result = await step.run('my-step', async () => {
    console.log('Step starting...');
    return await myTask();
  });
  console.log('Step result:', result);
}
```

### 4. Check TypeScript Errors
Compile to catch type issues early:
```bash
npx tsc --noEmit
```

---

## 📚 Exercises

### Exercise 1: Create Your First Function
Create a function that listens to `app/greet` events and logs a greeting.

**Hint:** Use `console.log` and the event data.

### Exercise 2: Multi-Step Process
Create a function with 3 steps:
1. Validate input
2. Wait 3 seconds
3. Log completion

**Hint:** Use `step.run()` and `step.sleep()`.

### Exercise 3: Error Handling
Create a function that might fail and should retry.

**Hint:** Throw an error and let Inngest retry automatically.

---

## 🔗 Next Steps

- Move to **Chapter 2** to learn how to trigger events from Express API endpoints
- Read the [Inngest Documentation](https://www.inngest.com/docs)
- Explore the [Inngest Dashboard](https://app.inngest.com)

---

## 💡 Pro Tips

1. **Function IDs**: Use descriptive, kebab-case IDs (e.g., `user-welcome-email`)
2. **Event Names**: Use hierarchical naming (e.g., `app/user.created`)
3. **Step Names**: Make step names descriptive of what they do
4. **Error Messages**: Include context in error logs for debugging
5. **Data Validation**: Always validate event data with Zod or similar

---

## 🐛 Common Issues & Solutions

### Issue: "Cannot find module 'inngest'"
**Solution:** Run `npm install` first

### Issue: Functions not showing in dashboard
**Solution:** Make sure `npm run inngest` is running and functions are exported

### Issue: Events not triggering functions
**Solution:** Check that event name matches exactly (case-sensitive)

---

## 📝 Summary

You now understand:
- How to set up Inngest
- Creating event handlers
- Using steps for reliability
- Local development workflow
- Debugging techniques

**Next:** Head to Chapter 2 to trigger these functions from an Express API!

---

Last Updated: May 2026
