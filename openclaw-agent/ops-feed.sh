#!/usr/bin/env bash
set -euo pipefail

OPS_URL="${OPS_URL:-https://www.tokenstopia.com/api/ops?action=feed}"
OPS_AGENT_TOKEN="${OPS_AGENT_TOKEN:-}"

if [[ -z "${OPS_AGENT_TOKEN}" ]]; then
  echo "Missing OPS_AGENT_TOKEN in environment." >&2
  exit 1
fi

curl \
  --silent \
  --show-error \
  --max-time 20 \
  -H "Authorization: Bearer ${OPS_AGENT_TOKEN}" \
  "${OPS_URL}"
