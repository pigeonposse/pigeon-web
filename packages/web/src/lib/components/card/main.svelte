<script lang="ts">

	import './style.css'
	import Button from '$components/button/main.svelte'
	import Image from '$components/image/main.svelte'
	import type { TooltipProps } from '$components/tooltip/types'

	import type { Snippet } from 'svelte'
	import type {
		HTMLButtonAttributes,
		MouseEventHandler,
	} from 'svelte/elements'

	type Btn = Partial<Omit<HTMLButtonAttributes, 'type'>>

	type Props = Btn & {
		href?          : string
		imgBgUrl?      : string
		type?          : 'main' | 'global' | 'none'
		tooltip?       : TooltipProps
		shadowHover?   : boolean
		onclick?       : MouseEventHandler<HTMLButtonElement>
		class?         : string
		contentTop?    : Snippet
		contentBottom? : Snippet
		contentHeader? : Snippet
		contentFooter? : Snippet
		children?      : Snippet
	}
	let {
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
		contentBottom,
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
	{onclick}
	onmousemove={e => {

		if ( !shadowHover ) return
		if ( !e.currentTarget ) return

		const rect = e.currentTarget.getBoundingClientRect?.()
		x          = e.clientX - rect.left - shadowSize / 2
		y          = e.clientY - rect.top - shadowSize / 2

	}}
	{tooltip}
	type="none"
	bind:hover={hover}
	{...rest}
	class="{type !== 'none' ? `card ${type}` : type} group colored relative {Klass || ''}"
>

	{#if imgBgUrl}
		<Image
			class="card__bg_img"
			alt="background image card for {imgBgUrl}"
			height="100"
			src={imgBgUrl}
			width="100"
		/>
	{/if}

	{#if hover && shadowHover}
		<div
			style="top: {y}px; left: {x}px; width: {shadowSize}px; height: {shadowSize}px;"
			class="card__bg_shadow"
		></div>
	{/if}

	{#if contentTop}
		<div class="card__top">
			{@render contentTop()}
		</div>
	{/if}

	<div class="card__container">

		{#if contentHeader}
			<div class="card__header">
				{@render contentHeader()}
			</div>
		{/if}

		{@render children?.()}

		{#if contentFooter}
			<div class="card__footer">
				{@render contentFooter()}
			</div>
		{/if}

	</div>
	{#if contentBottom}
		<div class="card__bottom">
			{@render contentBottom()}
		</div>
	{/if}
</Button>
