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
		type={$currentRouteID.includes( li.id ) ? 'primary' : 'transparent'}
		goto={ 'path' in li && typeof li.path  == 'string' ? li.path : undefined}
		href={ 'url' in li && typeof li.url  == 'string' ? li.url : undefined}
		active={$currentRouteID == li.id}
		disabled={$currentRouteID == li.id}
		onclick={() => {

			if ( isMenu ) menuOpen = false

		}}
	>
		{li.name}
	</Button>
{/snippet}

<header
	class="header{isSticky ? ' stuck' : ''}"
	bind:this={el}
>

	<Button
		goto={home.path}
		type="logo"
		icon={{
			svg   : logoSVG,
			class : 'header__logo',
		}}
		disabled={$currentRouteID == home.id}
	/>

	<nav>

		{#if nav}

			<div class="header__menu">
				{#each nav as li}
					{@render navBtns( li )}
				{/each}
			</div>
			<div class="header__menu_responsive">
				<Button
					type="none"
					icon={{
						svg   : faBars,
						class : '!text-[30px]',
					}}
					onclick={() => {

						menuOpen = true

					}}
				/>
				<Popup bind:open={menuOpen}>
					<div class="header__menu_responsive__content">
						{@render navBtns( home, true )}
						{#each nav as li}
							{@render navBtns( li, true )}
						{/each}
					</div>
				</Popup>
			</div>

		{/if}

	</nav>
</header>
