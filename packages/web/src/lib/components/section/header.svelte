<script lang="ts">
	import { faBars } from '@fortawesome/free-solid-svg-icons'
	import { writable } from 'svelte/store'

	import './header.css'
	import Button from '$lib/components/button/main.svelte'
	import { logoSVG } from '$lib/components/icons/main'
	import Popup from '$lib/components/popup/main.svelte'
	import {
		type Route,
		currentRouteID,
	} from '$lib/core/routes/main'

	export let nav: ( Route | {
		url  : string
		id   : string
		name : string
	} )[] | undefined = undefined
	export let home: Route

	const menuOpen = writable( false )
// $: console.log({menuOpen})
</script>

<header class="header">

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
					<Button
						type="{$currentRouteID == li.id ? 'primary' : 'transparent'}"
						goto={ 'path' in li && typeof li.path  == 'string' ? li.path : undefined}
						href={ 'url' in li && typeof li.url  == 'string' ? li.url : undefined}
						active={$currentRouteID == li.id}
						disabled={$currentRouteID == li.id}
					>
						{li.name}
					</Button>
				{/each}
			</div>
			<div class="header__menu_responsive">
				<Button
					type="none"
					icon={{
						svg   : faBars,
						class : '!text-[30px]',
					}}
					on:click={() => {

						$menuOpen = true

					}}
				/>
				<Popup bind:open={$menuOpen}>
					<div class="header__menu_responsive__content">
						{#each nav as li}
							<Button
								type="none"
								goto={ 'path' in li && typeof li.path  == 'string' ? li.path : undefined}
								href={ 'url' in li && typeof li.url  == 'string' ? li.url : undefined}
								on:click={() => {

									$menuOpen = false

								}}
								active={$currentRouteID == li.id}
							>
								{li.name}
							</Button>
						{/each}
					</div>
				</Popup>
			</div>

		{/if}

	</nav>
</header>
