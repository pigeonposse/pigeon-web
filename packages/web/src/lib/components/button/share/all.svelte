<script lang="ts">

	import ButtonShare from '$components/button/share/main.svelte'
	import ButtonShareSpecial from '$components/button/share/special.svelte'
	import { shareTypes } from '$components/button/share/types'
	import { t } from '$lib/core/i18n/main'

	export type Props = {
		title  : string
		url    : string
		desc?  : string
		media? : string
	}

	let {
		title,
		url,
		desc = '',
		media = '/favicon.png',
	}: Props = $props()

</script>

<div class="inline-grid grid-cols-4 gap-2 py-4">

	{#each Object.values( shareTypes ) as type }
		<ButtonShare
			{type}
			{url}
			{title}
			{desc}
			{media}
			class="!bg-primary-600/20 border-[1px] !border-opacity-50 hover:!bg-primary-600/70"
		/>
	{/each}

	<ButtonShareSpecial
		type="copy"
		title={$t( 'common.btns.copy' )}
		{url}
		class="!bg-primary-700/60 border-[1px]"
	/>

	<ButtonShareSpecial
		type="share"
		title={$t( 'common.btns.share' )}
		{url}
		class="!bg-primary-700/60 border-[1px]"
	/>

</div>

