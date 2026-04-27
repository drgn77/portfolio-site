# drgn.dev — Portfolio

Personal developer portfolio built with Next.js 15 and FastAPI.

## Stack
- **Frontend**: Next.js 15, TypeScript, Tailwind CSS
- **Backend**: FastAPI (Python), Anthropic Claude API
- **i18n**: next-intl (PL/EN)

## Run locally

**Frontend:**
```bash
cd portfolio
npm install
npm run dev
```

**Backend:**
```bash
cd chatbot-api
python -m venv venv
venv/Scripts/activate  # Windows
pip install -r requirements.txt
uvicorn main:app --port 8001
```

## Environment variables
- Frontend (`.env.local`): `NEXT_PUBLIC_CHAT_API_URL`
- Backend (`.env`): `ANTHROPIC_API_KEY`
