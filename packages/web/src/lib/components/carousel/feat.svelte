<script lang="ts">

	import { Count } from './count.svelte'
	import './feat.css'
	import CardMain from '$components/card/main.svelte'
	import Card from '$components/card/project.svelte'
	import Image from '$components/image/main.svelte'

	import type { ComponentProps } from 'svelte'

	const {
		values = [],
		autoPlay = true,
		autoPlayInterval = 5000,
	}: {
		values            : ( ComponentProps<typeof Card> )[]
		/**
		 * Activate autoplay.
		 *
		 * @default true
		 */
		autoPlay?         : boolean
		/**
		 * Interval in miliseconds
		 *
		 * @default 5000
		 */
		autoPlayInterval? : number
	} = $props()

	const count = new Count( values.length - 1 || 0 )
	let hover   = $state( false )
	let timer: NodeJS.Timeout

	const startAutoPlay = () => {

		if ( autoPlay && !hover ) {

			timer = setInterval( () => count.setNext(), autoPlayInterval )

		}

	}

	const stopAutoPlay = () => {

		clearInterval( timer )

	}

</script>

{#snippet card( { type = 'left' }:{ type: 'left' | 'right' } )}

	{@const value = values[type == 'left' ? count.prev : count.next]}

	<CardMain
		class="carousel_feat__next_prev"
		href={value.githubUrl}
		imgBgUrl={value.img}
		tooltip={{
			title     : value.title,
			placement : type == 'right' ? 'left' : 'right',
		}}
		type="global"
	>
		<Image
			class="carousel_feat__next_prev__img"
			alt="{type} feat image"
			src={value.img}
		/>
	</CardMain>

{/snippet}

<div
	class="carousel_feat"
	onmouseenter={() => {

		hover = true
		stopAutoPlay()

	}}
	onmouseleave={() => {

		hover = false
		startAutoPlay()

	}}
	role="presentation"
>

	{@render card( { type: 'left' } )}

	<div class="carousel_feat__content">
		{#each values as card, i}
			<Card
				{...card}
				class="carousel_feat__content__card {`${i === count.value ? '' : '!hidden'}`}"
			/>
		{/each}
	</div>

	{@render card( { type: 'right' } )}
</div>
