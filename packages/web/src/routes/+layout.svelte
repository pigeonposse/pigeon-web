<script lang="ts">

	import { onMount } from 'svelte'

	import '../app.css'
	import Body from '$lib/components/section/body.svelte'
	import Page from '$lib/components/section/content.svelte'
	import Footer from '$lib/components/section/footer.svelte'
	import Header from '$lib/components/section/header.svelte'
	import { routes } from '$lib/core/routes/main'
	import { appWindow } from '$lib/core/window/main'

	import type { LayoutProps } from './$types'

	let {
		data,
		children,
	}: LayoutProps = $props()

	const {
		error,
		api,
	} = data

	const config = api.getConfig()

	appWindow.viewTransitions()
	appWindow.showMark()

	onMount( async () => {

		await api.get()
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

				if ( innerContent ) {

					element.innerHTML = innerContent

				}

				document.head.appendChild( element )

			}

		} )

	} )
</script>

<!-- <svelte:head>

	{#if browser && config?.scripts }
		{#each config?.scripts as opt}

			{@html opt.length > 2
				? `<${opt[0]} ${Object.entries( opt[1] ).map( ( [ k, v ] ) => `${k}=${v}` ).join( ' ' )}>${opt[2] || ''}</${opt[0]}>`
				: ''
			}

		{/each}
	{/if}

</svelte:head> -->

<Body>

	{#if api.data }
		<Header
			home={$routes.home}
			nav={[
				$routes.projects,
				$routes.about,
				$routes.contribute,
				$routes.sponsors,
				...( api.data.user?.social?.filter( d => d.provider === 'medium' )[0]
					? [
						{
							url  : api.data.user?.social?.filter( d => d.provider === 'medium' )[0].url,
							name : 'Newsroom',
							id   : 'newsroom',
						},
					]
					: [] ),
			]}
		/>

		{@render children()}

		{#if api.data.user?.social}
			<Footer
				title={api.data.user.name}
				social={api.data.user.social}
				email={api.data.user.email}
				github={'https://github.com/' + api.data.user.id}
				nav={[ $routes.policy ]}
			/>
		{/if}

	{:else}

		<Header
			home={$routes.home}
			nav={[
				$routes.projects,
				$routes.about,
				$routes.contribute,
				$routes.sponsors,
			]}
		/>
		<Page title="Temporal Server Error" type="center">

			<div class="py-10 flex items-center justify-center flex-col gap-4 sm:text-center">
				<h2 class="sm:text-8xl text-6xl font-extrabold text-primary-300 text_color_change">{error}</h2>

				<span class="py-10">
					This is a web server related error, which means it will most likely be fixed temporarily. <br>
					If the error persists please do not hesitate to <a href="{PKG.repository.url}" target="_blank">contact us</a>.
				</span>

				<div class="text-9xl sm:py-10 py-4 w-full relative">
					<span class="blur-[80px] absolute inset-0">💥</span>
					<span class="absolute inset-0">💥</span>
				</div>
			</div>

		</Page>
		<Footer/>
	{/if}

</Body>

