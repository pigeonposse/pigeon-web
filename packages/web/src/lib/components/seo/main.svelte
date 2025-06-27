<script lang="ts">

	type Props = {
		description? : string
		title?       : string
		pageTitle?   : string
		titleType?   : 'left' | 'right'
	}

	let {
		description,
		title,
		pageTitle,
		titleType = 'right',
	}: Props = $props()

</script>

<svelte:head>

	<title>
		{pageTitle
			? ( title
				? titleType === 'right'
					? `${title} | ${pageTitle}`
					: `${pageTitle} | ${title}`
				: pageTitle )
			: title}
	</title>

	{#if description}
		<meta
			name="description"
			content={description}
		/>
	{/if}

</svelte:head>
