<script lang="ts">

	import { onMount } from 'svelte'
	import { pwaAssetsHead } from 'virtual:pwa-assets/head'
	import { pwaInfo } from 'virtual:pwa-info'

	import '../app.css'
	import '../hint.css'
	import { page } from '$app/state'

	import type { LayoutProps } from './$types'

	import {
		Button,
		Link,
	} from '#components/index'
	import Body from '#components/section/body.svelte'
	import Content from '#components/section/content.svelte'
	import Error from '#components/section/error.svelte'
	import Header from '#components/section/header.svelte'
	import { joinURL } from '#core/utils/main'
	import { app } from '#lib/core/index.svelte.ts'
	import { routes } from '#lib/core/routes/main'
	import { appWindow } from '#lib/core/window/index.svelte.ts'

	let {
		data,
		children,
	}: LayoutProps = $props()

	const api     = $derived( data.api )
	const apiData = $derived( data.apiData )
	const t       = $derived( data.t )

	const config = $derived( api.getConfig() )

	app.window.addViewTransition()

	onMount( async () => {

		appWindow.showMark()

		if ( typeof window === 'undefined' || !config?.scripts ) return

		config.scripts.forEach( opt => {

			if ( opt.length > 2 ) {

				const [
					tag,
					attributes,
					innerContent,
				] = opt

				const element = document.createElement( tag )

				Object.entries( attributes ).forEach( ( [ key, value ] ) => {

					element.setAttribute( key, value )

				} )

				if ( innerContent )
					element.innerHTML = innerContent

				document.head.appendChild( element )

			}

		} )

	} )

</script>

<svelte:head>

	{#if pwaInfo?.webManifest.href}
		<link
			href={pwaInfo.webManifest.href.replace( './', '/' )}
			rel="manifest"
		/>
	{/if}
	{#if pwaAssetsHead.themeColor}
		<meta
			name="theme-color"
			content={pwaAssetsHead.themeColor.content}
		/>
	{/if}
	{#each pwaAssetsHead.links as link}
		<link
			{...link}
			href={link.href.replace( './', '/' )}
		/>
	{/each}
</svelte:head>

<a
	class="skip-link"
	href="#main-content"
>{$t( 'common.a11y.skip' )}</a>

<Body class={apiData && !page.error ? 'justify-start' : 'justify-between'}>

	<Header
		home={$routes.home}
		nav={[
			$routes.projects,
			$routes.about,
			$routes.contribute,
			$routes.sponsors,
			...( apiData?.user?.social?.filter( d => d.provider === 'medium' )[0]
				? [
					{
						url  : apiData?.user?.social?.filter( d => d.provider === 'medium' )[0].url,
						name : 'Newsroom',
						id   : 'newsroom',
					},
				]
				: []
			),
		]}
	/>

	{#if apiData}
		{@render children()}
	{:else}

		<Content
			title="Temporal Server Error"
			type="center"
		>
			<Error title="Error getting data from API">
				This is a web server related error, which means it will most likely be fixed temporarily. <br>
				If the error persists please do not hesitate to <a
					href="{PKG.repository.url}"
					target="_blank"
				>contact us</a>.
			</Error>
		</Content>

	{/if}

	<footer class="footer">

		<div class="footer__top">

			<div class="footer__brand">
				<span class="footer__brand-name">{apiData?.user.name || 'PigeonPosse'}</span>
				<p class="footer__brand-desc">{$t( 'common.home.action' )}</p>
			</div>

			<nav
				class="footer__nav"
				aria-label={$t( 'common.info.more.title' )}
			>
				<Button
					goto={$routes.projects.path}
					type="transparent"
				>{$routes.projects.name}</Button>
				<Button
					goto={$routes.about.path}
					type="transparent"
				>{$routes.about.name}</Button>
				<Button
					goto={$routes.contribute.path}
					type="transparent"
				>{$routes.contribute.name}</Button>
				<Button
					goto={$routes.sponsors.path}
					type="transparent"
				>{$routes.sponsors.name}</Button>
				<Link
					class="footer__nav-link"
					href="https://github.com/pigeonposse"
				>GitHub</Link>
			</nav>

		</div>

		<div class="footer__bottom">
			<span>© {new Date().getFullYear()} {apiData?.user.name}</span>
			<div class="footer__meta">
				<Link
					class="footer__credit"
					href={MAIN_PKG.repository.url}
				>
					Made with ❤️ by <i>{MAIN_PKG.extra.collective.name}</i>
				</Link>
				<span class="footer__separator">·</span>
				<Link
					class="footer__version"
					href={joinURL( 'https://www.npmjs.com/package', PKG.name )}
				>{`v${PKG.version}`}</Link>
			</div>
		</div>

	</footer>

</Body>

