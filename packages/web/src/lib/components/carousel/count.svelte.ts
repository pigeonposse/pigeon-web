export class Count {

	#value = $state( 0 )
	readonly total : number

	prev = $derived.by( () => ( this.#value === 0 ? this.total : this.#value - 1 ) )
	next = $derived.by( () => ( this.#value === this.total ? 0 : this.#value + 1 ) )
	value = $derived.by( () => this.#value )

	constructor( total: number ) {

		this.total = total

	}

	setNext() {

		this.#value = this.#value >= this.total ? 0 : this.#value + 1

	}

	setPrev() {

		this.#value = this.#value <= 0 ? this.total : this.#value - 1

	}

}
