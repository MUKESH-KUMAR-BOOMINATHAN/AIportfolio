# Mukesh's Portfolio Frontend (Next.js + TypeScript + Tailwind)

This is the premium developer portfolio frontend for **Mukeshkumar Boominathan**. It is built with Next.js App Router, Tailwind CSS v4, Framer Motion for premium scroll/mouse-glow animations, and a real-time streaming RAG chatbot client that connects to the FastAPI backend.

## Tech Stack
- **Next.js**: Modern React framework with SSR and App Router.
- **TypeScript**: Type safety across all pages, modules, and component templates.
- **Tailwind CSS v4**: CSS-first design styles, theme tokens, and custom keyframes.
- **Framer Motion**: Page transitions, scroll reveals, cursor tracking, and floating animations.
- **Lucide Icons**: Clean, light icon vectors.

## Project Structure
```
frontend/
├── public/
│   ├── favicon.ico
│   ├── robots.txt
│   ├── sitemap.xml
│   └── resume.pdf           # Overwrite this with your real resume PDF!
├── src/
│   ├── app/
│   │   ├── layout.tsx       # Root layout & Google Fonts configuration
│   │   ├── page.tsx         # Main aggregation landing page
│   │   └── globals.css      # Tailwind v4 configuration, theme variables & animations
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx   # Fixed blur header navigation
│   │   │   └── Footer.tsx   # Bottom info & arrow-up scroll anchor
│   │   ├── sections/
│   │   │   ├── About.tsx    # Narration layout & contact grid
│   │   │   ├── Experience.tsx # Internship timeline panels
│   │   │   ├── Skills.tsx   # Interactive tabs for AI vs core technical skill tags
│   │   │   ├── Projects.tsx # SaaS card listings & architectural modal drawers
│   │   │   ├── BeyondTech.tsx # Impromptu speech, script, debate & adzap awards
│   │   │   └── Certifications.tsx # VEC credentials cards
│   │   └── ui/
│   │       └── HireMukeshAI.tsx # RAG chatbot client (SSE streaming + sources)
```

## Setup & Running Locally

1. **Install Dependencies**:
   Ensure you are in the `/frontend` directory:
   ```bash
   npm install
   ```

2. **Configure Environment Variables**:
   Create a `.env.local` file in `/frontend`:
   ```env
   # Backend FastAPI Service API URL
   NEXT_PUBLIC_API_URL=http://localhost:8000
   ```

3. **Swap Resume PDF**:
   - Replace `/frontend/public/resume.pdf` with your real resume. Keep the name `resume.pdf` so the download CTA links function out-of-the-box.

4. **Start Dev Server**:
   ```bash
   npm run dev
   ```
   The site will be available at `http://localhost:3000`.

## Deployment
This frontend can be deployed easily to **Vercel** via single-click GitHub integrations.
- Set `NEXT_PUBLIC_API_URL` to your production FastAPI backend URL (e.g. `https://mukesh-portfolio-backend.onrender.com`) in Vercel's environment variables dashboard during configuration.
