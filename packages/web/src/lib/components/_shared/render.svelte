<script lang="ts">

	import {
		isComponent,
		isSnippet,
	} from './render'

	import type { RenderContentProps } from './types'

	let {
		input,
		props,
	}: RenderContentProps = $props()

</script>

{#if input}
	{#if typeof input === 'string'}
		{@html input}
	{:else if isComponent( input )}
		<input {...props} />
	{:else if isSnippet( input )}
		{@render input( )}
	{:else}
		{@html input}
	{/if}
{/if}
