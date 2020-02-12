const nodeResolve = require('@rollup/plugin-node-resolve');
const babel = require('rollup-plugin-babel');
const commonJS = require('@rollup/plugin-commonjs');
const external = require('rollup-plugin-peer-deps-external');
const minify = require('rollup-plugin-terser').terser;
const pkg = require('./package');

const globals = {
  fs: 'fs'
};

const copyright = `// ${pkg.homepage} v${pkg.version} Copyright ${(new Date()).getFullYear()} ${pkg.author.name} <${pkg.author.email}>`;

module.exports = [
  {
    input: './src/index.js',
    output: {
      esModule: false,
      exports: 'named',
      file: pkg.unpkg,
      format: 'umd',
      banner: copyright,
      name: pkg.name,
      globals: globals,
      indent: false
    },
    plugins: [
      external({
        includeDependencies: true
      }),
      babel({
        babelrc: false,
        exclude: [
          'node_modules/**',
          '**/*.test.js'
        ],
        runtimeHelpers: true,
        presets: [
          [
            '@babel/preset-env',
            {
              modules: false
            }
          ]
        ]
      }),
      commonJS({
        include: 'node_modules/**'
      }),
      nodeResolve(),
      minify()
    ]
  },
  {
    input: './src/index.js',
    output: [
      {
        file: pkg.main,
        format: 'cjs',
        name: pkg.name,
        indent: false,
        banner: copyright,
        exports: 'named',
        sourcemap: true
      }
    ],
    plugins: [
      external({
        includeDependencies: true
      }),
      babel({
        babelrc: false,
        exclude: [
          'node_modules/**',
          '**/*.test.js'
        ],
        runtimeHelpers: true,
        presets: [
          [
            '@babel/preset-env',
            {
              modules: false,
              targets: {
                node: true
              }
            }
          ]
        ]
      }),
      commonJS({
        include: 'node_modules/**'
      }),
      nodeResolve()
    ]
  }
];
