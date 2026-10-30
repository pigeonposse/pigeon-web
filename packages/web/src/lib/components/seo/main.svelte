<script lang="ts">

	import { page } from '$app/state'

	type Props = {
		description? : string
		title?       : string
		pageTitle?   : string
		titleType?   : 'left' | 'right'
		image?       : string
		type?        : 'website' | 'article' | 'profile'
		noindex?     : boolean
	}

	let {
		description,
		title,
		pageTitle,
		titleType = 'right',
		image = '/card-image.png',
		type = 'website',
		noindex = false,
	}: Props = $props()

	const siteName = 'PigeonPosse'
	const fullTitle = $derived(
		pageTitle
			? ( title
				? titleType === 'right'
					? `${title} | ${pageTitle}`
					: `${pageTitle} | ${title}`
				: pageTitle )
			: ( title || siteName ),
	)
	const canonical = $derived( new URL( page.url.pathname, page.url.origin ).href )
	const imageUrl = $derived( new URL( image, page.url.origin ).href )
	const jsonLd = $derived( JSON.stringify( {
		'@context' : 'https://schema.org',
		'@type'    : 'WebSite',
		name       : siteName,
		url        : page.url.origin,
		...( description ? { description } : {} ),
	} ) )

</script>

<svelte:head>

	<title>{fullTitle}</title>

	{#if description}
		<meta
			name="description"
			content={description}
		/>
	{/if}

	<meta
		name="robots"
		content={noindex ? 'noindex, nofollow' : 'index, follow'}
	/>
	<link
		rel="canonical"
		href={canonical}
	/>

	<!-- Open Graph -->
	<meta
		property="og:site_name"
		content={siteName}
	/>
	<meta
		property="og:type"
		content={type}
	/>
	<meta
		property="og:title"
		content={fullTitle}
	/>
	<meta
		property="og:url"
		content={canonical}
	/>
	<meta
		property="og:image"
		content={imageUrl}
	/>
	<meta
		property="og:image:alt"
		content={fullTitle}
	/>
	{#if description}
		<meta
			property="og:description"
			content={description}
		/>
	{/if}

	<!-- Twitter -->
	<meta
		name="twitter:card"
		content="summary_large_image"
	/>
	<meta
		name="twitter:site"
		content="@pigeonposse_"
	/>
	<meta
		name="twitter:title"
		content={fullTitle}
	/>
	<meta
		name="twitter:image"
		content={imageUrl}
	/>
	{#if description}
		<meta
			name="twitter:description"
			content={description}
		/>
	{/if}

	{@html `<script type="application/ld+json">${jsonLd.replace( /</g, '\\u003c' )}</script>`}

</svelte:head>
