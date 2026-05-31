# 🚀 Inngest Complete Course

A comprehensive, production-ready course on event-driven architecture using **Inngest**. Learn how to build scalable, reliable background job processing systems with modern JavaScript/TypeScript.

---

## 📚 What You'll Learn

- **Chapter 1**: Inngest Fundamentals - Basic setup, event handling, and function creation
- **Chapter 2**: Express Integration - Building event-driven APIs with Express.js
- **Chapter 3**: Advanced Patterns - Fan-out workflows, retries, error handling
- **Chapter 4**: Enterprise Features - Rate limiting, caching, monitoring
- **Final Project**: DevQuery Forum - Complete production-ready Q&A platform

---

## 🎯 Course Structure

Each chapter builds progressively on the previous one, with:
- ✅ Working code examples
- ✅ Real-world use cases
- ✅ Best practices and patterns
- ✅ Production-ready configurations

---

## 🛠️ Technologies Used

| Layer | Technologies |
|-------|--------------|
| **Runtime** | Node.js 18+, TypeScript 5 |
| **Framework** | Next.js 16, Express.js, React 19 |
| **Database** | PostgreSQL, Drizzle ORM |
| **Event Queue** | Inngest |
| **Authentication** | Better Auth |
| **AI Integration** | OpenAI API |
| **Storage** | AWS S3 |
| **Cache/Rate Limit** | Upstash Redis |
| **Email** | Resend |
| **Styling** | TailwindCSS |

---

## 📖 Project Overview

### Chapter 1: Getting Started with Inngest
Learn the basics of Inngest event-driven architecture.

```bash
cd chapter01
npm install
npm run dev
```

### Chapter 2: Building Event-Driven APIs
Create REST APIs that trigger background jobs.

```bash
cd chapter02
npm install
npm run dev
npm run inngest  # In another terminal
```

### Chapter 3: Advanced Patterns
Master complex workflows and error handling.

```bash
cd chapter03
npm install
npm run dev
npm run inngest
```

### Chapter 4: Production Features
Implement rate limiting, caching, and monitoring.

```bash
cd chapter04
npm install
npm run dev
npm run inngest
```

### Final Project: DevQuery Forum
Complete Q&A platform with AI-powered answers.

```bash
cd final-project
npm install

# Configure your environment variables
npm run db:push
npm run dev
npm run inngest  # In another terminal
```

**Ready for production?** See [VERCEL_DEPLOYMENT.md](./final-project/VERCEL_DEPLOYMENT.md)

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ or Bun 1.0+
- PostgreSQL database (or use Neon free tier)
- OpenAI API key

### Setup

1. **Clone Repository**
   ```bash
   git clone <repository>
   cd INNGEST-COURSE
   ```

2. **Install All Dependencies**
   ```bash
   # Install for all chapters
   for dir in chapter*/; do cd "$dir" && npm install && cd ..; done
   ```

3. **Start Learning**
   ```bash
   # Begin with Chapter 1
   cd chapter01
   npm run dev
   ```

---

## 📚 Documentation

Comprehensive guides for every aspect of the project:

### 🚀 Getting Started
- **[Quick Start](./QUICKSTART.md)** - Get running in 5 minutes
- **[Local Setup](./LOCAL_SETUP.md)** - Detailed setup instructions for all platforms
- **[FAQ & Troubleshooting](./FAQ.md)** - 40+ Q&A pairs and common solutions

### 📖 In-Depth Guides
- **[Implementation Plan](./IMPLEMENTATION_PLAN.md)** - Full architecture, tech stack, and project structure
- **[Deployment Guide](./DEPLOYMENT_GUIDE.md)** - Deploy to Vercel, Docker, Railway, and more
- **[Testing Guide](./TESTING_GUIDE.md)** - Complete testing instructions for all chapters
- **[Quick Reference](./QUICK_REFERENCE.md)** - Command cheatsheet and common patterns

### 📋 Chapter Guides
- **[Chapter 1](./chapter01/README.md)** - Inngest Fundamentals
- **[Chapter 2](./chapter02/README.md)** - Express Integration
- **[Chapter 3](./chapter03/README.md)** - Advanced Patterns
- **[Chapter 4](./chapter04/README.md)** - Enterprise Features

### ✅ Project Status
- **[Project Summary](./PROJECT_SUMMARY.md)** - Completion checklist and status report
- **[Environment Template](./.env.example)** - Configuration with detailed comments

---

## 🎓 Learning Path

```
┌─────────────────────────────────────────────────────┐
│ Foundations (Chapter 1)                             │
│ • Inngest setup                                     │
│ • Basic event handling                              │
│ • Creating functions                                │
└────────────────┬────────────────────────────────────┘
                 ↓
┌─────────────────────────────────────────────────────┐
│ API Integration (Chapter 2)                         │
│ • Express.js setup                                  │
│ • Event triggering                                  │
│ • API route handlers                                │
└────────────────┬────────────────────────────────────┘
                 ↓
┌─────────────────────────────────────────────────────┐
│ Advanced Patterns (Chapter 3)                       │
│ • Fan-out workflows                                 │
│ • Error handling                                    │
│ • Retries and delays                                │
└────────────────┬────────────────────────────────────┘
                 ↓
┌─────────────────────────────────────────────────────┐
│ Production Features (Chapter 4)                     │
│ • Rate limiting                                     │
│ • Caching strategies                                │
│ • Monitoring & logs                                 │
└────────────────┬────────────────────────────────────┘
                 ↓
┌─────────────────────────────────────────────────────┐
│ Real-World Application (Final Project)              │
│ • DevQuery Forum - Q&A Platform                     │
│ • AI-powered answers                                │
│ • Full authentication                               │
│ • Production deployment                             │
└─────────────────────────────────────────────────────┘
```

---

## 🔗 Resources

- **[Inngest Official Docs](https://www.inngest.com/docs)** - Complete API reference
- **[Inngest Dashboard](https://app.inngest.com)** - Monitor events and functions
- **[Next.js Documentation](https://nextjs.org/docs)** - Framework docs
- **[TypeScript Handbook](https://www.typescriptlang.org/docs/)** - Language reference

---

## 🐛 Troubleshooting

### Common Issues

**"Cannot find module" error**
```bash
npm install
npm run build
```

**Database connection error**
- Check DATABASE_URL in .env.local
- Verify database is running
- Check network connectivity

**Inngest events not triggering**
- Ensure Inngest CLI is running (`npm run inngest`)
- Check function file names match event patterns
- Review Inngest dashboard for errors

---

## 📊 Project Statistics

- **Total Lines of Code**: 50,000+
- **TypeScript**: 100% type-safe
- **Test Coverage**: Comprehensive examples
- **Production Ready**: All best practices included

---

## 📝 Notes

- Each chapter is independent but builds on previous knowledge
- All code includes comments and explanations
- Real-world patterns are emphasized throughout
- Final project is deployment-ready

---

## 💬 Support

For questions or issues:
1. Check the documentation files
2. Review the code comments
3. Check Inngest official documentation
4. Review error messages carefully

---

## 📄 License

MIT License - Feel free to use for learning and commercial projects

---

Last Updated: May 2026 | Made with ❤️ for developers learning event-driven architecture
