<script lang="ts">

	import { page } from '$app/state'
	import Content from '$lib/components/section/content.svelte'
	import Error from '$lib/components/section/error.svelte'

	const message = page.error?.message || 'Unexpected error'

</script>

<Content
	title={`${page.status} Error`}
	type="center"
	seo={{
		pageTitle   : 'PigeonPosse',
		description : message,
		titleType   : 'left',
	}}
>
	<main>
		<Error
			title={message === 'Not Found' ? 'Page Not Found' : message}
		/>
	</main>
</Content>

