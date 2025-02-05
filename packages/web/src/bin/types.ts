export type Config = {
	scripts?: (
		| [string, Record<string, string>]
		| [string, Record<string, string>, string]
	)[]
	title?     : string
	titleOpts? : string[]
	action?    : string
}
