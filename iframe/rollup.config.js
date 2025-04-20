import resolve from "@rollup/plugin-node-resolve";
import execute from "rollup-plugin-execute";
import typescript from "@rollup/plugin-typescript";
import { terser } from "rollup-plugin-terser";
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: "src/ui.ts",
  output: {
    file: "html.js",
    format: "iife",
    globals: "__html__",
    inlineDynamicImports: true,
  },
  // Generate HTML from the compiled output bundle and output the UI
  plugins: [
    typescript(),
    resolve(),
    terser(),
    commonjs({
      include: /node_modules/,
      requireReturnsDefault: 'auto', // <---- this solves default issue
    }),
    execute("node generate.js > ../iframe.html"),
  ],
};