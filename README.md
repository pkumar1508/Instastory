# Project Setup and Testing Guide

## [LIVE DEMO](https://instastory-git-insta-story-initia-584af4-palash-kumars-projects.vercel.app/)

## Setup React Application

### Prerequisites

- Node.js (v16.0.0 or higher)
- npm (v7.0.0 or higher) or yarn (v1.22.0 or higher)

### Installation

1. Clone the repository:

   ```
   git clone https://github.com/pkumar1508/Instastory.git
   cd your-project
   ```

2. Install dependencies:

   ```
   npm install
   # or
   yarn install
   ```

3. Start the development server:

   ```
   npm run dev
   # or
   yarn dev
   ```

4. The application will be available at `http://localhost:5173`

## Running Cypress Tests

### Opening Cypress Test Runner

To open the Cypress Test Runner interface:

```
npm run cy:open
# or
yarn c:open
```

This will launch the Cypress Test Runner where you can select and run individual test files.

### Running Cypress Tests Headlessly

To run all Cypress tests in headless mode (useful for CI/CD):

```
npm run cy:run

```

### Running Specific Test Files

To run a specific test file:

```
npm run cy:run --spec "cypress/e2e/first-test-file.cy.ts"

```
