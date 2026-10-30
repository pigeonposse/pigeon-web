<script lang="ts">

	import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
	import { type ComponentProps } from 'svelte'

	import './style.css'

	import type { HTMLAttributes } from 'svelte/elements'

	import Button from '#components/button/main.svelte'
	import Card from '#components/card/project.svelte'

	let {
		values = [],
		max = 8,
		goto,
		type = 'main',
		...rest
	}: HTMLAttributes<HTMLDivElement> & {
		values? : ( ComponentProps<typeof Card> )[]
		max?    : number
		goto?   : string
		type?   : 'main' | 'right' | 'left'

	} = $props()
</script>

<div class="carousel {type} {rest.class || ''}">
	<div class="carousel__content">
		{#each values as card, i ( card )}
			{#if i <= max}
				<Card
					{...card}
					class="carousel__content__card"
					viewTransitionName={false}
				/>
			{/if}
		{/each}

		{#if goto}
			<Button
				class="carousel__content__btn"
				aria-label="View more projects"
				goto={goto}
				icon={faChevronRight}
				type="dark"
			/>
		{/if}

	</div>

</div>
