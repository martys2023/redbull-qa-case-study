# Redbull Practice — QA Case Study

> Note: This is a personal practice project completed in preparation for a QA case study interview.

## Overview
This is a practice QA and test automation project to prepare for an upcoming interview. The goal was to get hands on practice with testing a simple web app. The web app used was "The Internet" from Sauce Labs, which is a QA practice playground website.

## Approach
The interview will be testing a dashboard, so I tried to test functionality that I thought would be relevant to a dashboard app (login, data validation, read/write). I tested functions in the order of what I thought would be highest priority. I used Playwright to get practice writing automated tests, and documented my testing in TEST_PLAN.md. 

## Test Coverage
I tested 2 pages of "The Internet": Login and Tables. I ran the following tests on each page:
1. Login
    - Valid username and password
    - Invalid username with valid password
    - Valid username with invalid password
    - Empty username field
    - Empty password field
    - Both fields empty 
2. Tables Page
    - Table rendering
    - Editing and delete functions
    - Data validity

## How to Run the Tests

### Prerequisites
- Node.js (v18 or higher)
- npm

### Installation
```bash
npm install
npx playwright install
```

### Running the Tests
```bash
npx playwright test tests/login.spec.ts
npx playwright test tests/tables.spec.ts
```

## Findings Summary
- No issues found on the Login page.
- The Tables page has no edit or delete functionality implemented: clicking either button only appends a hash to the URL with no resulting action.

## Tools Used
- **Playwright** — industry standard test automation framework with strong TypeScript support and cross-browser testing out of the box
- **TypeScript** — chosen for type safety and relevance to the role