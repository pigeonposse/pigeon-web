<script lang="ts">

	import {
		Fa,
		type IconDefinition,
	} from '$components/icons/main'

	let {
		svg,
		class: Klass,
		...rest
	}:{
		svg    : IconDefinition | string
		class? : string
	} = $props()

</script>

{#if typeof svg === 'string'}
	<span
		{...rest}
		class="h-[1em] w-[1em] icon {Klass || ''}"
	>
		{@html svg}
	</span>
{:else}
	<Fa
		icon={svg}
		{...rest}
		class="icon {Klass || ''}"
	/>
{/if}
