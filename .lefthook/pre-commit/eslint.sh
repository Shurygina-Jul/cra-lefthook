#!/bin/bash

echo "Start linting!"


FILES=$(git diff --cached --name-only --diff-filter=ACM | grep -E '.js$|.jsx$|.ts$|.tsx$')
if [ -n "$FILES" ]; then
  echo "Files to lint:"
  echo "$FILES"
  echo "Running ESLint on: $FILES"
  yarn lint $FILES
  ESLINT_EXIT_CODE=$?
  if [ $ESLINT_EXIT_CODE -ne 0 ]; then
    echo "ESLint found errors. Please fix them before committing."
    exit 1
  fi
else
  echo "No JavaScript or TypeScript files to lint."
fi