<script lang="ts">

	import { faClose } from '@fortawesome/free-solid-svg-icons'
	import Portal from 'svelte-portal'

	import './style.css'
	import Button from '$components/button/main.svelte'

	import type { Snippet } from 'svelte'

	let {
		open = $bindable( false ),
		type = 'full',
		children,
		header,
		footer,
	}: {
		open?     : boolean
		type?     : 'full'
		children? : Snippet
		header?   : Snippet
		footer?   : Snippet
	} = $props()

</script>
<Portal target="body">
	<dialog
		class={[
			'popup',
			type,
			open ? 'open' : 'close',
		]}
		open
	>
		<Button
			class="popup__close_btn"
			icon={faClose}
			onclick={() => {

				open = false

			}}
			type="transparent"
		/>

		<div class="popup__container">

			{#if header}
				<div>
					{@render header()}
				</div>
			{/if}

			{@render children?.()}

			{#if footer}
				<div>
					{@render footer()}
				</div>
			{/if}
		</div>

	</dialog>
</Portal>
