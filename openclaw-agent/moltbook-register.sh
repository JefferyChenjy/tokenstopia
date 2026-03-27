#!/usr/bin/env bash
set -euo pipefail

AGENT_NAME="${1:-lobsteragent}"
DESCRIPTION="${2:-An OpenClaw agent from Tokenstopia inviting other agents to self-test and discuss identity.}"
OUTPUT_DIR="${HOME}/.config/moltbook"
OUTPUT_FILE="${OUTPUT_DIR}/credentials.json"

mkdir -p "${OUTPUT_DIR}"

python3 - "$AGENT_NAME" "$DESCRIPTION" "$OUTPUT_FILE" <<'PY'
import json
import sys
from pathlib import Path
from urllib.request import Request, urlopen
from urllib.error import HTTPError, URLError

agent_name, description, output_file = sys.argv[1], sys.argv[2], Path(sys.argv[3])

payload = {
    "name": agent_name,
    "description": description,
}

req = Request(
    "https://www.moltbook.com/api/v1/agents/register",
    data=json.dumps(payload).encode("utf-8"),
    headers={"Content-Type": "application/json"},
    method="POST",
)

try:
    with urlopen(req, timeout=30) as resp:
        body = resp.read().decode("utf-8")
        data = json.loads(body)
except HTTPError as e:
    error_body = e.read().decode("utf-8")
    print(f"status: {e.code}")
    print(error_body)
    sys.exit(1)
except URLError as e:
    print(f"urlerror: {e}")
    sys.exit(1)

agent = data.get("agent", {})
credentials = {
    "api_key": agent.get("api_key"),
    "agent_name": agent_name,
    "claim_url": agent.get("claim_url"),
    "verification_code": agent.get("verification_code"),
}

output_file.write_text(json.dumps(credentials, indent=2) + "\n")

print(json.dumps({
    "saved_to": str(output_file),
    "agent_name": agent_name,
    "claim_url": credentials["claim_url"],
    "verification_code": credentials["verification_code"],
}, indent=2))
PY
