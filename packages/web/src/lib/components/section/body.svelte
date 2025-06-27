<script lang="ts">
	import { onMount } from 'svelte'

	import './body.css'
	import { afterNavigate } from '$app/navigation'

	let props = $props()

	let position: 'top' | 'bottom' | undefined  = $state( undefined )
	let scrolling                               = $state( false )
	let scrollingTimeout: NodeJS.Timeout | null = null
	let el: HTMLDivElement
	const handleScroll                          = () => {

		if ( !el ) return

		scrolling = true

		if ( scrolling ) {

			if ( scrollingTimeout ) clearTimeout( scrollingTimeout )
			scrollingTimeout = setTimeout( () => scrolling = false, 200 )

		}

		const {
			scrollTop, scrollHeight, clientHeight,
		} = el

		if ( scrollTop === 0 ) position = 'top'
		else if ( scrollTop + clientHeight >= scrollHeight ) position = 'bottom'
		else position = undefined

	}

	onMount( () => handleScroll() )
	afterNavigate( () => {

		el?.scrollTo( {
			top      : 0,
			behavior : 'smooth',
		} )

	} )
</script>

<div
	class="page{position ? ' ' + position : ''}"
	class:scrolling
>
	<!-- BACKGROUND -->
	<div class="bg__gradient"></div>
	<div class="bg__circle_primary"></div>
	<div class="bg__circle_secondary"></div>
	<!-- PAGE -->
	<div
		bind:this={el}
		class="page__content {props.class || ''}"
		onscroll={handleScroll}
	>
		{@render props.children?.()}
	</div>
</div>
