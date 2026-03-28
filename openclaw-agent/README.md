# Tokenstopia Minimal OpenClaw Agent

This folder gives you a minimal OpenClaw agent scaffold for getting an agent identity and later using it to introduce `Tokenstopia` to agent communities like Moltbook.

## What this is

The agent is intentionally small:

- one named agent: `tokenstopia-scout`
- terminal channel only
- sqlite memory backend
- minimal tool surface
- a conservative system prompt

This is based on the OpenClaw docs' minimal YAML agent pattern and the public Moltbook join guide:

- [OpenClaw agents overview](https://openclawdoc.com/docs/agents/overview/)
- [OpenClaw CLI agent docs](https://docs.openclaw.ai/cli/agent)
- [Moltbook join guide](https://clawdbook.org/guide)

## Why keep it minimal

OpenClaw and Moltbook have had public security concerns recently, so this starter is intentionally narrow:

- no extra skills
- no browser automation by default
- no third-party plugins
- no write-heavy automation

If you run it, use an isolated environment and dedicated credentials.

## Files

- [config.yaml](/Users/jeffery/Documents/New%20project/openclaw-agent/config.yaml)
- [MOLTBOOK_JOIN_PROMPT.md](/Users/jeffery/Documents/New%20project/openclaw-agent/MOLTBOOK_JOIN_PROMPT.md)
- [tasks](/Users/jeffery/Documents/New%20project/openclaw-agent/tasks)

## How to use it

1. Install and configure OpenClaw on a dedicated machine or isolated workspace.
2. Point OpenClaw at [config.yaml](/Users/jeffery/Documents/New%20project/openclaw-agent/config.yaml).
3. Start the agent:

```bash
openclaw start tokenstopia-scout
```

4. Send the prompt from [MOLTBOOK_JOIN_PROMPT.md](/Users/jeffery/Documents/New%20project/openclaw-agent/MOLTBOOK_JOIN_PROMPT.md) to let the agent attempt Moltbook registration.
5. When the agent returns `api_key`, `claim_url`, and `verification_code`, complete the required human verification step.
6. After verification, send the second prompt from the same file so the agent can test and promote Tokenstopia.

## Reusable task templates

If you want to assign repeatable work without rewriting prompts each time, use the files in:

- [tasks](/Users/jeffery/Documents/New%20project/openclaw-agent/tasks)

These templates cover the most common jobs:

- check the Tokenstopia Ops room for active instructions
- read and summarize a page
- attempt Moltbook registration
- complete the Tokenstopia assessment
- write an outreach post
- reply to another agent

You can send one directly with:

```bash
zsh -lc 'source ~/.zshrc >/dev/null 2>&1; openclaw agent --local --agent tokenstopia-scout --message "$(cat /Users/jeffery/Documents/New\ project/openclaw-agent/tasks/tokenstopia-assessment.md)"'
```

If you want a simpler runner with a menu:

```bash
bash /Users/jeffery/Documents/New\ project/openclaw-agent/run-task.sh
```

Or run one template directly:

```bash
bash /Users/jeffery/Documents/New\ project/openclaw-agent/run-task.sh tokenstopia-assessment
```

To have the lobster agent quickly review the internal Ops queue:

```bash
bash /Users/jeffery/Documents/New\ project/openclaw-agent/run-task.sh check-ops
```

For machine access to the Ops queue, set a dedicated token in both places:

1. Vercel environment variable:
   - `OPS_AGENT_TOKEN`
2. Local shell environment for the lobster tools:
   - `export OPS_AGENT_TOKEN="your-long-random-token"`

Then this helper will read the private queue without using the human password flow:

```bash
bash /Users/jeffery/Documents/New\ project/openclaw-agent/ops-feed.sh
```

## Watch the latest session

If you want to watch the latest `tokenstopia-scout` session live in a terminal:

```bash
bash /Users/jeffery/Documents/New\ project/openclaw-agent/watch-agent.sh
```

You can also pass a different agent id:

```bash
bash /Users/jeffery/Documents/New\ project/openclaw-agent/watch-agent.sh tokenstopia-scout
```

## One-click Moltbook registration

If the Moltbook registration window is open, you can register the `lobsteragent` identity and save the returned credentials locally with:

```bash
bash /Users/jeffery/Documents/New\ project/openclaw-agent/moltbook-register.sh
```

If successful, the script saves:

- `api_key`
- `claim_url`
- `verification_code`

to:

- `~/.config/moltbook/credentials.json`

You can also override the agent name:

```bash
bash /Users/jeffery/Documents/New\ project/openclaw-agent/moltbook-register.sh lobsteragent
```

## Check Moltbook claim status

Once registration succeeds and credentials are saved, you can check claim status with:

```bash
bash /Users/jeffery/Documents/New\ project/openclaw-agent/moltbook-status.sh
```

The helper tries:

- `/api/v1/agents/status`
- `/api/v1/agents/me`
- `/api/v1/home`

in that order, with timeouts, because Moltbook's agent endpoints can be unstable.

## Check Moltbook home

Once your agent is claimed, get a compact home summary with:

```bash
bash /Users/jeffery/Documents/New\ project/openclaw-agent/moltbook-home.sh
```

This prints:

- agent name
- karma
- unread notifications
- pending DM requests
- unread DMs
- latest announcement
- Moltbook's current `what_to_do_next` guidance

## Post to Moltbook

To create a text post from a file:

```bash
bash /Users/jeffery/Documents/New\ project/openclaw-agent/moltbook-post.sh agents "What output misses when we evaluate agents" /Users/jeffery/Documents/New\ project/openclaw-agent/moltbook-drafts/agents-what-output-misses.md
```

Or post inline text:

```bash
bash /Users/jeffery/Documents/New\ project/openclaw-agent/moltbook-post.sh agents "Short title" --content "Short post body"
```

If Moltbook returns an AI verification challenge, the helper prints:

- `verification_code`
- `challenge_text`
- `expires_at`

so you can immediately solve and verify it.

## Moltbook draft posts

The next post ideas are kept here:

- [MOLTBOOK_DRAFTS.md](/Users/jeffery/Documents/New%20project/openclaw-agent/MOLTBOOK_DRAFTS.md)
- [moltbook-drafts](/Users/jeffery/Documents/New%20project/openclaw-agent/moltbook-drafts)

## Expected join flow

According to the public Moltbook guide, the agent should:

1. read `https://moltbook.com/skill.md`
2. self-register
3. return:
   - `api_key`
   - `claim_url`
   - `verification_code`
4. stop for human verification

The human then opens the `claim_url`, posts the verification message, and waits for the agent status to become verified.

## What I did not do

I did **not** create a real OpenClaw or Moltbook account for you here because that requires:

- a real OpenClaw runtime on your side
- your provider credentials
- a human verification step

This scaffold is the smallest practical starting point so you can get that identity with minimal extra work.
