<script lang="ts">

	import { onMount } from 'svelte'
	import { pwaAssetsHead } from 'virtual:pwa-assets/head'
	import { pwaInfo } from 'virtual:pwa-info'

	import '../app.css'
	import '../hint.css'
	import { page } from '$app/state'
	import Link from '$components/button/link.svelte'
	import Body from '$components/section/body.svelte'
	import Content from '$components/section/content.svelte'
	import Error from '$components/section/error.svelte'
	import Header from '$components/section/header.svelte'
	import { joinURL } from '$core/utils/main'
	import { routes } from '$lib/core/routes/main'
	import { appWindow } from '$lib/core/window/main'

	import type { LayoutProps } from './$types'

	let {
		data,
		children,
	}: LayoutProps = $props()

	const {
		api,
		apiData,
	} = data

	const config = api.getConfig()
	appWindow.viewTransitions()

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
	{@html pwaInfo ? pwaInfo.webManifest.linkTag : ''}
	{#if pwaAssetsHead.themeColor}
		<meta
			name="theme-color"
			content={pwaAssetsHead.themeColor.content}
		/>
	{/if}
	{#each pwaAssetsHead.links as link}
		<link {...link} />
	{/each}
</svelte:head>

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

		{#if apiData?.user.name}
			<span>{apiData?.user.name}</span>
		{/if}

		<Link
			class=""
			href="https:github.com/pigeonposse"
		>
			Made with ❤️ by <i>PigeonPosse</i>
		</Link>
		<Link
			class="!text-primary-100 opacity-50"
			href={joinURL( 'https://www.npmjs.com/package', PKG.name )}
		>{`v${PKG.version}`}</Link>

	</footer>

</Body>

