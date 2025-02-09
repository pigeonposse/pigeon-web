<script lang="ts">

	import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
	import { type ComponentProps } from 'svelte'

	import './style.css'
	import Button from '$lib/components/button/main.svelte'
	import Card from '$lib/components/card/project.svelte'

	export let values: ( ComponentProps<typeof Card> )[] = []
	export let max: number = 8
	export let goto: string | undefined = undefined
	export let type: 'main' | 'right' | 'left' = 'main'

</script>

<div
	class="carousel {type} {$$restProps.class || ''}"
>
	<div class="carousel__content scrollbar_hide">
		{#each values as card, i }
			{#if i <= max}
				<Card {...card} class="carousel__content__card"/>
			{/if}
		{/each}

		{#if goto}
			<Button
				icon={faChevronRight}
				goto={goto}
				class="carousel__content__btn"
			/>
		{/if}

	</div>

</div>
