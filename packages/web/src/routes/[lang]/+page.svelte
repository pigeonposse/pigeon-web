<script lang="ts">

	import { faGithub } from '@fortawesome/free-brands-svg-icons'
	import {
		faBookOpen,
		faCode,
	} from '@fortawesome/free-solid-svg-icons'

	import Cards from './contribute/cards.svelte'
	import Button from '$components/button/main.svelte'
	import CardCarousel from '$components/carousel/cards.svelte'
	import FeatCarousel from '$components/carousel/feat.svelte'
	import Section from '$components/section/container.svelte'
	import Page from '$components/section/content.svelte'
	import Typewriter from '$components/typewriter/main.svelte'

	import type { PageProps } from './$types'

	const { data }: PageProps = $props()

	const {
		t,
		routes,
		api,
		appName,
		apiRepos,
	} = data
	const config = api.getConfig()

</script>

<Page
	seo={{
		title       : 'A Software development collective',
		pageTitle   : appName,
		description : $t( 'common.home.desc' ),
		titleType   : 'left',

	}}
	share={$t( 'common.home.title' )}
>

	<Section type="start">
		<div slot="header">
			<h1 class="title">{appName}</h1>
		</div>
		<span class="title__subtitle">
			<span>{config?.title || $t( 'common.home.subtitle' ) || 'Software development collective focused on'}</span>
			<Typewriter
				texts={config?.titleOpts || [
					'Dev Tools',
					'User Utilities',
					'Software Plugins',
					'Software Themes',
					'Services',
				]}
				speed={100}
				delay={2000}
				class="title__subtitle__typewriter"
			/>
		</span>
		<span class="title__desc">{config?.action || $t( 'common.home.action' ) || 'Open source and self-hosting whenever possible.'}</span>
		<svelte:fragment slot="footer">
			<Button
				goto={ $routes.projects.path}
				icon={faGithub}
				type="primary"
			>Github</Button>
			<Button
				goto={ $routes.projects.path}
				icon={faCode}
				type="dark"
			>{$t( 'common.projects.title' )}</Button>
			<Button
				goto={ $routes.about.path}
				icon={faBookOpen}
				type="dark"
			>{$t( 'common.about.title' )}</Button>
		</svelte:fragment>

	</Section>

	{#if apiRepos}

		{#if 'feat' in apiRepos}
			<Section
				type="diagonal-bottom"
				title={$t( 'common.projects.feat' )}
				btnTitle={$t( 'common.btns.viewMore' )}
				goto={$routes.projects.path}
			>
				<div class="py-8 flex flex-col gap-4 w-full">
					<FeatCarousel values={apiRepos.feat} />
				</div>
			</Section>

		{/if}
		{#if 'general' in apiRepos}
			<Section
				type="diagonal-bottom"
				title={$t( 'common.projects.title' )}
				btnTitle={$t( 'common.btns.projects' )}
				goto={ $routes.projects.path}
			>
				<CardCarousel
					values={apiRepos.general}
					max={10}
					goto={$routes.projects.path}
					type="right"
				/>
			</Section>

		{/if}
	{:else}
		<div class="flex items-center justify-center h-[50vh]">
			{$t( 'common.projects.error' )}
		</div>
	{/if}

	<Section
		title={$t( 'common.contribute.title' )}
		btnTitle={$t( 'common.btns.readMore' )}
		type="diagonal-bottom"
		goto={ $routes.contribute.path}
	>

		{#if api.data?.user }
			<Cards data={api.data.user}/>
		{/if}

	</Section>

</Page>
