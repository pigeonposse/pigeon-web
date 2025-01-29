export class Keys {

	ns : KVNamespace
	constructor( namespace:KVNamespace ) {

		this.ns = namespace

	}

	async delete( key:string ) {

		await this.ns.delete( key )

	}

	async get( key:string ): Promise<object | undefined> {

		const value = await this.ns.get( key )

		return value ? JSON.parse( value ) : undefined

	}

	async update( k:string, v: string ) {

		await this.ns.put( k, v )

	}

}
