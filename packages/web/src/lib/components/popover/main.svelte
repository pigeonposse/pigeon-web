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
	}: ComponentProps<typeof Popover> & {
		id?       : string
		class?    : string
		children? : Snippet
	} = $props()

</script>

<Popover
	class={`popover ${Klass || ''}`}
	params={{ duration: 500 }}
	transition={blur}
	trigger={id ? 'click' : 'hover'}
	triggeredBy={id ? ( '#' + id ) : undefined}
	{...rest}
>
	{@render children?.()}
</Popover>
