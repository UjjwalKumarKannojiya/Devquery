# Chapter 4: Enterprise Features & Production Readiness

## 📚 What You'll Learn

Implement production-ready features for enterprise applications:

- ✅ Rate limiting and throttling
- ✅ Caching strategies
- ✅ Monitoring and observability
- ✅ Security best practices
- ✅ Performance optimization

---

## 🎯 Learning Objectives

By the end of this chapter:
1. Implement rate limiting
2. Add caching layers
3. Set up monitoring
4. Secure your functions
5. Optimize performance

---

## 🚀 Quick Start

```bash
npm install
npm run dev
npm run inngest  # In another terminal
```

---

## 💡 Enterprise Patterns

### Pattern 1: Rate Limiting

```typescript
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(10, "1 h"),
});

export const rateLimitedFunction = inngest.createFunction(
  { id: 'rate-limited-task' },
  { event: 'task/rate-limited' },
  async ({ event, step }) => {
    // Check rate limit
    const { success } = await ratelimit.limit(event.data.userId);

    if (!success) {
      throw new Error('Rate limit exceeded');
    }

    return await step.run('process', async () => {
      return await processTask(event.data);
    });
  }
);
```

### Pattern 2: Caching

```typescript
import NodeCache from 'node-cache';

const cache = new NodeCache({ stdTTL: 3600 });

export const cachedFunction = inngest.createFunction(
  { id: 'cached-function' },
  { event: 'data/fetch' },
  async ({ event, step }) => {
    const cacheKey = `data-${event.data.id}`;

    // Check cache first
    const cached = cache.get<any>(cacheKey);
    if (cached) {
      console.log('Cache hit');
      return cached;
    }

    // Fetch and cache
    const result = await step.run('fetch-data', async () => {
      const data = await fetchExpensiveData(event.data.id);
      cache.set(cacheKey, data);
      return data;
    });

    return result;
  }
);
```

### Pattern 3: Monitoring with Sentry

```typescript
import * as Sentry from "@sentry/node";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
});

export const monitoredFunction = inngest.createFunction(
  { id: 'monitored-function' },
  { event: 'task/monitored' },
  async ({ event, step }) => {
    try {
      const result = await step.run('process', async () => {
        return await processTask(event.data);
      });

      // Track successful event
      Sentry.captureMessage(`Task completed: ${event.data.id}`, 'info');
      return result;
    } catch (error) {
      // Track error with context
      Sentry.captureException(error, {
        tags: {
          function: 'monitored-function',
          taskId: event.data.id
        }
      });
      throw error;
    }
  }
);
```

### Pattern 4: Logging Strategy

```typescript
export const wellLogggedFunction = inngest.createFunction(
  { id: 'well-logged-function' },
  { event: 'task/logged' },
  async ({ event, step }) => {
    const startTime = Date.now();

    console.log('📥 Function started', {
      eventId: event.id,
      taskId: event.data.id,
      timestamp: new Date().toISOString()
    });

    try {
      const result = await step.run('process', async () => {
        console.log('⚙️ Processing task...');
        return await processTask(event.data);
      });

      const duration = Date.now() - startTime;
      console.log('✅ Task completed', {
        taskId: event.data.id,
        duration: `${duration}ms`,
        success: true
      });

      return result;
    } catch (error) {
      const duration = Date.now() - startTime;
      console.error('❌ Task failed', {
        taskId: event.data.id,
        duration: `${duration}ms`,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
      throw error;
    }
  }
);
```

### Pattern 5: Input Validation

```typescript
import { z } from 'zod';

const taskSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(5).max(200),
  priority: z.enum(['low', 'medium', 'high']),
  email: z.string().email()
});

export const validatedFunction = inngest.createFunction(
  { id: 'validated-function' },
  { event: 'task/validated' },
  async ({ event, step }) => {
    // Validate input
    const validatedData = taskSchema.parse(event.data);

    return await step.run('process', async () => {
      return await processTask(validatedData);
    });
  }
);
```

---

## 🔐 Security Best Practices

### 1. Environment Variables
```typescript
// ✅ Good
const apiKey = process.env.EXTERNAL_API_KEY;

// ❌ Never hardcode secrets
// const apiKey = 'sk-1234567890';
```

### 2. Input Validation
```typescript
// Always validate external input
const schema = z.object({
  email: z.string().email(),
  amount: z.number().positive()
});

schema.parse(event.data);
```

### 3. Error Messages
```typescript
// ✅ Good - generic error
throw new Error('Payment failed');

// ❌ Bad - exposes details
throw new Error('Payment failed: Card declined - insufficient funds');
```

### 4. Sensitive Data
```typescript
// ✅ Don't log sensitive data
console.log('Processing payment');

// ❌ Never log
console.log('Processing card:', cardNumber);
```

---

## 📊 Performance Optimization

### Optimization 1: Connection Pooling

```typescript
import { Pool } from 'pg';

const pool = new Pool({
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Use throughout your functions
```

### Optimization 2: Batch Processing

```typescript
export const batchProcessor = inngest.createFunction(
  { id: 'batch-processor' },
  { event: 'batch/process' },
  async ({ event, step }) => {
    const items = event.data.items;

    // Process in batches of 100
    const batchSize = 100;
    const results = [];

    for (let i = 0; i < items.length; i += batchSize) {
      const batch = items.slice(i, i + batchSize);
      const result = await step.run(`process-batch-${i}`, async () => {
        return await processBatch(batch);
      });
      results.push(result);
    }

    return { processed: results.length };
  }
);
```

### Optimization 3: Lazy Loading

```typescript
export const lazyLoadedFunction = inngest.createFunction(
  { id: 'lazy-loaded' },
  { event: 'data/lazy' },
  async ({ event, step }) => {
    // Load expensive data only if needed
    let expensiveData;

    return await step.run('process', async () => {
      if (needsExpensiveData(event.data)) {
        expensiveData = await loadExpensiveData();
      }
      return await processTask(event.data, expensiveData);
    });
  }
);
```

---

## 📈 Monitoring Setup

### Inngest Dashboard

1. Visit `http://localhost:8288`
2. Monitor function performance
3. Track failure rates
4. View execution history
5. Debug issues

### Custom Metrics

```typescript
export const metricsFunction = inngest.createFunction(
  { id: 'metrics-function' },
  { event: 'task/metrics' },
  async ({ event, step }) => {
    const metrics = {
      startTime: Date.now(),
      eventId: event.id,
      userId: event.data.userId
    };

    try {
      const result = await step.run('process', async () => {
        return await processTask(event.data);
      });

      metrics.endTime = Date.now();
      metrics.duration = metrics.endTime - metrics.startTime;
      metrics.success = true;

      // Send metrics (to DataDog, New Relic, etc.)
      await sendMetrics(metrics);

      return result;
    } catch (error) {
      metrics.endTime = Date.now();
      metrics.error = true;
      await sendMetrics(metrics);
      throw error;
    }
  }
);
```

---

## 🧪 Testing Patterns

### Unit Testing

```typescript
import { describe, it, expect } from 'vitest';

describe('validation', () => {
  it('should validate task data', () => {
    const data = { id: '123', title: 'Test Task' };
    const result = taskSchema.safeParse(data);
    expect(result.success).toBe(true);
  });
});
```

### Integration Testing

```typescript
describe('event processing', () => {
  it('should process event successfully', async () => {
    const result = await testEventHandler({
      name: 'task/created',
      data: { id: '123' }
    });

    expect(result.success).toBe(true);
  });
});
```

---

## 📚 Exercises

### Exercise 1: Rate Limiting
Add rate limiting to prevent abuse.

### Exercise 2: Caching
Implement caching for frequently accessed data.

### Exercise 3: Monitoring
Set up Sentry for error tracking.

### Exercise 4: Validation
Add comprehensive input validation.

---

## 🔗 Resources

- [Sentry Documentation](https://docs.sentry.io/)
- [Upstash Documentation](https://upstash.com/docs)
- [Zod Validation](https://zod.dev)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)

---

## 💡 Production Checklist

- [ ] Rate limiting configured
- [ ] Caching implemented
- [ ] Monitoring set up
- [ ] Input validation in place
- [ ] Error handling complete
- [ ] Logging configured
- [ ] Security reviewed
- [ ] Performance tested
- [ ] Secrets management configured

---

## 📝 Summary

Enterprise features implemented:
- Rate limiting
- Caching strategies
- Comprehensive monitoring
- Security best practices
- Performance optimization

**Next:** Build the Final Project!

---

Last Updated: May 2026
