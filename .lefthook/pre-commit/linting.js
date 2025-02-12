const { execSync } = require("child_process");

console.log("Start linting!");

// Получаем список измененных файлов
const files = execSync(
  "git diff --cached --name-only --diff-filter=ACM | grep -E '.js$|.jsx$|.ts$|.tsx$'",
  { encoding: "utf8" }
).trim();

if (files) {
  // Выводим список файлов, которые будут пролинтованы
  console.log("Files to lint:", files);
  // Запускаем ESLint для указанных файлов
  console.log("Running ESLint on: " + files);

  try {
    // Запускаем ESLint с помощью yarn и передаем список файлов
    execSync("yarn lint " + files, { stdio: "inherit" });
    // Выводим сообщение об успешном прохождении ESLint
    console.log("ESLint passed successfully.");
  } catch (error) {
    console.log(error);
    // Выводим сообщение об ошибках ESLint и просим исправить их перед коммитом
    console.error("ESLint found errors. Please fix them before committing.");
    process.exit(1);
  }
} else {
  // если нет файлов для линтинга
  console.log("No JavaScript or TypeScript files to lint.");
}
