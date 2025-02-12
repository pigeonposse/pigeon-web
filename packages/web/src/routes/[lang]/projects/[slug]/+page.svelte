<script lang="ts">
	import {
		faChevronLeft,
		faChevronRight,
		faClose,
	} from '@fortawesome/free-solid-svg-icons'
	import { onMount } from 'svelte'

	import './style.css'
	import { replaceState } from '$app/navigation'
	import Button from '$components/button/main.svelte'
	import CardProject from '$components/card/project.svelte'
	import Page from '$components/section/content.svelte'
	import { routes } from '$core/routes/main'

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
</script>

<Page>
	<div class="flex flex-row w-full">
		<div class="flex flex-col justify-between">
			<div>
				<Button
					icon={faClose}
					tooltip={{
						title     : 'Return to projects',
						placement : 'right',
					}}
					goto={$routes.projects.path}
				/>
			</div>
			<div>
				<Button
					icon={faChevronLeft}
					tooltip={{
						title     : 'Previous Project',
						placement : 'right',
					}}
					goto={data.prevPost.data.id}
				/>
				<Button
					icon={faChevronRight}
					tooltip={{
						title     : 'Next Project',
						placement : 'right',
					}}
					goto={data.nextPost.data.id}
				/>
			</div>

		</div>
		<div class="w-full">
			<CardProject
				{...data.post}
				href={undefined}
				class={'flex-row'}
				type='banner'
			/>
			<div id="post" class="post">
				{@html data.postReadme}
			</div>
		</div>
	</div>
</Page>
