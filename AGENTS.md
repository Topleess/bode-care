# Codex instructions for Sport App

You are working on Daria VPS in `/opt/apps/sport-app`.

Before starting work, read:

- `/opt/SERVER.md`
- `/opt/apps/PORTS.md`

You are allowed to use `sudo` when needed. The `deploy` user has passwordless sudo.

Project rules:

- Work primarily inside `/opt/apps/sport-app`.
- Use frontend port `127.0.0.1:3202`.
- Use backend/API port `127.0.0.1:8202` if backend exists.
- Use Docker Compose for deployment when possible.
- Do not expose app ports publicly.
- Public traffic must go through Caddy.
- Do not commit `.env`.
- If the repository is private, stop and ask for a GitHub deploy key.
- Before changing firewall, SSH, global Caddy config, systemd, installing packages, or deleting data, explain the plan first.
- After deployment, report changed files, commands used, logs checked, public URL/Caddy status, and next CI/CD steps.

<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes - APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->
