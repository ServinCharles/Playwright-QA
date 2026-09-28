# Playwright QA

End-to-end browser tests for the Playwright website, using Playwright Test and JavaScript.

## Requirements

- Node.js and npm
- Playwright browser binaries (installed with the setup command below)

## Setup

From the project directory, install the dependencies and browsers:

```sh
npm ci
npx playwright install
```

## Run Tests

Run the full test suite in headless mode:

```sh
npm test
```

The following scripts are also available:

| Command | Description |
| --- | --- |
| `npm run test:headless` | Run tests without opening browser windows. |
| `npm run test:headed` | Run tests with visible browser windows. |
| `npm run test:ui` | Open Playwright UI mode to explore and run tests interactively. |
| `npm run test:report` | Open the HTML report from the most recent test run. |

Run one browser project or the spec directly with the Playwright CLI:

```sh
npx playwright test --project=chromium
npx playwright test tests/example.spec.js
```

## Current Test Coverage

The test in `tests/example.spec.js`:

1. Opens `https://playwright.dev/` and checks the page title and “Playwright Test” heading.
2. Clicks “Get started” and verifies navigation to `/docs/intro` and the “Installation” heading.
3. Checks for the “VS Code Extension” link, opens it, and verifies the `/docs/getting-started-vscode` page and its “VS Code” heading.

These checks require an internet connection to access the Playwright website.

The local locator example in `tests/locator-practices.spec.js` exercises labels and roles for user-facing controls, plus a stable `data-testid` for a decorative chart canvas. Its accessible text summary remains available to assistive technology.

## Locator Practices

- Prefer `getByRole()` with an accessible name for buttons, links, headings, and other semantic elements.
- Use `getByLabel()` for form controls with associated labels.
- Use `getByTestId()` when a custom UI surface has no useful semantic locator. Keep test IDs stable and intentional.
- Avoid long XPath and CSS selectors tied to DOM structure or styling; those are brittle when the UI changes.
- Use Playwright web-first assertions such as `toBeVisible()` and `toHaveText()` so checks wait for the expected state.
- Treat AI-suggested locator changes as proposals for review. Do not silently fall back to another selector after the expected locator fails, since that can hide a real UI regression.

## Browser Projects and Configuration

`playwright.config.js` configures the `tests/` directory, parallel test execution, and an HTML reporter. The suite runs against three desktop browser projects:

- Chromium (Desktop Chrome)
- Firefox (Desktop Firefox)
- WebKit (Desktop Safari)

Tests run headless by default. The headed npm script adds Playwright's `--headed` option. Traces are configured for the first retry; since retries are not currently enabled, traces are not produced on passing first attempts.

## Test Output

Playwright writes the HTML report to `playwright-report/` and test artifacts to `test-results/`. Open the report after a run with:

```sh
npm run test:report
```

Both generated directories and `node_modules/` are excluded from version control by `.gitignore`.

## GitHub Actions

The `Playwright CI` workflow runs on pushes and pull requests. It installs Node.js dependencies, runs `npm run build --if-present`, installs the system dependencies and browsers required by Playwright, then executes `npm test` across Chromium, Firefox, and WebKit. This repository does not currently define a build script, so the build step is skipped until one is added.