# Chapter 2: Building Event-Driven APIs with Express

## 📚 What You'll Learn

Build production-ready APIs that integrate with Inngest for background job processing:

- ✅ Setting up Express with Inngest
- ✅ Creating API endpoints that trigger events
- ✅ Using Inngest serve middleware
- ✅ Testing event-driven flows
- ✅ Best practices for API design

---

## 🎯 Learning Objectives

By the end of this chapter, you will be able to:
1. Set up Express server with Inngest integration
2. Create API endpoints that send events
3. Use `serve()` middleware for Inngest
4. Handle async operations in endpoints
5. Structure event-driven APIs professionally

---

## 🚀 Quick Start

### Installation

```bash
npm install
```

### Run the Project

```bash
# Terminal 1: Start Inngest dev server
npm run inngest

# Terminal 2: Start Express server
npm run dev
```

The API will be available at `http://localhost:3000`

---

## 📁 Project Structure

```
chapter02/
├── src/
│   ├── index.ts              # Express server setup
│   └── inngest/
│       ├── client.ts         # Inngest client
│       └── functions.ts      # Event handlers
├── package.json
├── tsconfig.json
└── README.md
```

---

## 💡 Key Concepts

### 1. Express with Inngest

```typescript
import express from 'express';
import { serve } from 'inngest/express';
import { inngest } from './inngest/client';

const app = express();

// Register Inngest serve middleware
app.use(
  '/api/inngest',
  serve({
    client: inngest,
    functions: [/* your functions */]
  })
);
```

### 2. Triggering Events

```typescript
app.post('/questions', async (req, res) => {
  const { title, description } = req.body;

  // Send event to Inngest
  const { ids } = await inngest.send({
    name: 'question/created',
    data: { title, description }
  });

  res.json({
    message: 'Question submitted',
    eventId: ids[0]
  });
});
```

### 3. Event Handlers

```typescript
export const generateAnswer = inngest.createFunction(
  { id: 'generate-answer' },
  { event: 'question/created' },
  async ({ event, step }) => {
    // Generate AI answer
    const answer = await step.run('generate', async () => {
      return await callOpenAI(event.data.title);
    });

    // Save to database
    await step.run('save', async () => {
      return await db.answers.create(answer);
    });

    return { success: true };
  }
);
```

---

## 🏗️ API Design Patterns

### Pattern 1: Simple Event Trigger

```typescript
// POST /api/subscribe
app.post('/subscribe', async (req, res) => {
  const { email } = req.body;

  try {
    await inngest.send({
      name: 'user/subscribed',
      data: { email }
    });

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to subscribe' });
  }
});
```

### Pattern 2: Multiple Related Events

```typescript
// POST /api/comments
app.post('/comments', async (req, res) => {
  const { questionId, text, userId } = req.body;

  // Send multiple related events
  const { ids } = await inngest.send([
    {
      name: 'comment/created',
      data: { questionId, text, userId }
    },
    {
      name: 'notification/send',
      data: { type: 'new_comment', questionId }
    }
  ]);

  res.json({ success: true, eventIds: ids });
});
```

### Pattern 3: Batch Processing

```typescript
// POST /api/bulk-import
app.post('/bulk-import', async (req, res) => {
  const { items } = req.body;

  const events = items.map(item => ({
    name: 'item/imported',
    data: item
  }));

  await inngest.send(events);

  res.json({
    message: `${events.length} items queued for processing`
  });
});
```

---

## 🔧 Middleware & Error Handling

### Request Validation

```typescript
import { z } from 'zod';

const questionSchema = z.object({
  title: z.string().min(10),
  description: z.string().min(20)
});

app.post('/questions', async (req, res) => {
  try {
    const data = questionSchema.parse(req.body);
    await inngest.send({
      name: 'question/created',
      data
    });
    res.json({ success: true });
  } catch (error) {
    res.status(400).json({ error: 'Invalid input' });
  }
});
```

### Error Handling

```typescript
app.post('/api/process', async (req, res) => {
  try {
    const { ids } = await inngest.send({
      name: 'process/start',
      data: req.body
    });

    res.json({ eventId: ids[0] });
  } catch (error) {
    console.error('Event send failed:', error);
    res.status(500).json({
      error: 'Failed to queue event',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});
```

---

## 🧪 Testing the API

### Manual Testing with cURL

```bash
# Trigger a question creation
curl -X POST http://localhost:3000/api/questions \
  -H "Content-Type: application/json" \
  -d '{
    "title": "How to build APIs?",
    "description": "I want to learn API development"
  }'

# Trigger bulk event
curl -X POST http://localhost:3000/api/bulk-import \
  -H "Content-Type: application/json" \
  -d '{
    "items": [
      { "name": "item1", "value": 10 },
      { "name": "item2", "value": 20 }
    ]
  }'
```

### Using Fetch in Browser Console

```javascript
// Subscribe to updates
fetch('http://localhost:3000/api/subscribe', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email: 'user@example.com' })
})
.then(res => res.json())
.then(data => console.log('Subscribed:', data))
.catch(err => console.error('Error:', err));
```

---

## 📊 API Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/api/questions` | Submit new question |
| GET | `/api/health` | Check server status |
| POST | `/api/subscribe` | Subscribe for updates |
| POST | `/inngest` | Inngest webhook handler |

---

## 🔍 Monitoring

### Check Inngest Dashboard

1. Visit `http://localhost:8288`
2. View function definitions
3. Check recent events
4. See execution logs
5. Debug failures

### Console Logging

```typescript
console.log('📝 Question received:', title);
console.log('🚀 Event sent with ID:', ids[0]);
console.log('✅ Processing complete');
```

---

## 🔐 Production Considerations

1. **Input Validation**: Always validate request data
2. **Error Handling**: Never expose internal errors
3. **Rate Limiting**: Implement rate limits for endpoints
4. **Logging**: Log important events and errors
5. **Monitoring**: Track API performance
6. **Security**: Use HTTPS in production
7. **Authentication**: Add auth to sensitive endpoints

---

## 📚 Exercises

### Exercise 1: Create a Notification API
Build an endpoint `/api/notify` that sends a `notification/send` event.

### Exercise 2: Add Validation
Add Zod schema validation to your endpoints.

### Exercise 3: Bulk Operations
Create an endpoint that accepts multiple items and sends batch events.

---

## 🔗 Next Steps

- Move to **Chapter 3** for advanced patterns
- Learn about error handling and retries
- Explore fan-out workflows

---

## 💡 Best Practices

1. **Be Consistent**: Use consistent naming conventions
2. **Validate Early**: Validate all inputs
3. **Log Wisely**: Log errors and important operations
4. **Handle Errors**: Always catch and handle errors
5. **Document Endpoints**: Add comments explaining each endpoint
6. **Test Thoroughly**: Test all code paths

---

## 🐛 Common Issues

### Issue: "Cannot POST /api/inngest"
**Solution:** Make sure `serve()` middleware is set up correctly

### Issue: Events not processing
**Solution:** Verify functions are exported and Inngest CLI is running

### Issue: "Connection refused"
**Solution:** Ensure Inngest dev server is running on correct port

---

## 📝 Summary

You now know how to:
- Build Express servers with Inngest
- Create event-triggered APIs
- Handle multiple events
- Validate and error handle
- Test API endpoints

**Next:** Learn advanced patterns in Chapter 3!

---

Last Updated: May 2026
