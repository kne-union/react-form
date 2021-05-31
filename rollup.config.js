import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import external from 'rollup-plugin-peer-deps-external';
import resolve from 'rollup-plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import localResolve from 'rollup-plugin-local-resolve';

import pkg from './package.json';

export default [
  {
    input: 'src/index.js',
    output: [
      {
        file: pkg.main,
        format: 'cjs',
        sourcemap: true
      },
      {
        file: pkg.module,
        format: 'es',
        sourcemap: true
      }
    ],
    plugins: [
      localResolve(),
      babel({
        exclude: 'node_modules/**',
        runtimeHelpers: true
      })
    ]
  },
  {
    input: 'src/index.js',
    output: [
      {
        file: pkg.umd,
        name: 'ReactForm',
        format: 'umd',
        sourcemap: true
      },
      {
        file: pkg['umd:min'],
        name: 'ReactForm',
        format: 'umd',
        sourcemap: true,
        plugins: [terser()]
      }
    ],
    plugins: [
      localResolve(),
      external(),
      babel({
        exclude: 'node_modules/**',
        runtimeHelpers: true
      }),
      resolve(),
      commonjs()
    ]
  }
];
