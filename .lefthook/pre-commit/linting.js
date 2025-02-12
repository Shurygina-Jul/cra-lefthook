const { execSync } = require("child_process");

console.log("Start linting!");

try {
  // Получаем список staged файлов
  // --cached сравнивать файлы в индексе с последним коммитом
  // --name-only взять только имена
  // --diff-filter=ACM фильтр по статусу staged файлов A(added) C(copied) M(modified)
  // grep берет файлы только с нужными расширениями
  const files = execSync(
    "git diff --cached --name-only --diff-filter=ACM | grep -E '.js$|.jsx$|.ts$|.tsx$' || true",
    { encoding: "utf8" }
  ).trim();

  if (files) {
    console.log("Files to lint:");
    console.log(files);
    console.log("Running ESLint on: " + files);

    try {
      execSync("yarn lint " + files, { stdio: "inherit" });
      console.log("ESLint passed successfully.");
    } catch (error) {
      console.error("ESLint found errors. Please fix them before committing.");
      process.exit(1);
    }
  } else {
    console.log("No JavaScript or TypeScript files to lint.");
  }
} catch (error) {
  // Обрабатываем ошибку, если git diff или grep завершилась с ошибкой
  console.error("Error while getting changed files:", error.message);
  process.exit(1);
}
