<script lang="ts">

	import {
		faGithub,
		faNpm,
	} from '@fortawesome/free-brands-svg-icons'
	import {
		faBook,
		faChevronLeft,
		faChevronRight,
		faClose,
		faGlobe,
	} from '@fortawesome/free-solid-svg-icons'
	import {
		onMount,
		tick,
	} from 'svelte'

	import './style.css'
	import { replaceState } from '$app/navigation'
	import Link from '$components/button/link.svelte'
	import Button from '$components/button/main.svelte'
	import CardProject from '$components/card/project.svelte'
	import Content from '$components/section/content.svelte'
	import { joinURL } from '$core/utils/main'

	import type { PageProps } from './$types'

	let { data }: PageProps = $props()
	let {
		post,
		postReadme,
		t,
		routes,
	} = data

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
	async function setupHeadings() {

		await tick() // Espera a que el DOM se actualice

		const headings    = document.querySelectorAll<HTMLHeadingElement>(
			'#post h2, #post h3, #post h4, #post h5, #post h6',
		)
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

	}
	onMount( async () => {

		await setupHeadings()

	} )

	// @ts-ignore
	const npmID = post.data.content?.package?.content?.extra?.libraryID || post.data.content?.package?.content?.extra?.libraryId
</script>

<Content
	seo={{
		title       : post.title,
		pageTitle   : data.appName,
		description : post.desc || $t( 'common.projects.desc' ),
	}}
	share={ post.title + ' | ' + $t( 'common.projects.title' )}
>
	<div class="flex flex-row w-full gap-8">

		<div class="w-full flex flex-col gap-4">
			<CardProject
				{...post}
				href={undefined}
				type='banner'
			/>
			<div class="rounded-theme border-2 border-primary-500/10 overflow-hidden">
				<div class="post__header">
					<div>
						{#if post.data.homepage}
							<Link href={post.data.homepage} title={$t( 'common.projects.card.web' )} icon={faGlobe} />
						{/if}
						{#if post.data.url && !post.data.isPrivate}
							<Link href={post.data.url} title={$t( 'common.projects.card.repo' )} icon={faGithub}/>
						{/if}
						{#if npmID}
							<Link href={joinURL( 'https://www.npmjs.com/package', npmID )} title="NPM" icon={faNpm}/>
						{/if}
						{#if post.docsUrl}
							<Link href={post.docsUrl} title={$t( 'common.projects.card.docs' )} icon={faBook}/>
						{/if}
					</div>
					<div class="flex flex-row gap-2">

						<Button
							type='dark'
							icon={faChevronLeft}
							tooltip={{ title: `${$t( 'common.projects.prev' )} (${data.prevPost.title})` }}
							href={ open  => open( $routes.projects.child( data.prevPost.data.id ), '_self' )}
						/>
						<Button
							icon={faChevronRight}
							type='dark'
							tooltip={{ title: `${$t( 'common.projects.next' )}  (${data.nextPost.title})` }}
							href={ open  => open( $routes.projects.child( data.nextPost.data.id ), '_self' )}
						/>
						<Button
							icon={faClose}
							type='dark'
							tooltip={{ title: $t( 'common.projects.return' ) }}
							href={ open  => open( $routes.projects.path, '_self' )}
						/>
					</div>

				</div>
				<div id="post" class="post">
					{@html postReadme}
				</div>
			</div>

		</div>
	</div>
</Content>
