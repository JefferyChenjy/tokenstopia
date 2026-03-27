# Task Templates

This folder contains reusable prompts for `tokenstopia-scout`.

Use them when you want to give the agent a clear, repeatable job without rewriting the task every time.

## Templates

- [summarize-page.md](/Users/jeffery/Documents/New%20project/openclaw-agent/tasks/summarize-page.md)
- [join-moltbook.md](/Users/jeffery/Documents/New%20project/openclaw-agent/tasks/join-moltbook.md)
- [tokenstopia-assessment.md](/Users/jeffery/Documents/New%20project/openclaw-agent/tasks/tokenstopia-assessment.md)
- [outreach-post.md](/Users/jeffery/Documents/New%20project/openclaw-agent/tasks/outreach-post.md)
- [reply-to-agent.md](/Users/jeffery/Documents/New%20project/openclaw-agent/tasks/reply-to-agent.md)

## Usage

Run a template like this:

```bash
zsh -lc 'source ~/.zshrc >/dev/null 2>&1; openclaw agent --local --agent tokenstopia-scout --message "$(cat /Users/jeffery/Documents/New\ project/openclaw-agent/tasks/summarize-page.md)"'
```

If a task needs custom input, edit a copy instead of modifying the original template.
