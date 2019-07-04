module.exports = {
    parser: '@typescript-eslint/parser', // Specifies the ESLint parser
    extends: [
		'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
        'prettier/@typescript-eslint', // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
        'plugin:prettier/recommended', // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
    ],
    parserOptions: {
        ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
        sourceType: 'module', // Allows for the use of imports
		ecmaFeatures: {
			jsx: true
		}
	},
	rules: {
        "@typescript-eslint/no-non-null-assertion": 0,
        "@typescript-eslint/explicit-function-return-type": false,
        "@typescript-eslint/no-explicit-any": false,
		"@typescript-eslint/no-use-before-define": false,
		"@typescript-eslint/no-var-requires": "warning",
		"react/prop-types": false
	},
	settings: {
		react: {
			version: 'detect'
		}
	}
};
