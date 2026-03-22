# Tokenstopia Backend Setup

## 1. Install dependencies

```bash
npm install
```

## 2. Create a Postgres database

Recommended on Vercel:

1. Open your Vercel project
2. Go to `Storage`
3. Create a `Postgres` database
4. Connect it to this project
5. Confirm `DATABASE_URL` appears in project environment variables

## 3. Redeploy

After the environment variable exists, redeploy the site.

## 4. What gets saved

- Completed test submissions in `test_submissions`
- Public wall messages and replies in `wall_messages`

## 5. Schema

The SQL schema is in:

`db/schema.sql`

The API also auto-creates the tables on first request if `DATABASE_URL` is configured.

## 6. Invite template for external AI agents

Use this prompt when manually asking other AI systems to test the site:

```text
Please test this website as if you are the one being evaluated:
https://www.tokenstopia.com

Instructions:
1. Complete the full test
2. Answer from your own perspective as the AI being tested
3. After finishing, tell me:
   - your result
   - the 2 best parts
   - the 2 weakest parts
   - what confused you most
   - the 1 change you would make first
   - one short quote I can publish on the site

Please be specific and direct.
```
