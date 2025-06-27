<script lang="ts">
	import { faBars } from '@fortawesome/free-solid-svg-icons'
	import { onMount } from 'svelte'

	import './header.css'
	import Button from '$components/button/main.svelte'
	import { logoSVG } from '$components/icons/main'
	import Popup from '$components/popup/main.svelte'
	import type { Route } from '$core/routes/types'
	import { currentRouteID } from '$lib/core/routes/main'

	type Nav = ( Route | {
		url  : string
		id   : string
		name : string
	} )
	let {
		home, nav,
	} : {
		home : Route
		nav? : Nav[] | undefined
	} = $props()

	let el: Element
	let menuOpen = $state( false )
	let isSticky = $state( false )

	const handleScroll = ( e:Event ) => {

		// @ts-ignore
		isSticky = e.target?.scrollTop !== 0

	}

	onMount( () => {

		const parent = document.querySelector( '.page__content' )
		parent?.addEventListener( 'scroll', handleScroll )

		return () => parent?.removeEventListener( 'scroll', handleScroll )

	} )

</script>

{#snippet navBtns( li: Nav, isMenu = false )}
	<Button
		active={$currentRouteID == li.id}
		disabled={$currentRouteID == li.id}
		goto={'path' in li && typeof li.path == 'string' ? li.path : undefined}
		href={'url' in li && typeof li.url == 'string' ? li.url : undefined}
		onclick={() => {

			if ( isMenu ) menuOpen = false

		}}
		type={$currentRouteID.includes( li.id ) ? 'primary' : 'transparent'}
	>
		{li.name}
	</Button>
{/snippet}

<header
	bind:this={el}
	class={[ 'header', isSticky ? 'stuck' : '' ]}
>
	<Button
		active={$currentRouteID == home.id}
		disabled={$currentRouteID == home.id}
		goto={home.path}
		icon={{
			svg   : logoSVG,
			class : 'header__logo',
		}}
		type="logo"
	/>
	<nav>

		{#if nav}

			<div
				class="header__menu"
				aria-hidden="false"
			>
				{#each nav as li ( li.id )}
					{@render navBtns( li )}
				{/each}
			</div>
			<div class="header__menu_responsive">
				<Button
					icon={{
						svg   : faBars,
						class : '!text-[30px]',
					}}
					onclick={() => menuOpen = true}
					type="none"
				/>
				<Popup bind:open={menuOpen}>
					<div class="header__menu_responsive__content">
						{@render navBtns( home, true )}
						{#each nav as li ( li.id )}
							{@render navBtns( li, true )}
						{/each}
					</div>
				</Popup>
			</div>

		{/if}

	</nav>
</header>
