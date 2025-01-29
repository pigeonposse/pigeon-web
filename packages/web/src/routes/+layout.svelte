<script lang="ts">
	
	import Body from '$lib/components/section/body.svelte';
	import Footer from '$lib/components/section/footer.svelte';
    import Header from '$lib/components/section//header.svelte';
    import { routes } from '$lib/core/routes/main';
	import { browser } from '$app/environment';
	
	import '../app.css'
    import { appWindow } from '$lib/core/window/main';

	export let data
	const {apiData} = data
	
	appWindow.viewTransitions()

	if(browser){
		console.log(`
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
		`)
	}

const medium = apiData.user?.social?.filter(d => d.provider === 'medium')[0]
console.log({apiData})
</script>

<Body>
	<Header 
		home={$routes.home} 
		nav={[$routes.projects, $routes.about, $routes.contribute, $routes.sponsors, ...( apiData.user?.social?.filter(d => d.provider === 'medium')[0] ? [{
			url: apiData.user?.social?.filter(d => d.provider === 'medium')[0].url,
			name: 'Newsroom',
			id: 'newsroom'
		}] : [])]}
	/>
	<slot/>
	{#if apiData.user?.social}
		<Footer 
			title={apiData.user.name}
			social={apiData.user.social}
			email={apiData.user.email}
			nav={[$routes.policy]}
		/>
	{/if}
</Body>

