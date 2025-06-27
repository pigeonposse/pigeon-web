<script lang="ts">

	import {
		onMount,
		tick,
	} from 'svelte'

	import type { HTMLAttributes } from 'svelte/elements'

	let {
		speed = 100, delay = 2000, texts = [], order = 'random', ...rest
	} : Omit<HTMLAttributes<HTMLSpanElement>, never> & {
		texts  : ( {
			id   : string
			name : string
		} | string )[]
		speed? : number
		delay? : number
		order? : 'random' | 'current'
	} = $props()
	let textsOrdened = $derived.by( () => {

		if ( order === 'random' )
			return [ ...texts ].sort( () => Math.random() - 0.5 )

		return texts

	} )
	let displayText  = $state( '' )
	let textIndex    = $state( 0 )

	let actual = $derived( {
		// @ts-ignore
		id   : typeof textsOrdened[textIndex] === 'string' ? textsOrdened[textIndex] : textsOrdened[textIndex].id,
		// @ts-ignore
		name : typeof textsOrdened[textIndex] === 'string' ? textsOrdened[textIndex] : textsOrdened[textIndex].name,
	},
	)

	async function typeWriterEffect() {

		while ( textsOrdened.length ) {

			displayText = ''

			for ( let i = 0; i < actual.name.length; i++ ) {

				displayText = actual.name.slice( 0, i + 1 )
				await tick()

				// eslint-disable-next-line promise/param-names
				await new Promise( r => setTimeout( r, speed ) )

			}

			// eslint-disable-next-line promise/param-names
			await new Promise( r => setTimeout( r, delay ) )

			textIndex = ( textIndex + 1 ) % textsOrdened.length

		}

	}
	onMount( () => typeWriterEffect() )
</script>

<span
	{...rest}
	data-name={actual.id}
>
	{displayText}
</span>
