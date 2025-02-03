<script lang="ts">

	import { faShare } from '@fortawesome/free-solid-svg-icons'

	import Button from '$lib/components/button/main.svelte'
	import ButtonShare from '$lib/components/button/share/main.svelte'
	import ButtonShareSpecial from '$lib/components/button/share/special.svelte'
	import { shareTypes } from '$lib/components/button/share/types'
	import Popover from '$lib/components/popover/main.svelte'
	import { t } from '$lib/core/i18n/main'

	export let title: string
	export let url: string
	export let desc: string = ''
	export let media = '/favicon.png'

</script>

<Button
	icon={faShare}
	type="dark"
	class="p-4"
/>
<Popover placement={'top-end'}>

	<div class="flex flex-col">
		<h5 class="font-bold my-2">{$t( 'common.btns.share' )}</h5>
		<div class="inline-grid grid-cols-4 gap-2">

			{#each Object.values( shareTypes ) as type }
				<ButtonShare
					{type}
					{url}
					{title}
					{desc}
					{media}
					class="!bg-primary-950/30"
				/>
			{/each}

		</div>
		<hr class="my-3 opacity-10 bg-primary-900/20">
		<div class="flex mb-3 w-full gap-2 !text-xs h-8">
			<ButtonShareSpecial
				type="copy"
				title={$t( 'common.btns.copy' )}
				{url}
				class="!bg-primary-950/30"
			/>
			<ButtonShareSpecial
				type="share"
				title={$t( 'common.btns.share' )}
				{url}
				class="!bg-primary-950/30"
			/>
		</div>
	</div>

</Popover>
