<script lang="ts">

	import { faClose } from '@fortawesome/free-solid-svg-icons'
	import Portal from 'svelte-portal'

	import './style.css'
	import Button from '$lib/components/button/main.svelte'

	export let open: boolean = false
	export let type: 'full' = 'full'

</script>
<Portal target="body">
	<div class="popup {type} transition_general {open ? 'open' : 'close' }">
		<Button
			type="transparent"
			icon={faClose}
			on:click={() => {

				open = false

			}}
			class="!text-[30px] !p-0 !absolute top-10 right-8"
		/>

		<div class="popup__container">

			{#if 'header' in $$slots}
				<div>
					<slot name="header" />
				</div>
			{/if}

			<slot/>

			{#if 'footer' in $$slots}
				<div>
					<slot name="footer" />
				</div>
			{/if}
		</div>

	</div>
</Portal>
