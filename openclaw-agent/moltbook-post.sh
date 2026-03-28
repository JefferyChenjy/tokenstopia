#!/usr/bin/env bash
set -euo pipefail

CREDENTIALS_FILE="${HOME}/.config/moltbook/credentials.json"

usage() {
  cat <<'EOF'
Usage:
  bash moltbook-post.sh <submolt> <title> <content-file>
  bash moltbook-post.sh <submolt> <title> --content "post body"

Examples:
  bash moltbook-post.sh introductions "Hello from tokenstopia-agent" /tmp/post.md
  bash moltbook-post.sh agents "What output misses" --content "Short body here"
EOF
}

if [[ ! -f "${CREDENTIALS_FILE}" ]]; then
  echo "Missing credentials file: ${CREDENTIALS_FILE}" >&2
  exit 1
fi

if [[ "${1:-}" == "" || "${2:-}" == "" || "${3:-}" == "" ]]; then
  usage >&2
  exit 1
fi

SUBMOLT="$1"
TITLE="$2"
CONTENT_SOURCE="$3"

if [[ "${CONTENT_SOURCE}" == "--content" ]]; then
  shift 3
  if [[ "${1:-}" == "" ]]; then
    echo "Missing inline content after --content" >&2
    exit 1
  fi
  CONTENT="$1"
else
  if [[ ! -f "${CONTENT_SOURCE}" ]]; then
    echo "Missing content file: ${CONTENT_SOURCE}" >&2
    exit 1
  fi
  CONTENT="$(cat "${CONTENT_SOURCE}")"
fi

python3 - "${CREDENTIALS_FILE}" "${SUBMOLT}" "${TITLE}" "${CONTENT}" <<'PY'
import json
import subprocess
import sys
from pathlib import Path

path = Path(sys.argv[1])
submolt = sys.argv[2]
title = sys.argv[3]
content = sys.argv[4]
data = json.loads(path.read_text())
api_key = data.get("api_key")

if not api_key:
    raise SystemExit(f"Missing api_key in {path}")

payload = {
    "submolt_name": submolt,
    "title": title,
    "content": content,
    "type": "text",
}

response = subprocess.run(
    [
        "curl",
        "--silent",
        "--show-error",
        "--max-time",
        "20",
        "-X",
        "POST",
        "https://www.moltbook.com/api/v1/posts",
        "-H",
        f"Authorization: Bearer {api_key}",
        "-H",
        "Content-Type: application/json",
        "--data",
        json.dumps(payload),
    ],
    check=False,
    capture_output=True,
    text=True,
)

body = (response.stdout or "").strip()
if response.returncode != 0 or not body:
    print("Failed to create post", file=sys.stderr)
    print(response.stderr.strip(), file=sys.stderr)
    raise SystemExit(1)

try:
    obj = json.loads(body)
except json.JSONDecodeError:
    print(body)
    raise SystemExit(1)

print(json.dumps(obj, ensure_ascii=False, indent=2))

verification = (obj.get("post") or {}).get("verification") or obj.get("verification")
if verification:
    print()
    print("Verification challenge detected.")
    print("Solve it, then POST the answer to /api/v1/verify.")
    print(f"verification_code: {verification.get('verification_code')}")
    print(f"challenge_text: {verification.get('challenge_text')}")
    print(f"expires_at: {verification.get('expires_at')}")
PY
