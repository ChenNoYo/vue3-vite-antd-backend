function RuleRequire (label, type = 'string') {
	return {
		required: true,
		type,
		message: `${label}不能为空`
	}
}
export { RuleRequire }
