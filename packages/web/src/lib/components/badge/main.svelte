<script lang="ts">

	import { faClose } from '@fortawesome/free-solid-svg-icons'

	import './style.css'
	import Button from '$components/button/main.svelte'

	import type { Snippet } from 'svelte'
	import type { HTMLAttributes } from 'svelte/elements'

	type Props = Omit<HTMLAttributes<HTMLSpanElement>, 'type'> & {
		type?      : 'purple' | 'red' | 'green' | 'blue' | 'yellow' | 'gray' | 'primary' | 'secondary'
		/**
		 * Add glow effect on hover*
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
		...rest
	}: Props = $props()
	let visible = $state( true )
</script>

{#if visible}

	<span
		{...rest}
		class="badge {type} {rest.class || ''} {hoverGlow ? 'hover_glow' : ''}"
	>

		{@render children?.()}

		{#if closable}

			<Button
				onclick={() => {

					visible = false
					onClose?.()

				}}
				icon={faClose}
				type="none"
				class="badge__close"
			/>

		{/if}
	</span>

{/if}
