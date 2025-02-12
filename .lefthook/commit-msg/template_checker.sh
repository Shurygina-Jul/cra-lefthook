# INPUT_FILE=$1
# START_LINE=`head -n1 $INPUT_FILE`
# PATTERN="^(TICKET)-[[:digit:]]+: "
# if ! [[ "$START_LINE" =~ $PATTERN ]]; then
#   echo "Bad commit message, see example: TICKET-123: some text"
#   exit 1
# fi

#!/bin/bash
echo "Checking commit message..."

if ! grep -qE "^(feat|fix|chore|docs|style|refactor|test)\([A-Z]+-[0-9]+\): .+" "$1"; then
  echo "Commit message format is incorrect. It should be in the format 'type(TICKET-123): description'."
  exit 1
fi