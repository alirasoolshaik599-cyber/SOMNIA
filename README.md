# 🌙 SOMNIA

A lucid dreaming companion app. Record your dreams, train awareness, prepare your sleep, learn proven induction techniques, and get AI-powered insights into every dream.

**Live demo:** https://somnia-delta-five.vercel.app/

## Features

- **Dream Journal**: write, tag, favorite, edit and browse your dreams, with a timeline view
- **AI Dream Insights**: Gemini analyzes each dream (mood, symbols, themes, lucidity, reflection) and saves the result to your account
- **Awareness**: daily awareness exercises, reality checks and progress tracking
- **Sleep Preparation**: pre-sleep checklist, routine, schedule, dream intention, relaxation exercises, sleep quality log and evening reflection
- **Induction**: guided MILD, WBTB and WILD sessions with practice logging and a technique comparison
- **Mastery**: dream stabilization, dream control and growth insights
- **Learn**: beginner-friendly guides on dream recall, reality checks and lucid dreaming techniques
- **Accounts**: email sign up and login, with each user's data kept private

## Tech Stack

- [Next.js](https://nextjs.org) (App Router) and React
- TypeScript
- Tailwind CSS
- Framer Motion
- [Supabase](https://supabase.com) for authentication and the Postgres database
- [Google Gemini API](https://ai.google.dev) for dream analysis
- Deployed on [Vercel](https://vercel.com)

## Getting Started

1. Clone the repo and install dependencies:

```bash
npm install
```

2. Create a `.env.local` file in the project root:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
GEMINI_API_KEY=your_gemini_api_key
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000).

## Notes

`GEMINI_API_KEY` is only used on the server (in `app/api/analyze-dream`) and is never exposed to the browser.