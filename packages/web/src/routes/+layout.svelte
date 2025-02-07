<script lang="ts">

	import { onMount } from 'svelte'

	import '../app.css'
	import { page } from '$app/state'
	import Body from '$lib/components/section/body.svelte'
	import Content from '$lib/components/section/content.svelte'
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
		api,
		apiData,
	} = data

	const config = api.getConfig()

	appWindow.viewTransitions()
	appWindow.showMark()

	onMount( async () => {

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
				: [] ),
		]}
	/>

	{#if apiData }
		{@render children()}
	{:else}

		<Content title="Temporal Server Error" type="center">

			<div class="py-10 flex items-center justify-center flex-col gap-4 sm:text-center">
				<h2 class="sm:text-8xl text-6xl font-extrabold text-primary-300 text_color_change">{
					'Error getting data from API'
				}</h2>

				<span class="py-10">
					This is a web server related error, which means it will most likely be fixed temporarily. <br>
					If the error persists please do not hesitate to <a href="{PKG.repository.url}" target="_blank">contact us</a>.
				</span>

				<div class="text-9xl sm:py-10 py-4 w-full relative">
					<span class="blur-[80px] absolute inset-0">💥</span>
					<span class="absolute inset-0">💥</span>
				</div>
			</div>

		</Content>

	{/if}

	<Footer
		title={apiData?.user?.name}
		social={apiData?.user?.social}
		email={apiData?.user?.email}
		github={apiData?.user?.id ? ( 'https://github.com/' + apiData.user.id ) : undefined}
		nav={[ $routes.policy ]}
	/>

</Body>

