<script lang="ts">

	import { Popover } from 'flowbite-svelte'
	import { blur } from 'svelte/transition'

	import './style.css'

	/**
	 * VARIABLES
	 */
	export let id: string | undefined = undefined

</script>

<Popover
	{...( id ? { triggeredBy: '#' + id } : {} )}
	transition={blur}
	params={{ duration: 500 }}
	{...$$restProps}
	class={`popover ${$$restProps.class || ''}`}
>
	<slot/>
</Popover>
