<script lang="ts">

	import {
		type IconDefinition,
		faGithub,
	} from '@fortawesome/free-brands-svg-icons'
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

	import type { ProjectProps } from './types'

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
		viewTransitionName = true,
		tags,
		class: Klass,
		onTagClick,
		...rest
	}: ProjectProps = $props()

	const getAuthor = ( t: 'name' | 'url' ) => {

		const content = data.content?.package?.content as { author?: {
			name? : string
			url?  : string
		} } | undefined
		return content && content.author?.[t] ? content.author?.[t] : undefined

	}
	// @ts-ignore
	const licenseUrl = data.content?.package?.content?.extra?.licenseUrl || data.content?.package?.content?.extra?.licenseURL
</script>

{#snippet tagSnippet( name: string )}
	<Badge
		hoverGlow={true}
		onclick={async e => {

			e.stopPropagation()
			e.preventDefault()

			await goto( $routes.projects.params.search.path( name ), { invalidateAll: true } )
			onTagClick?.( name )

		}}
		role="button"
		tabindex={0}
		type="primary"
	>{name}</Badge>
{/snippet}

{#snippet link( {
	href, title, icon,
}:{
	href  : string
	title : string
	icon  : IconDefinition
} )}
	<Link
		href={href}
		icon={icon}
		onclick={e => e.stopPropagation()}
		tooltip={{ title: title }}
	/>
{/snippet}

<CardMain
	class="project-{type}{Klass ? ' ' + Klass : ''}"
	data-sveltekit-preload-data
	href={type !== 'main' ? href : undefined}
	imgBgUrl={img}
	onclick={e => {

		if ( type !== 'main' ) return
		e.stopPropagation()
		e.preventDefault()

		goto( $routes.projects.child( data.id ) )

	}}
	{...rest}
>

	{#snippet contentTop()}
		{#if status && status !== 'active'}

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

		{/if}
	{/snippet}
	{#snippet contentHeader()}
		{#if type !== 'simple'}

			<Image
				style={viewTransitionName ? `view-transition-name: logo-${data.id};` : ''}
				class="card__image"
				alt="card-image-{data.id}"
				height="150"
				src={img}
				width="150"
			/>

		{/if}
	{/snippet}

	<div
		style={viewTransitionName ? `view-transition-name: content-${data.id};` : ''}
		class="card__content"
	>

		<div class="title">
			<h3>{title}</h3>
			<div>
				{#if githubUrl && data.stargazers && data.stargazers > 0}
					{@render link( {
						href  : githubUrl + '/stargazers',
						icon  : faStar,
						title : data?.stargazers + ' ' + $t( 'common.projects.card.starts' ),
					} )}
				{/if}
				{#if githubUrl && data.forks && data.forks > 0}
					{@render link( {
						href  : githubUrl + '/forks',
						icon  : faCodeFork,
						title : data?.forks + ' ' + $t( 'common.projects.card.forks' ),
					} )}
				{/if}
				{#if githubUrl && data.license?.name && data.license?.url}
					{@render link( {
						href  : licenseUrl || data.license.url,
						icon  : faBookOpen,
						title : $t( 'common.projects.card.license' ) + ': ' + data.license.key,
					} )}
				{/if}
				{#if getAuthor( 'name' ) && getAuthor( 'url' )}
					{@render link( {
						href  : getAuthor( 'url' ) as string,
						icon  : faSignature,
						title : 'Autor: ' + getAuthor( 'name' ) as string,
					} )}
				{/if}
			</div>
		</div>
		<p class="desc">{desc}</p>

		{#if tags}
			<div class="tags">

				{#if Array.isArray( tags )}
					{#each tags as tag ( tag )}
						{@render tagSnippet( tag )}
					{/each}
				{:else if typeof tags === 'string'}
					{@render tagSnippet( tags )}
				{/if}
			</div>
		{/if}

	</div>

	{#snippet contentFooter()}
		{#if type !== 'banner'}
			{#if webUrl}
				{@render link( {
					href  : webUrl,
					icon  : faGlobe,
					title : $t( 'common.projects.card.web' ),
				} )}
			{/if}
			{#if docsUrl}
				{@render link( {
					href  : docsUrl,
					icon  : faBook,
					title : $t( 'common.projects.card.docs' ),
				} )}
			{/if}
			{#if githubUrl}
				{@render link( {
					href  : githubUrl,
					icon  : faGithub,
					title : $t( 'common.projects.card.repo' ),
				} )}
			{/if}
		{/if}
	{/snippet}

</CardMain>
