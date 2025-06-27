<script lang="ts">

	import { faClose } from '@fortawesome/free-solid-svg-icons'

	import './style.css'
	import Button from '$components/button/main.svelte'

	import type { Snippet } from 'svelte'
	import type { HTMLAttributes } from 'svelte/elements'

	type Props = Omit<HTMLAttributes<HTMLSpanElement>, 'type'> & {
		type?      : 'purple' | 'red' | 'green' | 'blue' | 'yellow' | 'gray' | 'primary' | 'secondary'
		visible?   : boolean
		/**
		 * Add glow effect on hover*
		 *
		 * @default false
		 */
		hoverGlow? : boolean
		/**
		 * "close" badge Event
		 */
		onClose?   : () => Promise<void> | void
		/**
		 * Add "close" button on hover
		 */
		closable?  : boolean
		children?  : Snippet
	}

	let {
		type = 'primary',
		hoverGlow = false,
		closable = false,
		onClose = () => {},
		children,
		visible = $bindable( true ),
		...rest
	}: Props = $props()

</script>

{#if visible}

	<span
		{...rest}
		class="badge {type} {rest.class || ''} {hoverGlow ? 'hover-glow' : ''}"
		class:!cursor-pointer={rest.onclick}
	>

		{@render children?.()}

		{#if closable}

			<Button
				class="badge__close"
				icon={faClose}
				onclick={() => {

					visible = false
					onClose?.()

				}}
				type="none"
			/>

		{/if}
	</span>

{/if}
