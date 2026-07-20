# Contributing to Tubezip

Thank you for your interest in contributing to Tubezip! This guide outlines the project setup, code quality standards, and submission guidelines.

---

## Project Setup

1. **Fork and Clone the Repository:**
   ```bash
   git clone https://github.com/your-username/tubezip.git
   cd tubezip
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   - Copy `.env.example` to `.env`
   - Add your API keys for **Groq** and **YouTube Data API v3**.
   ```bash
   cp .env.example .env
   ```

4. **Run Local Development Server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

5. **Build for Production:**
   ```bash
   npm run build
   ```

---

## Folder Organization Rules

To keep the repository maintainable, strictly organize files as follows:

- `src/components/common/`: Reusable primitive components (buttons, inputs, cards).
- `src/components/landing/`: Layout components specific to the landing homepage (Hero, Features, Footer).
- `src/components/dashboard/`: Core application workspace components (VideoPlayer, SummaryTranscriptTabs, Suggestions).
- `src/lib/`: Client configurations (Supabase connection setups, HTTP clients).
- `public/`: Static files, icons, and favicons.

---

## Branch Naming Conventions

Always create a branch from `main` using the following prefixes:

- `feature/` : New feature implementations (e.g., `feature/notion-sync`)
- `bugfix/`  : Repairing bugs/exceptions (e.g., `bugfix/transcript-parse-fail`)
- `hotfix/`  : Immediate production patches
- `docs/`    : Additions or changes to documentation files (e.g., `docs/add-api-endpoints`)
- `refactor/`: Refactoring code structure without changing features

---

## Commit Conventions

We follow the **Conventional Commits** specification:

- `feat:`     : A new user feature (e.g., `feat: integrate Supabase dashboard history`)
- `fix:`      : A bug repair (e.g., `fix: catch Groq API quota limit errors`)
- `docs:`     : Documentation changes (e.g., `docs: update setup steps in README`)
- `style:`    : Formatting, white-spaces, semi-colons (no code changes)
- `refactor:` : Code restructuring that neither fixes a bug nor adds a feature
- `chore:`    : Building scripts, auxiliary tools, packages (e.g., `chore: bump dependencies`)

**Example Commit Message:**
```bash
git commit -m "feat: add transcript translation into French and Spanish"
```

---

## Pull Request Guidelines

1. **Keep it focused**: One PR should solve exactly one issue or feature.
2. **Sync your branch**: Rebase your branch with `main` before opening the PR.
3. **Verify compilation**: Run `npm run build` locally to verify that it compiles without errors.
4. **Describe changes**: Fill out the Pull Request template detailing:
   - What problem was solved
   - Design choices made (if any)
   - Testing steps performed manually

---

## Coding Standards

- **React Practices**: Use functional components with hooks. Clean up timers, event listeners, and subscriptions inside `useEffect` return blocks.
- **Styling**: Utilize Tailwind CSS classes. Keep styles responsive, using Tailwind viewports (`sm:`, `md:`, `lg:`).
- **TypeScript & Prop Verification**: Ensure React props are destructured cleanly and defaults are defined.
- **Error Handling**: Always wrap API requests and JSON parsers in `try/catch` blocks and show appropriate feedback rather than letting the screen freeze or crash.
