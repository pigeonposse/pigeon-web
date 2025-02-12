<script lang="ts">

	import {
		faCopy,
		faPrint,
		faShareAlt,
	} from '@fortawesome/free-solid-svg-icons'
	import { onMount } from 'svelte'

	import './style.css'
	import Button from '$components/button/main.svelte'

	export let type: 'copy' | 'print' | 'share' = 'copy'
	export let title: string
	export let url: string
	export let textOnclick: string | undefined = undefined

	let showTxt = false

	const copyUrl = async () => {

		try {

			await navigator.clipboard.writeText( url )
			showTxt = true
			setTimeout( () => showTxt = false, 2000 )

		}
		catch ( error ) {

			console.error( 'Failed to copy URL to clipboard', error )

		}

	}

	const shareUrl = async () => {

		if ( navigator.share ) {

			try {

				await navigator.share( {
					title : title,
					text  : textOnclick || 'Check this out!',
					url   : url,
				} )

			}
			catch ( error ) {

				console.error( 'Failed to share URL', error )

			}

		}
		else {

			alert( 'Sharing not supported in this browser.' )

		}

	}

	let isShareSupported = false
	onMount( () => {

		isShareSupported = !!navigator.share

	} )
</script>

{#if type === 'copy'}
	<Button
		icon={faCopy}
		onclick={copyUrl}
		color="dark"
		tooltip={{
			title     : title,
			placement : 'top',
			class     : 'btn_share__tooltip',
		}}
		{...$$restProps}
		class="btn_share { textOnclick && showTxt ? 'hidden' : '' } {$$restProps.class ? ' ' + $$restProps.class : ''}"
	/>

{:else if type === 'print'}
	<Button
		icon={faPrint}
		onclick={() => window.print()}
		{...$$restProps}
		tooltip={{
			title     : title,
			placement : 'top',
			class     : 'btn_share__tooltip',
		}}
		class="btn_share {$$restProps.class ? ' ' + $$restProps.class : ''}"
	/>

{:else if type === 'share' && isShareSupported}
	<Button
		icon={faShareAlt}
		onclick={shareUrl}
		tooltip={{
			title     : title,
			placement : 'top',
			class     : 'btn_share__tooltip',
		}}
		{...$$restProps}
		class="btn_share {$$restProps.class ? ' ' + $$restProps.class : ''}"
	/>
{/if}
