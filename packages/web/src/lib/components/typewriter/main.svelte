<script lang="ts">

	import { tick } from 'svelte'
	import type { HTMLAttributes } from 'svelte/elements';

	// export let texts: string[] = []
	// export let speed = 100 // Velocidad en milisegundos para escribir cada carácter
	// export let delay = 2000 // Retardo entre textos
	let {speed = 100 , delay = 2000, texts = [], ...rest} : Omit<HTMLAttributes<HTMLSpanElement>, never> & {
		texts:string[]
		speed?: number
		delay?: number
	} = $props()

	let displayText = $state('')
	let index       =  $state(0)
	let textIndex   =  $state(0)

	async function typeWriterEffect() {

		while ( true ) {

			if ( index < texts[textIndex].length ) {

				displayText += texts[textIndex][index]
				index       += 1
				await tick()
				// eslint-disable-next-line promise/param-names
				await new Promise( r => setTimeout( r, speed ) )

			}
			else {

				// eslint-disable-next-line promise/param-names
				await new Promise( r => setTimeout( r, delay ) )
				index       = 0
				displayText = ''
				textIndex   = ( textIndex + 1 ) % texts.length

			}

		}

	}

	typeWriterEffect()
</script>

<span {...rest}>{displayText}</span>
