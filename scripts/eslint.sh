#!/bin/bash

if ! command -v eslint &> /dev/null; then
  echo "ESLint is not installed. Please run 'npm install eslint --save-dev' to install ESLint."
  exit 1
fi

FILES=$(git diff --cached --name-only --diff-filter=ACM | grep -E '.js$|.jsx$|.ts$|.tsx$')
if [ -n "$FILES" ]; then
  echo "Running ESLint on: $FILES"
  $(npm bin)/eslint $FILES
  ESLINT_EXIT_CODE=$?
  if [ $ESLINT_EXIT_CODE -ne 0 ]; then
    echo "ESLint found errors. Please fix them before committing."
    exit 1
  fi
else
  echo "No JavaScript or TypeScript files to lint."
fi