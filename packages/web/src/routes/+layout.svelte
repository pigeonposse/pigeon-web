<script lang="ts">

	import { onMount } from 'svelte'

	import '../app.css'
	import { page } from '$app/state'
	import Body from '$lib/components/section/body.svelte'
	import Content from '$lib/components/section/content.svelte'
	import Error from '$lib/components/section/error.svelte'
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
			<Error title={'Error getting data from API'}>
				This is a web server related error, which means it will most likely be fixed temporarily. <br>
				If the error persists please do not hesitate to <a href="{PKG.repository.url}" target="_blank">contact us</a>.
			</Error>
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

