<script lang="ts">
	import {
	faBook,
		faChevronLeft,
		faChevronRight,
		faClose,
		faGlobe,
	} from '@fortawesome/free-solid-svg-icons'
	import { onMount } from 'svelte'

	import './style.css'
	import { replaceState } from '$app/navigation'
	import Button from '$components/button/main.svelte'
	import CardProject from '$components/card/project.svelte'
	import Content from '$components/section/content.svelte'
	import { t } from '$core/i18n/main'
	import { routes } from '$core/routes/main'
	import Link from '$components/button/link.svelte';
	import { joinURL } from '$core/utils/main';
	import { faGithub, faNpm, faReadme } from '@fortawesome/free-brands-svg-icons';

	let { data } = $props()

	function generateUniqueId( text: string, existingIds: Set<string> ): string {

		let id    = text.replace( /\s+/g, '-' )
		let count = 1
		while ( existingIds.has( id ) ) {

			id = `${text.replace( /\s+/g, '-' )}-${count}`
			count++

		}
		existingIds.add( id )
		return id

	}

	function handleAnchorClick( event: Event ) {

		event.preventDefault()
		const target = event.currentTarget as HTMLElement
		const id     = target.getAttribute( 'id' )
		if ( id ) {

			replaceState( `#${id}`, {} )
			document.getElementById( id )?.scrollIntoView( { behavior: 'smooth' } )

		}

	}

	onMount( () => {

		const headings    = document.querySelectorAll<HTMLHeadingElement>( '#post h2, #post h3, #post h4, #post h5, #post h6' )
		const existingIds = new Set<string>()

		headings.forEach( heading => {

			const text     = heading.innerText.trim()
			const uniqueId = generateUniqueId( text, existingIds )
			heading.setAttribute( 'id', uniqueId )
			heading.addEventListener( 'click', handleAnchorClick )

		} )

		const hash = window.location.hash.substring( 1 )
		if ( hash ) {

			document.getElementById( hash )?.scrollIntoView( { behavior: 'smooth' } )

		}

	} )
	// @ts-ignore
	const npmID = data.post.data.content?.package?.content?.extra.libraryID || data.post.data.content?.package?.content?.extra.libraryId
</script>

<Content
	seo={{
		title       : data.post.title,
		pageTitle   : data.appName,
		description : $t( 'common.projects.desc' ),
	}}
	share={ data.post.title + ' | ' + $t( 'common.projects.title' )}
>
	<div class="flex flex-row w-full gap-8">

		<div class="w-full flex flex-col gap-4">
			<CardProject
				{...data.post}
				href={undefined}
				type='banner'
			/>
			<div class="rounded-theme border-2 border-primary-500/10 overflow-hidden">
				<div class="post__header">
					<div>
						{#if data.post.data.homepage}
							<Link href={data.post.data.homepage} title={$t( 'common.projects.card.web' )} icon={faGlobe} />
						{/if}
						{#if data.post.data.url && !data.post.data.isPrivate}
							<Link href={data.post.data.url} title={$t( 'common.projects.card.repo' )} icon={faGithub}/>
						{/if}
						{#if npmID}
							<Link href={joinURL('https://www.npmjs.com/package', npmID)} title={'NPM'} icon={faNpm}/>
						{/if}
						{#if data.post.docsUrl}
							<Link href={data.post.docsUrl} title={$t( 'common.projects.card.docs' )} icon={faBook}/>
						{/if}
					</div>
					<div class="flex flex-row gap-2">
						<!-- <Button
							type='dark'
							icon={faChevronLeft}
							tooltip={{
								title     : `${$t( 'common.projects.prev' )} (${data.prevPost.title})`,
							}}
							goto={$routes.projects.child(data.prevPost.data.id)}
						/>
						<Button
							icon={faChevronRight}
							type='dark'
							tooltip={{
								title     : `${$t( 'common.projects.next' )}  (${data.nextPost.title})`,
							}}
							goto={$routes.projects.child(data.nextPost.data.id)}
						/> -->
						<Button
							icon={faClose}
							type='dark'
							tooltip={{
								title     : $t( 'common.projects.return' ),
							}}
							goto={$routes.projects.path}
						/>
					</div>
		
				</div>
				<div id="post" class="post">
					{@html data.postReadme}
				</div>
			</div>

		</div>
	</div>
</Content>
