const OFF = 0;
const WARNING = 1;
const ERROR = 2;

module.exports = {
    'env': {
        'node': true,
    },
    'globals': {
        'process': true,
        '__dirname': true,
    },
    'extends': 'eslint:recommended',
    'parserOptions': {
        'ecmaVersion': 12
    },
    'rules': {
        'linebreak-style': OFF,
        'no-loop-func': WARNING,
        'no-use-before-define': OFF,
        'guard-for-in': OFF,
        'no-multi-assign': WARNING,
        'no-else-return': OFF,
        'no-negated-condition': OFF,
        'no-warning-comments': OFF,
        'default-case': OFF,
        'operator-assignment': OFF,
        'arrow-parens': OFF,
        'operator-linebreak': [ERROR, 'before'],
        'angular/file-name': OFF,
        'angular/function-type': OFF,
        'angular/no-run-logic': OFF,
        'no-unused-vars': ERROR,
        'no-undef': ERROR,
        'eqeqeq': ERROR,
        'quote-props': OFF,
        'curly': ERROR,
        'no-extra-semi': WARNING,
        'no-control-regex': OFF,
        'no-extend-native': OFF,
        'no-mixed-requires': WARNING,
        'no-cond-assign': WARNING,
        'no-dupe-args': WARNING,
        'no-dupe-keys': WARNING,
        'no-empty': ERROR,
        'no-multi-spaces': WARNING,
        'no-multiple-empty-lines': [
            WARNING,
            {max: 1, maxEOF: 1, maxBOF: 1}
        ],
        'padding-line-between-statements': [
            WARNING,
            {blankLine: 'always', prev: '*', next: 'return'},
            {blankLine: 'always', prev: ['const', 'let', 'var'], next: '*'},
            {blankLine: 'any', prev: ['const', 'let', 'var'], next: ['const', 'let', 'var']},
            {blankLine: 'always', prev: 'directive', next: '*'},
            {blankLine: 'any', prev: 'directive', next: 'directive'}
        ],
        'space-before-function-paren': [
            ERROR,
            'never'
        ],
        'camelcase': [
            ERROR,
            {properties: 'always'}
        ],
        'space-before-blocks': [
            ERROR,
            'always'
        ],
        'space-infix-ops': ERROR,
        'indent': [
            ERROR,
            4,
            {SwitchCase: 1}
        ],
        'one-var': OFF,
        'key-spacing': [
            ERROR,
            {beforeColon: false, afterColon: true}
        ],
        'max-len': [
            WARNING,
            140
        ],
        'valid-jsdoc': OFF,
        'require-jsdoc': OFF,
        'dot-notation': OFF,
        'comma-dangle': [
            WARNING,
            'only-multiline'
        ],
        'no-debugger': WARNING
    },
};
