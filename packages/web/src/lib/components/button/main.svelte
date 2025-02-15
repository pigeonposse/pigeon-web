<script lang="ts">

	import './style.css'
	import { goto as gotoFunct } from '$app/navigation'
	import Icon from '$components/icons/main.svelte'
	import Tooltip from '$components/tooltip/main.svelte'

	import type {
		ComponentProps,
		Snippet,
	} from 'svelte'
	import type { HTMLButtonAttributes } from 'svelte/elements'

	type BtnHtml = Omit<HTMLButtonAttributes, 'type'>
	// eslint-disable-next-line no-unused-vars
	type GotoFn =  ( ( goto: typeof gotoFunct ) => ReturnType<typeof gotoFunct> )
	// eslint-disable-next-line no-unused-vars
	type OpenFn =  ( ( open: typeof window.open ) => ReturnType<typeof window.open> )

	type Props = BtnHtml & {
		icon?         : ComponentProps< typeof Icon> | ComponentProps<typeof Icon>['svg']
		iconPosition? : 'left' | 'right'
		hover?        : boolean
		goto?         : string | GotoFn
		href?         : string | OpenFn
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
	onclick={ async e => {

		try {

			if ( onclick ) onclick( e )

			if ( goto ) {

				if ( typeof goto === 'function' ) await goto( gotoFunct )
				else  gotoFunct( goto ) //window?.open( goto, '_selft' )

			}
			if ( href ) {

				if ( typeof href === 'function' ) await href( window?.open )
				else window?.open( href, '_blank' )

			}

		}
		catch ( e ) {

			console.debug( 'Error on click', e )

		}

	}}
	{...restProps}
	class="{type !== 'none' ? 'button ' + type : ''}{Klass ? ` ${Klass}` : ''}"
	class:active={active}
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
