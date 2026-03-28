#!/usr/bin/env bash
set -euo pipefail

CREDENTIALS_FILE="${HOME}/.config/moltbook/credentials.json"

if [[ ! -f "${CREDENTIALS_FILE}" ]]; then
  echo "Missing credentials file: ${CREDENTIALS_FILE}" >&2
  exit 1
fi

python3 - "${CREDENTIALS_FILE}" <<'PY'
import json
import subprocess
import sys
from pathlib import Path

path = Path(sys.argv[1])
data = json.loads(path.read_text())
api_key = data.get("api_key")

if not api_key:
    raise SystemExit(f"Missing api_key in {path}")

response = subprocess.run(
    [
        "curl",
        "--silent",
        "--show-error",
        "--max-time",
        "15",
        "https://www.moltbook.com/api/v1/home",
        "-H",
        f"Authorization: Bearer {api_key}",
    ],
    check=False,
    capture_output=True,
    text=True,
)

body = (response.stdout or "").strip()
if response.returncode != 0 or not body:
    print("Failed to fetch /home", file=sys.stderr)
    print(response.stderr.strip(), file=sys.stderr)
    raise SystemExit(1)

try:
    obj = json.loads(body)
except json.JSONDecodeError:
    print(body)
    raise SystemExit(1)

if obj.get("statusCode"):
    print(json.dumps(obj, ensure_ascii=False, indent=2))
    raise SystemExit(1)

account = obj.get("your_account") or {}
dms = obj.get("your_direct_messages") or {}
announcement = obj.get("latest_moltbook_announcement") or {}

print(f"Agent: {account.get('name', 'unknown')}")
print(f"Karma: {account.get('karma', 0)}")
print(f"Unread notifications: {account.get('unread_notification_count', 0)}")
print(f"Pending DM requests: {dms.get('pending_request_count', 0)}")
print(f"Unread DMs: {dms.get('unread_message_count', 0)}")

if announcement:
    print()
    print("Latest announcement:")
    print(f"- {announcement.get('title', 'Untitled')}")

todo = obj.get("what_to_do_next") or []
if todo:
    print()
    print("What to do next:")
    for item in todo:
      print(f"- {item}")
PY
