#!/usr/bin/env bash
set -euo pipefail

AGENT_ID="${1:-tokenstopia-scout}"
SESSIONS_DIR="${HOME}/.openclaw/agents/${AGENT_ID}/sessions"

if [[ ! -d "${SESSIONS_DIR}" ]]; then
  echo "Sessions directory not found for agent: ${AGENT_ID}" >&2
  echo "Expected: ${SESSIONS_DIR}" >&2
  exit 1
fi

latest_session_file="$(find "${SESSIONS_DIR}" -maxdepth 1 -type f -name '*.jsonl' -print0 | xargs -0 ls -t 2>/dev/null | head -n 1 || true)"

if [[ -z "${latest_session_file}" ]]; then
  echo "No session log found for agent: ${AGENT_ID}" >&2
  exit 1
fi

echo "Watching agent: ${AGENT_ID}"
echo "Session file: ${latest_session_file}"
echo

tail -f "${latest_session_file}"
