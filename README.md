# Red Bull Digital Poster Services — QA Case Study

## Overview
This repository contains automated QA tests written as part of a case study for the Red Bull Digital Poster Services QA & Product Operations Engineer role. The case study covers two tasks:

- **Task 1:** Filter functionality testing on the Devices dashboard
- **Task 2:** API testing for the `POST /api/devices/command` endpoint

## Test Coverage

### Task 1: Device Table Filters (`tests/filters.spec.ts`)
Automated tests covering the filter functionality on the Devices dashboard table, including individual filters, combined AND logic, and empty state verification.

- Status filter (Online, Offline)
- Core Services filter (Up to Date, Outdated)
- Orientation filter (Portrait, Landscape)
- Combined filters (4 multi-filter combinations including a three-way combination)
- Empty state (zero results)

### Task 2: API — POST /api/devices/command (`tests/api.spec.ts`)
Automated tests covering the full acceptance criteria for the device command endpoint.

- Valid request with online device → 200 success, device status verified
- Request targeting offline device → error response
- Unsupported command name → 400 validation error
- Missing Authorization header → 401
- Invalid Authorization token → 401

### Login (`tests/login.spec.ts`)
Automated tests covering authentication for both user accounts.

- Valid credentials → dashboard loads
- Invalid password → error displayed
- Invalid email → error displayed
- Empty fields → error displayed

## How to Run the Tests

### Prerequisites
- Node.js (v18 or higher)
- npm

### Installation
```bash
npm install
npx playwright install
```

### Running All Tests
```bash
npx playwright test
```

### Running a Specific Test File
```bash
npx playwright test tests/filters.spec.ts
npx playwright test tests/api.spec.ts
npx playwright test tests/login.spec.ts
```

### Running in a Specific Browser
```bash
npx playwright test --project=chromium
```

## Test Plan
See `TEST_PLAN.md` for full manual and automated test case documentation, bug findings, and questions for product & development.

## Tools Used
- **Playwright** — cross-browser test automation framework with TypeScript support
- **TypeScript** — type safety and alignment with the role's technical requirements