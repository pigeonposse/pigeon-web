<script lang="ts">

	import { Popover } from 'flowbite-svelte'
	import { blur } from 'svelte/transition'

	import './style.css'

	import type {
		ComponentProps,
		Snippet,
	} from 'svelte'

	let {
		id,
		class: Klass,
		children,
		...rest
	}: ComponentProps<Popover> & {
		id?       : string
		class?    : string
		children? : Snippet
	} = $props()

</script>

<Popover
	{...( id ? { triggeredBy: '#' + id } : {} )}
	transition={blur}
	params={{ duration: 500 }}
	class={`popover ${Klass || ''}`}
	{...rest}
>
	{@render children?.()}
</Popover>
