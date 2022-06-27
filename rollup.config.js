import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import commonjs from "@rollup/plugin-commonjs";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import { terser } from "rollup-plugin-terser";
import { brotliCompressSync } from "zlib";
import gzipPlugin from "rollup-plugin-gzip";

function basePlugins(tsconfig = "./tsconfig.json") {
  return [peerDepsExternal(), resolve(), commonjs(), typescript({ tsconfig })];
}

function compressionPlugins(tsconfig = "./tsconfig.json") {
  return [
    ...basePlugins(tsconfig),
    terser({
      compress: {
        passes: 10,
      },
    }),
    // GZIP compression as .gz files
    gzipPlugin(),
    // Brotil compression as .br files
    gzipPlugin({
      customCompression: (content) => brotliCompressSync(Buffer.from(content)),
      fileName: ".br",
    }),
  ];
}

export default [
  {
    input: "index.tsx",
    output: [
      {
        name: "@toy_train/react-core",
        file: "dist/index.umd.js",
        format: "umd",
        sourcemap: true,
        exports: "named",
      },
    ],
    plugins: basePlugins(),
  },
  {
    input: "index.tsx",
    output: [
      {
        file: "dist/index.module.js",
        format: "es",
        sourcemap: true,
      },
    ],
    plugins: basePlugins(),
  },

  // Compressed
  {
    input: "index.tsx",
    output: [
      {
        name: "@toy_train/react-core",
        file: "dist/index.umd.min.js",
        format: "umd",
        sourcemap: true,
        exports: "named",
      },
    ],
    plugins: compressionPlugins(),
  },
  {
    input: "index.tsx",
    output: [
      {
        file: "dist/index.module.min.js",
        format: "es",
        sourcemap: true,
      },
    ],
    plugins: compressionPlugins(),
  },
];
