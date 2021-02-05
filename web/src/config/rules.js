function RuleRequire(label) {
	return {
		required: true,
		message: `${label}不能为空`
	}
}
export { RuleRequire }
