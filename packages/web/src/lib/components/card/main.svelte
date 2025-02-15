<script lang="ts">

	import './style.css'
	import Button from '$components/button/main.svelte'
	import Image from '$components/image/main.svelte'
	import Tooltip from '$components/tooltip/main.svelte'

	import type {
		ComponentProps,
		Snippet,
	} from 'svelte'
	import type {
		HTMLButtonAttributes,
		MouseEventHandler,
	} from 'svelte/elements'

	type Btn =  Partial<Omit<HTMLButtonAttributes, 'type'>>

	type Props = Btn & {
		href?          : string
		imgBgUrl?      : string
		type?          : 'main' | 'global' | 'none'
		tooltip?       : ComponentProps<typeof Tooltip>
		shadowHover?   : boolean
		onclick?       : MouseEventHandler<HTMLButtonElement>
		class?         : string
		contentTop?    : Snippet
		contentBottom? : Snippet
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
	type="none"
	{href}
	{onclick}
	{tooltip}
	onmousemove={e => {

		if ( !shadowHover ) return
		if ( !e.currentTarget ) return

		const rect = e.currentTarget.getBoundingClientRect?.()
		x          = e.clientX - rect.left - shadowSize / 2
		y          = e.clientY - rect.top - shadowSize / 2

	}}
	bind:hover={hover}
	{...rest}
	class="{type !== 'none' ? `card ${type}` : type} group colored relative {Klass || ''}"
>

	{#if imgBgUrl}
		<Image
			src={imgBgUrl}
			alt="background image card for {imgBgUrl}"
			width="100"
			height="100"
			class="card__bg_img"
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
