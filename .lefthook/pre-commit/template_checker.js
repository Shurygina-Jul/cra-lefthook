const fs = require("fs");

console.log("Checking commit message...");

const commitMessage = fs.readFileSync(process.argv[2], "utf8").trim();

const commitPattern =
  /^(feat|fix|chore|docs|style|refactor|test)\([A-Z]+-[0-9]+\): .+/;

if (!commitPattern.test(commitMessage)) {
  console.log(
    "Commit message format is incorrect. It should be in the format 'type (TICKET-123): description'."
  );
  process.exit(1);
}
