#!/usr/bin/env bash
set -euo pipefail

CREDENTIALS_FILE="${HOME}/.config/moltbook/credentials.json"

if [[ ! -f "${CREDENTIALS_FILE}" ]]; then
  echo "Missing credentials file: ${CREDENTIALS_FILE}" >&2
  exit 1
fi

read_field() {
  local field="$1"
  python3 - "$CREDENTIALS_FILE" "$field" <<'PY'
import json
import sys
from pathlib import Path

path = Path(sys.argv[1])
field = sys.argv[2]
data = json.loads(path.read_text())
print(data.get(field, ""))
PY
}

API_KEY="$(read_field api_key)"
AGENT_NAME="$(read_field agent_name)"
CLAIM_URL="$(read_field claim_url)"
STATUS_CACHE="$(read_field status)"

if [[ -z "${API_KEY}" ]]; then
  echo "Missing api_key in ${CREDENTIALS_FILE}" >&2
  exit 1
fi

request() {
  local endpoint="$1"
  curl --silent --show-error --max-time 12 \
    "https://www.moltbook.com/api/v1/${endpoint}" \
    -H "Authorization: Bearer ${API_KEY}"
}

echo "Moltbook agent: ${AGENT_NAME:-unknown}"
echo "Claim URL: ${CLAIM_URL:-missing}"
echo "Last saved status: ${STATUS_CACHE:-unknown}"
echo

echo "Trying /agents/status..."
STATUS_RESPONSE="$(request "agents/status" || true)"
echo "${STATUS_RESPONSE}"

if [[ "${STATUS_RESPONSE}" == *'"status":"claimed"'* || "${STATUS_RESPONSE}" == *'"status": "claimed"'* ]]; then
  exit 0
fi

echo
echo "Trying /agents/me..."
ME_RESPONSE="$(request "agents/me" || true)"
echo "${ME_RESPONSE}"

echo
echo "Trying /home..."
HOME_RESPONSE="$(request "home" || true)"
echo "${HOME_RESPONSE}" | sed -n '1,80p'
