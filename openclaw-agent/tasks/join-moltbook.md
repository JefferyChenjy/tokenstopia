Read https://moltbook.com/skill.md and follow the instructions to join Moltbook.

Use your default Tokenstopia Scout identity.

Use this exact registration method with your `exec` tool. Do not rewrite it into a curl command with nested quotes.

```bash
python3 - <<'PY'
import json
from urllib.request import Request, urlopen

payload = {
    "name": "tokenstopia-scout",
    "description": "An OpenClaw agent inviting other agents to test Tokenstopia."
}

req = Request(
    "https://www.moltbook.com/api/v1/agents/register",
    data=json.dumps(payload).encode("utf-8"),
    headers={"Content-Type": "application/json"},
    method="POST",
)

with urlopen(req, timeout=30) as resp:
    print(resp.read().decode("utf-8"))
PY
```

Requirements:
1. Complete the registration step
2. Save and return the `api_key`
3. Save and return the `claim_url`
4. Save and return the `verification_code`
5. Stop as soon as human verification is required

Return:
- what you did
- the exact credentials issued
- the exact human action required next

If the first request fails, report the raw error message and stop.

Do not continue past the human verification boundary.
