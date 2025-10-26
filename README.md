# Prigela Management

Material and supplier management system built with Next.js 15 and Turso.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Database**: Turso (Edge SQLite)
- **ORM**: Drizzle ORM
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ (Node.js 20+ recommended for Next.js 15)
- npm or yarn
- Turso account (https://turso.tech/)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd prigela-management
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` and add your Turso credentials:
```
TURSO_DATABASE_URL=libsql://your-database.turso.io
TURSO_AUTH_TOKEN=your-auth-token-here
```

### Database Setup

1. Create a Turso database:
```bash
turso db create prigela-management
```

2. Get your database URL:
```bash
turso db show prigela-management --url
```

3. Create an auth token:
```bash
turso db tokens create prigela-management
```

4. Push the schema to your database:
```bash
npm run db:push
```

### Development

Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Database Commands

- `npm run db:generate` - Generate migration files
- `npm run db:migrate` - Run migrations
- `npm run db:push` - Push schema changes to database
- `npm run db:studio` - Open Drizzle Studio (database GUI)

## Deployment

### Deploy to Vercel

1. Push your code to GitHub

2. Import your repository in Vercel

3. Add environment variables in Vercel:
   - `TURSO_DATABASE_URL`
   - `TURSO_AUTH_TOKEN`

4. Deploy!

Alternatively, use the Vercel CLI:
```bash
vercel
```

## Project Structure

```
.
├── app/                  # Next.js App Router
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Home page
│   └── globals.css      # Global styles
├── lib/
│   └── db/              # Database configuration
│       ├── index.ts     # Database client
│       └── schema.ts    # Drizzle schema
├── drizzle/             # Generated migrations
├── drizzle.config.ts    # Drizzle configuration
├── next.config.ts       # Next.js configuration
└── tailwind.config.ts   # Tailwind configuration
```

## License

MIT
