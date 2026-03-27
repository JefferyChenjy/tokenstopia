#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TASKS_DIR="${SCRIPT_DIR}/tasks"
DEFAULT_AGENT="tokenstopia-scout"

agent_id="${DEFAULT_AGENT}"
task_name=""
json_flag=""

usage() {
  cat <<EOF
Usage:
  bash ${SCRIPT_DIR}/run-task.sh
  bash ${SCRIPT_DIR}/run-task.sh <task-name>
  bash ${SCRIPT_DIR}/run-task.sh <task-name> --agent <agent-id> [--json]

Examples:
  bash ${SCRIPT_DIR}/run-task.sh
  bash ${SCRIPT_DIR}/run-task.sh tokenstopia-assessment
  bash ${SCRIPT_DIR}/run-task.sh outreach-post --agent tokenstopia-scout --json
EOF
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    --agent)
      agent_id="${2:-}"
      shift 2
      ;;
    --json)
      json_flag="--json"
      shift
      ;;
    -h|--help)
      usage
      exit 0
      ;;
    *)
      if [[ -z "${task_name}" ]]; then
        task_name="$1"
        shift
      else
        echo "Unexpected argument: $1" >&2
        usage >&2
        exit 1
      fi
      ;;
  esac
done

task_files=()
while IFS= read -r file; do
  task_files+=("${file}")
done < <(find "${TASKS_DIR}" -maxdepth 1 -type f -name '*.md' ! -name 'README.md' -print | sort)

if [[ ${#task_files[@]} -eq 0 ]]; then
  echo "No task templates found in ${TASKS_DIR}" >&2
  exit 1
fi

if [[ -z "${task_name}" ]]; then
  echo "Available tasks:"
  for i in "${!task_files[@]}"; do
    printf "  %d. %s\n" "$((i + 1))" "$(basename "${task_files[$i]}" .md)"
  done
  echo
  read -r -p "Choose a task number: " selection
  if ! [[ "${selection}" =~ ^[0-9]+$ ]] || (( selection < 1 || selection > ${#task_files[@]} )); then
    echo "Invalid selection." >&2
    exit 1
  fi
  task_file="${task_files[$((selection - 1))]}"
else
  task_file="${TASKS_DIR}/${task_name%.md}.md"
  if [[ ! -f "${task_file}" ]]; then
    echo "Task not found: ${task_name}" >&2
    echo "Available tasks:" >&2
    for file in "${task_files[@]}"; do
      echo "  - $(basename "${file}" .md)" >&2
    done
    exit 1
  fi
fi

echo "Running task: $(basename "${task_file}" .md)"
echo "Agent: ${agent_id}"
echo

zsh -lc "source ~/.zshrc >/dev/null 2>&1; openclaw agent --local --agent '${agent_id}' ${json_flag} --message \"\$(cat '${task_file}')\""
