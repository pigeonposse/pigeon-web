<script lang="ts">

	import { faPatreon } from '@fortawesome/free-brands-svg-icons'
	import { faHeart } from '@fortawesome/free-solid-svg-icons'

	import './cards.css'
	import { page } from '$app/state'
	import Card from '$components/card/main.svelte'
	import {
		Fa,
		githubsponsorsSVG,
		kofiSVG,
		opencollectiveSVG,
	} from '$components/icons/main'
	import type { ApiData } from '$lib/core/api/types'

	type User = NonNullable<NonNullable<ApiData>['user']>
	type Funding = NonNullable<User['funding']>
	type Provider = Funding[number]['provider']

	export let data: User

	const { t } = page.data

</script>

{#snippet card( {
	type, name, href, feat, desc,
}: {
	type  : Provider
	name  : string
	href  : string
	feat? : boolean
	desc? : string
} )}

	<Card
		class="card__contribute {feat ? 'colored_feat' : 'colored'}"
		{href}
	>
		<div class="card__content">
			<span class="card__content__header">

				{#if type === 'kofi'}
					{@html kofiSVG}
				{:else if type === 'opencollective'}
					{@html opencollectiveSVG}
				{:else if type === 'github'}
					{@html githubsponsorsSVG}
				{:else if type === 'patreon'}
					<Fa icon={faPatreon} />
				{:else}
					<Fa icon={faHeart} />
				{/if}

			</span>
			<div class="card__content__text">
				<h3>{name}</h3>
				<div>
					{desc || ''}
				</div>
			</div>
		</div>
		<span class="button {feat ? 'secondary' : 'primary'}">
			{$t( 'common.contribute.title' )}
		</span>
	</Card>

{/snippet}

<div class="contribute_container">

	{#each ( data.funding || [] ) as funding}

		{#if funding.provider !== 'custom'}

			{@render card( {
				name : $t( `common.contribute.funding.${funding.provider}.title` ),
				desc : $t( `common.contribute.funding.${funding.provider}.desc` ),
				href : funding.url,
				type : funding.provider,
				feat : funding.provider === 'opencollective',
			} )}

		{/if}

	{/each}

</div>

