<script lang="ts">

	import './all.css'
	import ButtonShare from '$components/button/share/main.svelte'
	import ButtonShareSpecial from '$components/button/share/special.svelte'
	import { shareTypes } from '$components/button/share/types'
	import { t } from '$lib/core/i18n/main'

	type Props = {
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

<div class="share__all">

	{#each Object.values( shareTypes ) as type }
		<ButtonShare
			{type}
			{url}
			{title}
			{desc}
			{media}
			class="share__all__btn"
		/>
	{/each}

	<ButtonShareSpecial
		type="copy"
		title={$t( 'common.btns.copy' )}
		{url}
		class="share__all__btn_special"
	/>

	<ButtonShareSpecial
		type="share"
		title={$t( 'common.btns.share' )}
		{url}
		class="share__all__btn_special"
	/>

</div>

