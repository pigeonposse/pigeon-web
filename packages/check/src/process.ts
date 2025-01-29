
export class Argv {

	constructor( public args: string[] ) {}

	existsOpts() {

		return this.args.length <= 2

	}

	getBin() {

		return this.args[0]

	}

	getCmd( key: string ) {

		const flags = this.args
		for ( let i = 0; i < flags.length; i++ ) {

			const flag = flags[i]

			// Format: --key=value
			if ( flag.startsWith( `${key}=` ) ) {

				return flag.split( '=' )[1]

			}

			// Format: --key value
			if ( flag === `${key}` && flags[i + 1] && !flags[i + 1].startsWith( '-' ) ) {

				return flags[i + 1]

			}

		}
		return undefined

	}

	getCmdValues( key: string ): string[] | undefined {

		let values: string[] = []
		const flags          = this.args

		for ( let i = 0; i < flags.length; i++ ) {

			const flag = flags[i]

			// Format: --key=value1,value2,...
			if ( flag.startsWith( `${key}=` ) ) {

				values = flag.split( '=' )[1].split( ',' )
				break

			}

			// Format: --key value1 value2 ...
			if ( flag === `${key}` ) {

				for ( let j = i + 1; j < flags.length; j++ ) {

					if ( flags[j].startsWith( flag ) ) break
					values.push( flags[j] )

				}
				break

			}

		}

		return values.length > 0 ? values : undefined

	}

	existsCmd( cmd: string ) {

		return this.args.includes( cmd )

	}

	getFlagValue( key: string ) {

		const flagLine = key.length === 1 ? '-' : '--'
		return this.getCmd( `${flagLine}${key}` )

	}

	getFlagValues( key: string ): string[] | undefined {

		const flagLine = key.length === 1 ? '-' : '--'

		return this.getCmdValues( flagLine )

	}

	existsFlag( key: string ) {

		const flagLine = key.length === 1 ? '-' : '--'
		return this.args.includes( `${flagLine}${key}` )

	}

}
