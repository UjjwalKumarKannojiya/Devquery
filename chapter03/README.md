# Chapter 3: Advanced Patterns & Workflows

## 📚 What You'll Learn

Master advanced Inngest patterns used in production applications:

- ✅ Fan-out patterns for parallel processing
- ✅ Complex multi-step workflows
- ✅ Error handling and retries
- ✅ Conditional logic in functions
- ✅ Inter-function communication

---

## 🎯 Learning Objectives

By the end of this chapter:
1. Design fan-out workflows
2. Handle workflow errors gracefully
3. Implement retry strategies
4. Create conditional branching
5. Build complex chains of events

---

## 🚀 Quick Start

```bash
npm install
npm run dev
npm run inngest  # In another terminal
```

---

## 💡 Advanced Patterns

### Pattern 1: Fan-Out (Parallel Processing)

Process multiple tasks in parallel from a single event:

```typescript
export const notifyMultipleChannels = inngest.createFunction(
  { id: 'notify-channels' },
  { event: 'alert/triggered' },
  async ({ event, step }) => {
    // Send to multiple channels in parallel
    const [email, slack, sms] = await Promise.all([
      step.run('send-email', async () => {
        return await sendEmail(event.data.recipient);
      }),
      step.run('send-slack', async () => {
        return await sendSlack(event.data.slackId);
      }),
      step.run('send-sms', async () => {
        return await sendSMS(event.data.phone);
      })
    ]);

    return {
      email: email.success,
      slack: slack.success,
      sms: sms.success
    };
  }
);
```

### Pattern 2: Error Handling with Fallbacks

```typescript
export const robustDataProcessing = inngest.createFunction(
  { id: 'robust-processing' },
  { event: 'data/process' },
  async ({ event, step }) => {
    let data = event.data;

    // Try primary processing
    try {
      data = await step.run('process-primary', async () => {
        return await primaryProcessor(data);
      });
    } catch (error) {
      console.error('Primary processor failed, using fallback');

      // Use fallback processor
      data = await step.run('process-fallback', async () => {
        return await fallbackProcessor(data);
      });
    }

    // Save processed data
    return await step.run('save-result', async () => {
      return await db.save(data);
    });
  }
);
```

### Pattern 3: Conditional Branching

```typescript
export const adaptiveWorkflow = inngest.createFunction(
  { id: 'adaptive-workflow' },
  { event: 'task/received' },
  async ({ event, step }) => {
    const task = event.data;

    // Branch based on task priority
    if (task.priority === 'high') {
      return await step.run('process-high-priority', async () => {
        return await processHighPriority(task);
      });
    } else if (task.priority === 'medium') {
      return await step.run('process-medium-priority', async () => {
        return await processMediumPriority(task);
      });
    } else {
      return await step.run('queue-low-priority', async () => {
        return await queueForLater(task);
      });
    }
  }
);
```

### Pattern 4: Retry Strategies

```typescript
export const retryableFunction = inngest.createFunction(
  {
    id: 'retryable-task',
    retries: 5,  // Retry up to 5 times
    timeout: '15m'  // Timeout after 15 minutes
  },
  { event: 'task/retry' },
  async ({ event, step, attempt }) => {
    console.log(`Attempt ${attempt} of this task`);

    return await step.run('critical-operation', async () => {
      // This will retry automatically if it fails
      return await criticalOperation(event.data);
    });
  }
);
```

### Pattern 5: Chain of Events

Trigger subsequent events to create a workflow chain:

```typescript
export const workflowStart = inngest.createFunction(
  { id: 'workflow-start' },
  { event: 'workflow/begin' },
  async ({ event, step }) => {
    // Do initial work
    const result = await step.run('validate', async () => {
      return await validate(event.data);
    });

    // Trigger next workflow step
    await step.run('trigger-next', async () => {
      return await inngest.send({
        name: 'workflow/step1-complete',
        data: { ...event.data, validated: result }
      });
    });

    return { success: true };
  }
);

export const workflowStep1 = inngest.createFunction(
  { id: 'workflow-step1' },
  { event: 'workflow/step1-complete' },
  async ({ event, step }) => {
    // Continue workflow...
  }
);
```

---

## 🔄 Workflow Patterns

### Workflow: User Onboarding

```typescript
export const userOnboarding = inngest.createFunction(
  { id: 'user-onboarding' },
  { event: 'user/signup' },
  async ({ event, step }) => {
    const { email, userId } = event.data;

    // Step 1: Create database user
    const user = await step.run('create-db-user', async () => {
      return await db.users.create({ email, userId });
    });

    // Step 2: Wait for email confirmation (simulate with delay)
    await step.sleep('wait-for-confirmation', '24h');

    // Step 3: Send verification email
    await step.run('send-verification', async () => {
      return await sendVerificationEmail(email);
    });

    // Step 4: Fan-out: set up user profile tasks
    const [profile, preferences] = await Promise.all([
      step.run('create-profile', async () => {
        return await createDefaultProfile(userId);
      }),
      step.run('create-preferences', async () => {
        return await createDefaultPreferences(userId);
      })
    ]);

    return { user, profile, preferences };
  }
);
```

### Workflow: Multi-Step Approval Process

```typescript
export const approvalWorkflow = inngest.createFunction(
  { id: 'approval-process' },
  { event: 'request/approval' },
  async ({ event, step }) => {
    const request = event.data;

    // Step 1: Validate request
    const isValid = await step.run('validate', async () => {
      return await validateRequest(request);
    });

    if (!isValid) {
      return { status: 'rejected', reason: 'invalid' };
    }

    // Step 2: Send to approvers (fan-out)
    const approvals = await Promise.all([
      step.run('notify-approver-1', async () => {
        return await notifyApprover('approver1', request);
      }),
      step.run('notify-approver-2', async () => {
        return await notifyApprover('approver2', request);
      })
    ]);

    // Step 3: Wait for approval responses
    await step.sleep('wait-approval', '7d');

    // Step 4: Check approval status
    const status = await step.run('check-status', async () => {
      return await checkApprovalStatus(request.id);
    });

    if (status.approved) {
      // Trigger approval event
      await step.run('execute-approval', async () => {
        return await inngest.send({
          name: 'request/approved',
          data: { requestId: request.id, status }
        });
      });
    }

    return { status };
  }
);
```

---

## 🐛 Error Handling Strategies

### Strategy 1: Exponential Backoff

```typescript
export const exponentialBackoffTask = inngest.createFunction(
  {
    id: 'exponential-backoff-task',
    retries: 10,
    timeout: '1h'
  },
  { event: 'external/call' },
  async ({ event, step, attempt }) => {
    // Inngest automatically uses exponential backoff between retries
    return await step.run('call-external-api', async () => {
      return await callExternalAPI(event.data);
    });
  }
);
```

### Strategy 2: Custom Retry Logic

```typescript
export const customRetryTask = inngest.createFunction(
  { id: 'custom-retry' },
  { event: 'task/custom' },
  async ({ event, step }) => {
    let lastError;

    for (let i = 0; i < 3; i++) {
      try {
        return await step.run(`attempt-${i}`, async () => {
          return await unreliableOperation(event.data);
        });
      } catch (error) {
        lastError = error;
        if (i < 2) {
          // Wait before retry
          await step.sleep(`wait-${i}`, `${Math.pow(2, i)}s`);
        }
      }
    }

    throw lastError;
  }
);
```

---

## 📚 Exercises

### Exercise 1: Fan-Out Pattern
Create a function that sends data to three different systems in parallel.

### Exercise 2: Error Recovery
Implement a function with a primary and fallback processing path.

### Exercise 3: Workflow Chain
Create a 3-step workflow where each step triggers the next.

### Exercise 4: Conditional Logic
Build a function that routes work differently based on input data.

---

## 🔗 Next Steps

- Move to **Chapter 4** for enterprise features
- Learn about rate limiting and caching
- Explore production monitoring

---

## 💡 Best Practices

1. **Fail Fast**: Validate early in functions
2. **Clear Names**: Use descriptive step names
3. **Handle Errors**: Always have error handling
4. **Test Branches**: Test all conditional paths
5. **Log Context**: Include relevant data in logs
6. **Timeout Wisely**: Set appropriate timeouts

---

## 📝 Summary

Advanced patterns mastered:
- Fan-out parallel processing
- Complex error handling
- Workflow chains
- Conditional routing
- Retry strategies

**Next:** Production features in Chapter 4!

---

Last Updated: May 2026
