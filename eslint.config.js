import expoConfig from "eslint-config-expo/flat";
import { createTypeScriptImportResolver } from "eslint-import-resolver-typescript";
import { defineConfig } from "eslint/config";

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ["dist/*"],
  },
  {
    settings: {
      "import-x/resolver-next": [
        createTypeScriptImportResolver({
          alwaysTryTypes: true,
          bun: true,
        }),
      ],
    },
  },
]);
