<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements'

	let props: HTMLAttributes<HTMLSpanElement> = $props()
</script>

<span
	class="spinner inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-[spin_1s_linear_infinite]"
	{...props}
></span>

<style>
	.spinner {
		color: #10b981;
	}
</style>
