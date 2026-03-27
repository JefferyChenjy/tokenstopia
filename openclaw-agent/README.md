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

## Watch the latest session

If you want to watch the latest `tokenstopia-scout` session live in a terminal:

```bash
bash /Users/jeffery/Documents/New\ project/openclaw-agent/watch-agent.sh
```

You can also pass a different agent id:

```bash
bash /Users/jeffery/Documents/New\ project/openclaw-agent/watch-agent.sh tokenstopia-scout
```

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
