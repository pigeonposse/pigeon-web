<script lang="ts">

	import { faGithub } from '@fortawesome/free-brands-svg-icons'
	import {
		faBook,
		faBookOpen,
		faCodeFork,
		faGlobe,
		faSignature,
		faStar,
	} from '@fortawesome/free-solid-svg-icons'

	import { page } from '$app/state'
	import Badge from '$lib/components/badge/main.svelte'
	import CardMain from  '$lib/components/card/main.svelte'
	import Image from '$lib/components/image/main.svelte'
	import Link from '$lib/components/link/main.svelte'
	import type { ApiDataRepo } from '$lib/core/api/types'

	const { t } = page.data

	export let href:string
	export let title: string
	export let desc: string
	export let img: string
	export let githubUrl: string | undefined = undefined
	export let webUrl: string | undefined = undefined
	export let docsUrl: string | undefined = undefined
	export let type: 'simple' | 'main' = 'main'
	export let data: ApiDataRepo
	export let status: string = 'active'
	export let tags: string[] | string | undefined = undefined

	const getAuthor = ( t: 'name' | 'url' ) => {

		const content = data.content?.package?.content as { author?: {
			name? : string
			url?  : string
		} } | undefined
		return content && content.author?.[t] ? content.author?.[t] : undefined

	}
</script>

<CardMain
	href={href}
	imgBgUrl={img}
	{...$$restProps}
	class={$$restProps.class || ''}
>

	<div slot="top">
		{#if status === 'idea'}
			<Badge type="purple">idea</Badge>
		{:else if status === 'dev'}
			<Badge type="yellow">development</Badge>
		{:else if status === 'coming-soon'}
			<Badge type="green">coming soon</Badge>
		{:else if status === 'alpha'}
			<Badge type="primary">alpha</Badge>
		{:else if status === 'beta'}
			<Badge type="primary">beta</Badge>
		{:else if status === 'archived'}
			<Badge type="red">archived</Badge>
		{/if}
	</div>

	{#if type === 'main'}

		<Image
			src={img}
			alt="card-image-{data.id}"
			width="150"
			height="150"
			class="object-contain min-w-[150px] min-h-[150px] max-w-[150px] max-h-[150px]"
		/>
	{/if}

	<div class="flex flex-col justify-between items-start gap-2 break-words text-start h-full">
		<div class="max-w-full">
			<div class="flex items-center gap-4">
				<h3 class="mb-2 text-2xl font-bold tracking-tight text-white">{title}</h3>
				<div class="flex items-start gap-2 [&_a]:opacity-30 [&_svg]:h-3 mb-2">
					{#if githubUrl && data.stargazers && data.stargazers > 0}
						<Link
							href={githubUrl + '/stargazers'}
							icon={faStar}
							tooltip={{ title: data?.stargazers + ' ' + $t( 'common.projects.card.starts' ) }}
						/>
					{/if}
					{#if githubUrl && data.forks && data.forks > 0}
						<Link
							href={githubUrl + '/forks'}
							icon={faCodeFork}
							tooltip={{ title: data?.forks + ' ' + $t( 'common.projects.card.forks' ) }}
						/>
					{/if}
					{#if githubUrl && data.license?.name && data.license?.url}
						<Link
							href={data.license.url}
							icon={faBookOpen}
							tooltip={{ title: $t( 'common.projects.card.license' ) + ': ' + data.license.name }}
						/>
					{/if}
					{#if getAuthor( 'name' ) && getAuthor( 'url' )}
						<Link
							href={getAuthor( 'url' ) as string}
							icon={faSignature}
							tooltip={{ title: 'Autor: ' + getAuthor( 'name' ) as string }}
						/>
					{/if}
				</div>
			</div>
			<p class="opacity-60">{desc}</p>

			{#if tags }
				{#if Array.isArray( tags )}
					<div class="flex gap-2 flex-wrap max-h-[90px] overflow-y-scroll scrollbar_hide">
						{#each tags as tag}
							<Badge
								type="primary"
								class="opacity-60"
							>{tag}</Badge>
						{/each}
					</div>
				{:else if typeof tags === 'string'}
					<Badge type="primary" class="opacity-60">{tags}</Badge>
				{/if}

			{/if}
		</div>
	</div>
	<div slot="footer" class="flex gap-4 w-full justify-end">

		{#if webUrl}
			<Link
				href={webUrl}
				icon={faGlobe}
				tooltip={{ title: $t( 'common.projects.card.web' ) }}
			/>
		{/if}
		{#if docsUrl}
			<Link
				href={docsUrl}
				icon={faBook}
				tooltip={{ title: $t( 'common.projects.card.docs' ) }}
			/>
		{/if}
		{#if githubUrl}
			<Link
				href={githubUrl}
				icon={faGithub}
				tooltip={{ title: $t( 'common.projects.card.repo' ) }}
			/>
		{/if}
	</div>
</CardMain>
