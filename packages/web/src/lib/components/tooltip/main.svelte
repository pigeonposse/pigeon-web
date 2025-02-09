<script lang="ts">

	import { Tooltip } from 'flowbite-svelte'

	import './style.css'

	import type { ComponentProps } from 'svelte'

	let {
		title,
		class: Klass,
		...rest
	}: Partial<ComponentProps<Tooltip>> & {
		title  : string
		class? : string
	} = $props()

</script>

<Tooltip type="custom" defaultClass="tooltip {Klass || ''}" {...rest}>{title}</Tooltip>
