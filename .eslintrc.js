module.exports = {
    parser: '@typescript-eslint/parser',
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
    ],
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true
        }
    },
    env: {
        browser: true,
        node: true,
        es6: true
    },
    globals: {
        window: true,
        define: true,
        require: true,
        module: true,
    },
    settings: {
        react: {
            pragma: 'React',
            version: 'detect'
        }
    },
    plugins: [
        'babel',
        'react',
        'react-hooks',
        '@typescript-eslint/eslint-plugin'
    ],
    rules: {
        'object-curly-spacing': [2, 'never'],
        'linebreak-style': [ 'error', 'unix' ],
        quotes: [ 'error', 'single' ],
        semi: [ 'error', 'always'],
        'react/prop-types': 0,
        'react/jsx-no-bind': 0,
        'react/jsx-boolean-value': 0,
        'react/jsx-closing-bracket-location': 1,
        'react/jsx-curly-spacing': [2, 'never'],
        'react/jsx-indent': [2, 4],
        'react/jsx-indent-props': [2, 4],
        'react/jsx-no-undef': 1,
        'react/jsx-uses-react': 1,
        'react/jsx-uses-vars': 1,
        'react/jsx-wrap-multilines': 1,
        'react/react-in-jsx-scope': 1,
        'react/prefer-es6-class': 1,
        "react-hooks/rules-of-hooks": "error", // Checks rules of Hooks
        "react-hooks/exhaustive-deps": "warn", // Checks effect dependencies
        'no-console': ['error', {
            allow: ['warn', 'error'],
        }],
        'quote-props': ['error', 'as-needed', {
            keywords: false,
            unnecessary: true,
            numbers: false,
        }],
        'no-use-before-define': ['error', {
            functions: false,
            classes: false,
        }],
        'no-mixed-operators': 0,
        'func-names': 'off',
        'no-multi-assign': 'off',
        'vars-on-top': 'off',
        'id-match': ['error', '^[\x00-\x7F]+$'],
        'comma-dangle': ['error', {
            arrays: 'always-multiline',
            objects: 'always-multiline',
            imports: 'always-multiline',
            exports: 'always-multiline',
            functions: 'never',
        }],
        '@typescript-eslint/no-var-requires': 0,
        '@typescript-eslint/no-empty-function': 0,
        '@typescript-eslint/ban-ts-ignore': 0,
        '@typescript-eslint/explicit-function-return-type': 0,
        '@typescript-eslint/no-explicit-any': 0,
        'import/no-unresolved': 0,
        'import/extensions': 0,
        'import/prefer-default-export': 'off',
        'func-style': 'off',
        'no-param-reassign': ['error', {
            props: false,
        }],
        'arrow-parens': ['error', 'as-needed'],
        'no-plusplus': 'off',
        indent: ['error', 4, {
            'SwitchCase': 1,
            'VariableDeclarator': 1,
            'outerIIFEBody': 1,
            'FunctionDeclaration': {
                'parameters': 1,
                'body': 1,
            },
            'FunctionExpression': {
                'parameters': 1,
                'body': 1,
            },
        }],
        'no-underscore-dangle': 'off',
        'max-len': ['error', {
            code: 120,
            ignoreUrls: true,
            ignoreStrings: false,
            ignoreTemplateLiterals: true,
            ignoreRegExpLiterals: true,
        }],
    }
};
