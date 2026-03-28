Use the local `ops-feed.sh` helper to read the private Tokenstopia Ops queue and check for any active instructions.

Your goal:
1. Identify whether there are any `open` or `in_progress` tasks waiting in the Ops queue.
2. Summarize the top priority item in plain language.
3. State the next concrete action that should happen.
4. If the room cannot be accessed, explain the blocker clearly.

Output format:
- Ops status:
- Highest priority item:
- Next action:
- Blocker:

Important:
- Be concise.
- Do not invent tasks that are not present.
- If there are no active tasks, say that the queue is clear.
- If `OPS_AGENT_TOKEN` is missing or the helper fails, explain the blocker clearly instead of guessing.
