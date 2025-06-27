<script lang="ts">
	import { Spinner } from 'flowbite-svelte'

	import type { ComponentProps } from 'svelte'

	let props: ComponentProps<typeof Spinner> = $props()
</script>

<Spinner
	color="primary"
	size="4"
	{...props}
/>
