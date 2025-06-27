<script lang="ts">

	import {
		faHandshake,
		faHeart,
		faPaperPlane,
	} from '@fortawesome/free-solid-svg-icons'
	import Fa from 'svelte-fa'

	import Cards from '../contribute/cards.svelte'
	import Button from '$components/button/main.svelte'
	import Card from '$components/card/main.svelte'
	import Section from '$components/section/container.svelte'
	import Page from '$components/section/content.svelte'

	import type { PageProps } from './$types'

	const { data }: PageProps = $props()

	const {
		t, routes, appName, api,
	} = data

	const fund = api.data?.user?.funding?.filter( d => d.provider === 'opencollective' )[0] || api.data?.user?.funding?.[0]

</script>

<Page
	seo={{
		pageTitle   : appName,
		description : $t( 'common.sponsors.desc' ),
	}}
	share={$t( 'common.sponsors.title' )}
	title={$t( 'common.sponsors.title' )}
>
	<Card class="my-8 p-4 text-start cursor-auto">
		<div class="flex flex-col lg:flex-row gap-4 justify-between items-center">
			<div class="flex flex-col">

				<h2 class="text-[30px] font-extrabold">{$t( 'common.sponsors.action.title' )}</h2>
				<p>{$t( 'common.sponsors.action.desc' )}</p>

				<div class="flex gap-4 sm:flex-row flex-col">
					{#if api.data?.user}

						{#if fund}
							<Button
								class="secondary"
								href={fund.url}
								icon={faHeart}
							>
								{fund.provider === 'opencollective' ? 'Open Collective' : fund.provider}
							</Button>
						{/if}

						<Button
							class="primary"
							href={'mailto:' + api.data?.user.email}
							icon={faPaperPlane}
						>
							{$t( 'common.sponsors.action.email' )}
						</Button>
					{/if}

				</div>
			</div>
			<Fa
				class="!w-40 !h-40 opacity-20"
				icon={faHandshake}
			/>
		</div>
	</Card>

	<Section
		btnTitle="Leer mas"
		goto={$routes.contribute.path}
		title="Contribute"
		type="diagonal-bottom"
	>
		{#if api.data?.user}
			<Cards data={api.data?.user} />
		{/if}
	</Section>

</Page>
