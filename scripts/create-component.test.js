const {
  existsSync,
  readFileSync,
  readdirSync,
  lstatSync,
  rmSync,
} = require("fs");
const { join, resolve } = require("path");
const { execSync } = require("child_process");

const COMPONENTS_DIR = resolve(__dirname, "../src");

const getFileContent = (filePath) => readFileSync(filePath, "utf-8").trim();

describe("create-component.js", () => {
  let initialFiles = [];
  let createdFiles = [];

  beforeAll(() => {
    // Сохраняем список файлов и папок в директории до начала тестов
    initialFiles = readdirSync(COMPONENTS_DIR);
  });

  afterAll(() => {
    // Получаем список файлов и папок после тестирования
    const currentFiles = readdirSync(COMPONENTS_DIR);

    // Находим только те файлы и папки, которые были созданы в ходе тестирования
    createdFiles = currentFiles.filter((file) => !initialFiles.includes(file));

    // Удаляем только созданные в ходе тестирования файлы и папки
    createdFiles.forEach((file) => {
      const filePath = join(COMPONENTS_DIR, file);
      if (existsSync(filePath)) {
        if (lstatSync(filePath).isDirectory()) {
          // Рекурсивно удаляем содержимое папки
          rmSync(filePath, { recursive: true, force: true });
        } else {
          // Удаляем файл
          rmSync(filePath, { force: true });
        }
      }
    });
  });

  it("Создаёт компонент с файлами по умолчанию", () => {
    const componentName = "DefaultComponent";
    const command = `node --trace-warnings scripts/create-component.js ${componentName}`;
    execSync(command);

    const componentPath = join(COMPONENTS_DIR, componentName);
    expect(existsSync(componentPath)).toBe(true);

    const indexPath = join(componentPath, "index.tsx");
    const interfacePath = join(componentPath, "interface.ts");
    expect(existsSync(indexPath)).toBe(true);
    expect(existsSync(interfacePath)).toBe(true);

    expect(getFileContent(indexPath)).toContain("function DefaultComponent");
    expect(getFileContent(interfacePath)).toContain(
      "export interface IDefaultComponent"
    );
  });

  it("Создаёт компонент с указанными файлами", () => {
    const componentName = "CustomComponent";
    const command = `node --trace-warnings scripts/create-component.js ${componentName} custom.ts styles.ts`;
    execSync(command);

    const componentPath = join(COMPONENTS_DIR, componentName);
    expect(existsSync(componentPath)).toBe(true);

    const customFilePath = join(componentPath, "custom.ts");
    const stylesFilePath = join(componentPath, "styles.ts");
    expect(existsSync(customFilePath)).toBe(true);
    expect(existsSync(stylesFilePath)).toBe(true);

    expect(getFileContent(customFilePath)).toContain("function custom");
    expect(getFileContent(stylesFilePath)).toContain("styled.div");
  });

  it("Выводит ошибку при создании компонента с существующим именем", () => {
    const componentName = "DuplicateComponent";
    const command = `node scripts/create-component.js ${componentName}`;
    execSync(command);

    // Попробуем создать компонент с тем же именем снова
    const duplicateCommand = `node scripts/create-component.js ${componentName}`;
    let errorOutput = "";
    try {
      execSync(duplicateCommand);
    } catch (error) {
      errorOutput = error.stderr.toString();
    }

    expect(errorOutput).toContain(
      `❌ Компонент "${componentName}" уже существует.`
    );
  });

  it("Создаёт компонент в указанной директории", () => {
    const componentName = "SubdirComponent";
    const customDir = join(COMPONENTS_DIR, "../src/components");
    const command = `node --trace-warnings scripts/create-component.js ${componentName} getValue.ts ${customDir}`;
    execSync(command);

    const componentPath = join(customDir, componentName);
    expect(existsSync(componentPath)).toBe(true);

    const indexPath = join(componentPath, "getValue.ts");
    expect(existsSync(indexPath)).toBe(true);

    expect(getFileContent(indexPath)).toContain(
      `function getValue() {}\n\nexport default getValue;`
    );
  });
});
