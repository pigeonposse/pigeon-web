<script lang="ts">

	import { page } from '$app/state'
	import Content from '$components/section/content.svelte'
	import Error from '$components/section/error.svelte'

	const message = page.error?.message || 'Unexpected error'

</script>

<Content
	seo={{
		pageTitle   : 'PigeonPosse',
		description : message,
		titleType   : 'left',
	}}
	title={`${page.status} Error`}
	type="center"
>
	<main>
		<Error title={message === 'Not Found' ? 'Page Not Found' : message} />
	</main>
</Content>

