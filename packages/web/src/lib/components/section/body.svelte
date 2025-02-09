<script lang="ts">
	import { onMount } from 'svelte'

	import './body.css'

	let props = $props()

	let position: 'top' | 'bottom' | undefined  = $state( undefined )
	let scrolling                               = $state( false )
	let scrollingTimeout: NodeJS.Timeout | null = null

	const handleScroll = () => {

		const content = document.querySelector( '.page__content' )

		if ( !content ) return

		scrolling = true

		if ( scrolling ) {

			if ( scrollingTimeout ) clearTimeout( scrollingTimeout )
			scrollingTimeout = setTimeout( () => scrolling = false, 200 )

		}

		const {
			scrollTop, scrollHeight, clientHeight,
		} = content

		if ( scrollTop === 0 ) position = 'top'
		else if ( scrollTop + clientHeight >= scrollHeight ) position = 'bottom'
		else position = undefined

	}
	onMount( () => handleScroll() )

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
	<div class="page__content {props.class || ''}" onscroll={handleScroll}>
		{@render props.children?.()}
	</div>
</div>
