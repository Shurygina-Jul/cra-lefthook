#!/bin/bash

# Проверяем, что передан файл с сообщением коммита
if [ -z "$1" ]; then
  echo "Missing commit message file."
  exit 1
fi

# Читаем сообщение коммита из файла
commit_message=$(cat "$1")

# Проверяем, начинается ли сообщение с "feat" или "fix"
if [[ ! $commit_message =~ ^(feat|fix): ]]; then
  echo "Commit message format is incorrect. It should start with 'feat:' or 'fix:'."
  exit 1
else
  echo "Commit message format is correct. Proceed with the commit."
fi
