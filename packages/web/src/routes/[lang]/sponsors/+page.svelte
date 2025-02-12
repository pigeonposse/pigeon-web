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

	export let data

	const {
		t, routes, appName, api,
	} = data
	const fund = api.data?.user?.funding?.filter( d => d.provider === 'opencollective' )[0] || api.data?.user?.funding?.[0]
</script>

<Page
	title={$t( 'common.sponsors.title' )}
	seo={{
		pageTitle   : appName,
		description : $t( 'common.sponsors.desc' ),
	}}
	share={$t( 'common.sponsors.title' )}
>
	<Card class="my-8 p-4 text-start cursor-auto">
		<div class="flex flex-col lg:flex-row gap-4 justify-between items-center">
			<div class="flex flex-col">

				<h2 class="text-[30px] font-extrabold">{$t( 'common.sponsors.action.title' )}</h2>
				<p>{$t( 'common.sponsors.action.desc' )}</p>

				<div class="flex gap-4 sm:flex-row flex-col">
					{#if api.data?.user}

						{#if fund }
							<Button
								href={fund.url}
								icon={faHeart}
								class="secondary"
							>
								{fund.provider === 'opencollective' ? 'Open Collective' : fund.provider}
							</Button>
						{/if}

						<Button
							href={'mailto:' + api.data?.user.email}
							icon={faPaperPlane}
							class="primary"
						>
							{$t( 'common.sponsors.action.email' )}
						</Button>
					{/if}

				</div>
			</div>
			<Fa icon={faHandshake} class="!w-40 !h-40 opacity-20"/>
		</div>
	</Card>

	<Section
		title={'Contribute'}
		btnTitle={'Leer mas'}
		goto={$routes.contribute.path}
		type="diagonal-bottom"
	>
		{#if api.data?.user }
			<Cards data={api.data?.user}/>
		{/if}
	</Section>

</Page>
