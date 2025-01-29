<script lang="ts">

	import type { ApiData } from "$lib/core/api/main";

    import Card from "./card.svelte"

    export let data: NonNullable<NonNullable<ApiData>['user']>

</script>

<div class="grid md:grid-cols-3 sm:grid-cols-1 gap-4 py-4">

{#each (data.funding || []) as funding}

	{#if funding.provider === 'kofi'}
		<Card
			name={'Ko-Fi'}
			href={funding.url}
			type="kofi"
			desc="Support us on Ko-fi to help us continue creating amazing content and tools for the community."
		/>
	{:else if funding.provider === 'github'}
		<Card
			name={'GitHub Sponsors'}
			href={funding.url}
			desc="Support us on GitHub Sponsors to help fund the development of our open-source projects."
			type={funding.provider}
		/>
	{:else if funding.provider === 'opencollective'}
		<Card
			name={'OpenCollective'}
			href={funding.url}
			type={funding.provider}
			desc="Your contributions on OpenCollective help us maintain and improve our open-source projects."
			feat={true}
		/>
	{/if}

{/each}

</div>


