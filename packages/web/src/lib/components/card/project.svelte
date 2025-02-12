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

	import { goto } from '$app/navigation'
	import Badge from '$components/badge/main.svelte'
	import Link from '$components/button/link.svelte'
	import CardMain from  '$components/card/main.svelte'
	import Image from '$components/image/main.svelte'
	import { t } from '$core/i18n/main'
	import { routes } from '$core/routes/main'
	import type { ApiDataRepo } from '$lib/core/api/types'

	import type { ComponentProps } from 'svelte'
	import type { HTMLButtonAttributes } from 'svelte/elements'

	type Parent = Pick<ComponentProps<typeof CardMain>, 'onclick'>
	type Props = Parent & Partial<Omit<HTMLButtonAttributes, 'type'>> & {
		href?      : string
		title      : string
		desc       : string
		img        : string
		githubUrl? : string
		webUrl?    : string
		docsUrl?   : string
		type?      : 'simple' | 'banner' | 'main'
		data       : ApiDataRepo
		status?    : string
		tags?      : string[] | string
		class?     : string
	}

	let {
		href,
		title,
		desc,
		img,
		githubUrl,
		webUrl,
		docsUrl,
		type = 'main',
		data,
		status = 'active',
		tags,
		class: Klass,
		...rest
	}: Props = $props()

	const getAuthor = ( t: 'name' | 'url' ) => {

		const content = data.content?.package?.content as { author?: {
			name? : string
			url?  : string
		} } | undefined
		return content && content.author?.[t] ? content.author?.[t] : undefined

	}

</script>

{#snippet tagSnippet( name: string )}
	<Badge
		type="primary"
		hoverGlow={true}
		onclick={e => {

			e.stopPropagation()

			goto( $routes.projects.params.search.path( name ) )

		}}
	>{name}</Badge>
{/snippet}

<CardMain
	href={href}
	imgBgUrl={img}
	class="project {Klass || ''}"
	{...rest}
>

	{#snippet contentTop()}

		<div>
			{#if status === 'idea'}
				<Badge type="purple">{$t( 'common.projects.card.status.idea' )}</Badge>
			{:else if status === 'development'}
				<Badge type="yellow">{$t( 'common.projects.card.status.development' )}</Badge>
			{:else if status === 'coming-soon'}
				<Badge type="green">{$t( 'common.projects.card.status.coming-soon' )}</Badge>
			{:else if status === 'alpha'}
				<Badge type="primary">{$t( 'common.projects.card.status.alpha' )}</Badge>
			{:else if status === 'beta'}
				<Badge type="primary">{$t( 'common.projects.card.status.beta' )}</Badge>
			{:else if status === 'archived'}
				<Badge type="red">{$t( 'common.projects.card.status.archived' )}</Badge>
			{:else if status === 'abandoned'}
				<Badge type="gray">{$t( 'common.projects.card.status.abandoned' )}</Badge>
			{/if}
		</div>

	{/snippet}

	{#if type !== 'simple'}

		<Image
			src={img}
			alt="card-image-{data.id}"
			width="150"
			height="150"
			class="card__image"
		/>

	{/if}

	<div class="card__content">

		<div class="title">
			<h3>{title}</h3>
			<div >
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
						tooltip={{ title: $t( 'common.projects.card.license' ) + ': ' + data.license.key }}
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
		<p class="desc">{desc}</p>

		{#if tags }
			<div class="tags scrollbar_hide">
				{#if Array.isArray( tags )}

					{#each tags as tag}
						{@render tagSnippet( tag )}
					{/each}

				{:else if typeof tags === 'string'}
					{@render tagSnippet( tags )}
				{/if}
			</div>

		{/if}

	</div>

	{#snippet contentFooter()}

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

	{/snippet}
</CardMain>
