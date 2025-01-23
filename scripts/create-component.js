import { existsSync, mkdirSync, writeFileSync } from "fs";
import { resolve, join, dirname, isAbsolute } from "path";
import { fileURLToPath } from "url";

// Получение текущего пути к файлу и директории
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Директория по умолчанию для компонентов
const DEFAULT_COMPONENTS_DIR = resolve(__dirname, "../src");

// Определение директории для компонентов
const getComponentsDir = (inputPath) => {
  return inputPath
    ? isAbsolute(inputPath)
      ? inputPath
      : resolve(__dirname, inputPath)
    : DEFAULT_COMPONENTS_DIR;
};

// Шаблоны файлов компонентов
const TEMPLATES = {
  "index.tsx": (name) =>
    `function ${name}() {\n  return (<>${name}</>);\n}\n\nexport default ${name};`,
  "interface.ts": (name) => `export interface I${name} {}\n`,
  "styles.ts": () =>
    `import tw, { styled } from "twin.macro";\n\nexport const ComponentStyled = styled.div\`\`;`,
  "default.ts": (_, fileName) => {
    const trimmedFileName = fileName.split(".")[0];
    return `function ${trimmedFileName}() {}\n\nexport default ${trimmedFileName};`;
  },
};

// Генерация содержимого файла на основе шаблона
const generateFileContent = (fileName, name) => {
  const templateFunction = TEMPLATES[fileName] || TEMPLATES["default.ts"];
  return templateFunction(name, fileName);
};

// Генерация файлов компонента
const generateComponentFiles = (name, files, componentDir) => {
  files.forEach((fileName) => {
    const content = generateFileContent(fileName, name);
    const filePath = join(componentDir, fileName);
    console.log("Generating file:", filePath);
    writeFileSync(filePath, content);
  });
};

// Создание директории компонента
const createComponentDirectory = (name, componentsDir) => {
  const componentDir = join(componentsDir, name);
  console.log("Creating component directory:", componentDir);

  if (existsSync(componentDir)) {
    console.error(`❌ Компонент "${name}" уже существует.`);
    process.exit(1);
  }

  mkdirSync(componentDir, { recursive: true });
  return componentDir;
};

// Генерация компонента
const generateComponent = (name, files, componentsDir) => {
  const componentDir = createComponentDirectory(name, componentsDir);
  generateComponentFiles(name, files, componentDir);

  console.log(
    `✅ Компонент "${name}" был успешно создан в "${componentDir}" с файлами: ${
      files.length ? files.join(", ") : "index.tsx, interface.ts"
    }`
  );
};

// Определение, является ли аргумент файлом
const isFileName = (arg) => {
  const validExtensions = [
    ".js",
    ".jsx",
    ".ts",
    ".tsx",
    ".css",
    ".scss",
    ".sass",
    ".less",
    ".module.css",
    ".module.scss",
    ".module.sass",
    ".svg",
    ".png",
    ".jpg",
    ".jpeg",
    ".gif",
    ".webp",
    ".ico",
    ".ttf",
    ".otf",
    ".woff",
    ".woff2",
    ".eot",
    ".json",
    ".yaml",
    ".yml",
    ".md",
    ".env",
    ".graphql",
    ".config.js",
    ".config.ts",
  ];

  return validExtensions.some((ext) => arg.endsWith(ext));
};

// Обработка аргументов командной строки
const parseArguments = () => {
  const args = process.argv.slice(2);
  const name = args[0];
  const remainingArgs = args.slice(1);

  if (!name) {
    console.error(
      "Ошибка! Укажите имя компонента. Пример: <ComponentName> [file1 file2 ... | путь]"
    );
    process.exit(1);
  }

  let files = [];
  let path;

  remainingArgs.forEach((arg) => {
    if (isFileName(arg)) {
      files.push(arg); // Если аргумент - файл, добавляем в список файлов
    } else {
      path = arg; // Если не файл, считаем, что это путь
    }
  });

  // Если файлы не указаны, используем файлы по умолчанию
  if (files.length === 0) {
    files = ["index.tsx", "interface.ts"];
  }

  console.log("Parsed arguments:", { name, files, path });

  return { name, files, path };
};

// Разбор аргументов
const { name, files, path } = parseArguments();
const componentsDir = getComponentsDir(path);

// Генерация компонента
generateComponent(name, files, componentsDir);
