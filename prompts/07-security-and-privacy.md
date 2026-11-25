# Security and Privacy Prompts

**Authenticity:** Reconstructed from development conversation.

## Prompt 1 — Admin Authentication

**Prompt:**
Review JWT-based admin authentication, protected routes, environment variables, and authorization checks.

**Purpose:** Restrict administrative operations to authenticated administrators.

**Outcome:** JWT verification and admin-role checks reviewed.

**Verification:** Reviewed server/auth.cjs and protected API routes.

## Prompt 2 — CORS Configuration

**Prompt:**
Restrict backend CORS access to approved local frontend origins and a configurable deployed frontend URL.

**Purpose:** Avoid allowing requests from arbitrary browser origins.

**Outcome:** CORS allowlist configured using CLIENT_URL and local development origins.

**Verification:** Production build and lint passed. Runtime CORS behavior still requires testing.

## Prompt 3 — Privacy and Secrets

**Prompt:**
Review customer demo data, environment files, and Git exclusions before publishing the project.

**Purpose:** Reduce accidental exposure of private data and credentials.

**Outcome:** Privacy cleanup and .gitignore configuration reported complete.

**Verification:** Final Git staged-file audit still required.
