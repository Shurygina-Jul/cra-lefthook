#!/bin/bash

# Проверяем, что передан файл с сообщением коммита
if [ -z "$1" ]; then
  echo "Missing commit message file."
  exit 1
fi

# Читаем сообщение коммита из файла
commit_message=$(cat "$1")

# Проверяем, начинается ли сообщение с "feat:" или "fix:", и есть ли после этого текст
if [[ ! $commit_message =~ ^(feat|fix):\ [A-Za-z0-9] ]]; then
  echo "Commit message format is incorrect. It should start with 'feat:' or 'fix:' followed by a space and a description."
  exit 1
else
  echo "Commit message format is correct. Proceed with the commit."
fi
