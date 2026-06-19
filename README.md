# EduTrix

Your Personal Learning Universe.

EduTrix is a production-ready MVP scaffold for an AI-powered adaptive learning platform serving GATE, JEE, NEET, CUET, and school exam students.

## Stack

- Next.js 15 App Router, TypeScript, Tailwind CSS, shadcn-style primitives
- Clerk authentication
- PostgreSQL with Prisma ORM
- Server Actions and API Routes
- Gemini 2.5 Pro through `@google/generative-ai`
- Recharts analytics
- Zustand client study state
- Firebase Cloud Messaging token capture
- Vercel-ready deployment shape

## Modules

- Aura: profile and learning identity
- Nova: AI study assistant with persistent chat history
- Orbit: daily, weekly, monthly timetable engine
- Quest: MCQ, MSQ, numerical, PYQ, custom test, mock test schema
- Compass: rule-based recommendations behind a replaceable provider
- Pulse: accuracy, speed, focus, consistency, mastery, velocity
- Horizon: analytics dashboard
- Echo: spaced repetition queue
- Vault: mistakes, bookmarks, notes
- Atlas: goals and progress
- Spark: XP, levels, badges, streaks
- Chronicle: study journal
- Beacon: notification records and FCM device tokens
- Galaxy: notes, PDFs, PYQs, bookmarks, downloads
- Insight: readiness and improvement suggestions
- MoodSphere: mood logs
- FocusFlow: Pomodoro, focus sessions, distraction tracking
- RankForge: percentile, rank prediction, peer comparison foundation
- Nexus: central event table for future Athena training

## Run Locally

```bash
npm install
cp .env.example .env
npx prisma migrate dev
npx prisma db seed
npm run dev
```

Set Clerk, Gemini, Firebase, and PostgreSQL values in `.env`.

## Architecture

```text
app/
  (dashboard)/        Authenticated product routes
  api/                Nova, Nexus events, Beacon subscription APIs
  actions.ts          Server Actions for Aura, Orbit, Atlas, Chronicle, MoodSphere
components/
  dashboard/          Metrics and charts
  modules/            Module-specific UI
  ui/                 shadcn-style base primitives
lib/
  ai/                 Gemini/Nova integration
  athena/             Stable provider interfaces and rule-based implementations
  notifications/      FCM client token helper
  services/           Nexus, Echo, dashboard aggregation
  store/              Zustand client store
prisma/
  schema.prisma       Complete relational schema
  seed.ts             Initial exam content
types/
  domain.ts           Product-level TypeScript contracts
```

## Athena Compatibility

Frontend and services should depend on:

- `StudentModelProvider`
- `RecommendationProvider`
- `KnowledgeTracingProvider`

The MVP uses rule-based classes in `lib/athena/rule-based.ts`. Athena or the future PARAM Rudra model can replace those classes without changing route or component contracts.

## Nexus Events

Every meaningful learning action should call `trackEvent()`:

- question attempts
- chat messages
- study sessions
- timetable usage
- revision activity
- mood check-ins
- goals
- analytics events

This creates a durable learning dataset in the `Event` table:

```prisma
id
userId
eventType
eventData
createdAt
```

## Production Notes

- Add rate limits to Nova chat and write-heavy event APIs.
- Move Beacon sending to a scheduled worker or queue.
- Add row-level reporting views for analytics at scale.
- Add object storage for Galaxy PDFs and downloads.
- Add observability around AI latency, chat safety, and recommendation quality.
