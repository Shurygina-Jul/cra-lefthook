#!/bin/bash

# Читаем сообщение коммита из файла (путь передан как $1)
commit_message=$(cat "$1")

# Проверяем формат сообщения: должно начинаться с 'feat:' или 'fix:' с последующим текстом
if [[ ! $commit_message =~ ^(feat|fix)\ \([A-Z]+-[0-9]+\):\ .+ ]]; then
  echo "Commit message format is incorrect. It should follow the pattern 'feat (ABCD-1234): commit message' or 'fix (ABCD-1234): commit message'."
  exit 1
else
  echo "Commit message format is correct. Proceed with the commit."
fi
