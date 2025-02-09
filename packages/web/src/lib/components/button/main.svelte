<!-- <script lang="ts">

	import './style.css'
	import { goto as gotoFunct } from '$app/navigation'
	import Icon from '$lib/components/icons/main.svelte'
	import Tooltip from '$lib/components/tooltip/main.svelte'

	import type { ComponentProps } from 'svelte'

	export let icon: ComponentProps<typeof Icon> | ComponentProps< typeof Icon>['svg'] | undefined = undefined
	export let iconPosition: 'left' | 'right' = 'left'
	export let hover = false
	export let goto: undefined | string = undefined
	export let href: undefined | string = undefined
	export let type: 'none' | 'dark' | 'transparent' | 'primary' | 'secondary' | 'logo' = 'primary'
	export let active: boolean = false
	export let tooltip: ComponentProps< typeof Tooltip> | undefined = undefined

	function handleMouseEnter() {

		hover = true

	}

	function handleMouseLeave() {

		hover = false

	}

</script>

<button
	type="button"
	on:mouseenter={handleMouseEnter}
	on:mouseleave={handleMouseLeave}
	on:click={() => {

		if ( goto ) gotoFunct( goto, { noScroll: false } )
		if ( href ) window?.open( href )

	}}
	on:click
	on:mousemove
	{...$$restProps}
	class="{type !== 'none' ? 'button ' + type : ''}{active ? ' active' : ''}{$$restProps.class ? ' ' + $$restProps.class : ''}"
>

	{#if icon && iconPosition === 'left'}
		<Icon
			class="{$$slots.default ? iconPosition : ''}"
			{...( typeof icon === 'object' && 'svg' in icon ? icon : { svg: icon } )}
		/>
	{/if}
	<slot/>
	{#if icon && iconPosition === 'right'}
		<Icon
			class="{$$slots.default ? iconPosition : ''}"
			{...( typeof icon === 'object' && 'svg' in icon ? icon : { svg: icon } )}
		/>
	{/if}

</button>

{#if tooltip}
	<Tooltip {...tooltip} />
{/if} -->

<script lang="ts">

	import './style.css'
	import { goto as gotoFunct } from '$app/navigation'
	import Icon from '$lib/components/icons/main.svelte'
	import Tooltip from '$lib/components/tooltip/main.svelte'

	import type {
		ComponentProps,
		Snippet,
	} from 'svelte'
	import type { HTMLButtonAttributes } from 'svelte/elements'

	type BtnHtml = Partial<Omit<HTMLButtonAttributes, 'type'>>
	type Props = BtnHtml & {
		icon?         : ComponentProps< typeof Icon> | ComponentProps<typeof Icon>['svg']
		iconPosition? : 'left' | 'right'
		hover?        : boolean
		goto?         : string
		href?         : string
		type?         : 'none' | 'dark' | 'transparent' | 'primary' | 'secondary' | 'logo'
		active?       : boolean
		class?        : string
		children?     : Snippet
		onclick?      : NonNullable<BtnHtml['on:click']>
		tooltip?      : ComponentProps< typeof Tooltip>
	}

	let {
		icon,
		iconPosition = 'left',
		hover = $bindable( false ),
		goto,
		href,
		type = 'primary',
		active = false,
		tooltip,
		class: Klass,
		children,
		onclick,
		...restProps
	}: Props = $props()

</script>

<button
	type="button"
	onmouseenter={() => hover = true}
	onmouseleave={() => hover = false}
	onclick={e => {

		onclick?.( e )
		if ( goto ) gotoFunct( goto, { noScroll: false } )
		if ( href ) window?.open( href, '_blank' )

	}}
	{...restProps}
	class="{type !== 'none' ? 'button ' + type : ''} {active ? ' active' : ''} {Klass ?? ''}"
>
	{#if icon && iconPosition === 'left'}
		<Icon
			class={children ? iconPosition : ''}
			{...( typeof icon === 'object' && 'svg' in icon ? icon : { svg: icon } )}
		/>
	{/if}

	{@render children?.()}

	{#if icon && iconPosition === 'right'}
		<Icon
			class={children ? iconPosition : ''}
			{...( typeof icon === 'object' && 'svg' in icon ? icon : { svg: icon } )}
		/>
	{/if}
</button>

{#if tooltip}
	<Tooltip {...tooltip} />
{/if}
