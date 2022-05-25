/**
 * Transpiles TypeScript to JavaScript code.
 *
 * @link https://github.com/facebook/jest/blob/master/examples/typescript/preprocessor.js
 * @copyright 2004-present Facebook. All Rights Reserved.
 */
import tsc from 'typescript';
import tsConfig from '../../tsconfig.json';

module.exports = {
    process(src, path) {
        if (path.endsWith('.ts') || path.endsWith('.tsx') || path.endsWith('.js')) {
            return tsc.transpile(src, tsConfig.compilerOptions, path, []);
        }
        return src;
    },
};
