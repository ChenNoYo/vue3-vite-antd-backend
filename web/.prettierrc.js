module.exports = {
	printWidth: 100,
	tabWidth: 4,
	useTabs: true,
	semi: false, // 未尾逗号
	singleQuote: true,
	semi: false,
	vueIndentScriptAndStyle: true,
	singleQuote: true, // 单引号
	quoteProps: 'as-needed',
	bracketSpacing: true,
	trailingComma: 'none', // 未尾分号
	jsxBracketSameLine: true,
	jsxSingleQuote: false,
	arrowParens: 'always',
	insertPragma: false,
	requirePragma: false,
	proseWrap: 'never',
	htmlWhitespaceSensitivity: 'strict',
	endOfLine: 'lf',
	rangeStart: 0,
	overrides: [
		{
			files: '*.md',
			options: {
				tabWidth: 2
			}
		}
	]
}
