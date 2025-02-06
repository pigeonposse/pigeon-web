<script lang="ts">

	import { onMount } from 'svelte'

	import '../app.css'
	import { browser } from '$app/environment'
	import Body from '$lib/components/section/body.svelte'
	import Page from '$lib/components/section/content.svelte'
	import Footer from '$lib/components/section/footer.svelte'
	import Header from '$lib/components/section/header.svelte'
	import { routes } from '$lib/core/routes/main'
	import { appWindow } from '$lib/core/window/main'

	export let data

	const {
		apiData,
		error,
		api,
	} = data

	const config = api.getConfig()

	appWindow.viewTransitions()

	if ( browser ) console.log( `
.:--==========++========-:.      
-======+==++++++++++=+====--:     
====+++++*+++++**++*+=====---     
-==+++*%@@++++#@%=*@@#+===---     
--==+%@@#+++=*@@+===*@@#=----     
:--=+%@@#++=*@@+====#@@*---:-     
:---==+#@@+=@@+-=-=@@*=------     
::---====+====-----=-:-----:-     
:::----=-----------::-------.     
::::---:::::::::::::::::::.       
..:::.                            
...      

Made with ❤️ by Pigeonposse

https://pigeonposse.com
		` )

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

	{#if apiData }
		<Header
			home={$routes.home}
			nav={[
				$routes.projects,
				$routes.about,
				$routes.contribute,
				$routes.sponsors,
				...( apiData.user?.social?.filter( d => d.provider === 'medium' )[0]
					? [
						{
							url  : apiData.user?.social?.filter( d => d.provider === 'medium' )[0].url,
							name : 'Newsroom',
							id   : 'newsroom',
						},
					]
					: [] ),
			]}
		/>

		<slot/>

		{#if apiData.user?.social}
			<Footer
				title={apiData.user.name}
				social={apiData.user.social}
				email={apiData.user.email}
				github={'https://github.com/' + apiData.user.id}
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

