<script lang="ts">

	import './style.css'
	import Button from '$lib/components/button/main.svelte'
	import Image from '$lib/components/image/main.svelte'
	import Tooltip from '$lib/components/tooltip/main.svelte'

	import type {
		ComponentProps,
		Snippet,
	} from 'svelte'
	import type { MouseEventHandler } from 'svelte/elements'

	type Props = {
		href?          : string
		imgBgUrl?      : string
		type?          : 'main' | 'global'
		tooltip?       : ComponentProps<typeof Tooltip>
		shadowHover?   : boolean
		onclick?       : MouseEventHandler<HTMLButtonElement>
		class?         : string
		contentTop?    : Snippet
		contentHeader? : Snippet
		contentFooter? : Snippet
		children?      : Snippet
	}
	let  {
		href,
		imgBgUrl,
		type = 'main',
		tooltip,
		shadowHover = true,
		onclick,
		class: Klass,
		contentTop,
		contentHeader,
		contentFooter,
		children,
		...rest
	}: Props = $props()

	let x          = $state( 0 )
	let y          = $state( 0 )
	let shadowSize = $state( 200 )
	let hover      = $state( false )

</script>

<Button
	{href}
	onclick={onclick}
	type="none"
	{tooltip}
	onmousemove={e => {

		if ( !shadowHover ) return
		if ( !e.currentTarget ) return

		const rect = e.currentTarget.getBoundingClientRect()
		x          = e.clientX - rect.left - shadowSize / 2
		y          = e.clientY - rect.top - shadowSize / 2

	}}
	bind:hover={hover}
	{...rest}
	class="card {type} group colored transition_general relative {Klass || ''}"
>

	{#if imgBgUrl}

		<Image
			src={imgBgUrl}
			alt="background image card for {imgBgUrl}"
			width="100"
			height="100"
			class="card__bg_img transition_general"
		/>
	{/if}

	{#if hover && shadowHover}
		<div
			class="card__bg_shadow"
			style="top: {y}px; left: {x}px; width: {shadowSize}px; height: {shadowSize}px;"
		></div>
	{/if}

	{#if contentTop}
		<div class="card__top">
			{@render contentTop()}
		</div>
	{/if}

	<div class="card__container no_scrollbar">

		{#if contentHeader}
			<div>
				{@render contentHeader()}
			</div>
		{/if}

		{@render children?.()}

		{#if contentFooter}
			<div>
				{@render contentFooter()}
			</div>
		{/if}

	</div>

</Button>
