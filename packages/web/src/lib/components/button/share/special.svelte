<script lang="ts">

	import {
		faCopy,
		faPrint,
		faShareAlt,
	} from '@fortawesome/free-solid-svg-icons'
	import {
		type ComponentProps,
		onMount,
	} from 'svelte'

	import './style.css'
	import Button from '$components/button/main.svelte'

	type Props = Omit<ComponentProps<typeof Button>, 'type'> & {
		type         : 'copy' | 'print' | 'share'
		title        : string
		url          : string
		textOnclick? : string
	}

	let {
		type = 'copy',
		title,
		url,
		textOnclick = undefined,
		...rest
	}: Props = $props()

	let showTxt          = $state( false )
	let isShareSupported = $state( false )

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
		{...rest}
		class="btn_share{ textOnclick && showTxt ? ' hidden' : '' }{rest.class ? ' ' + rest.class : ''}"
	/>

{:else if type === 'print'}
	<Button
		icon={faPrint}
		onclick={() => window.print()}
		{...rest}
		tooltip={{
			title     : title,
			placement : 'top',
			class     : 'btn_share__tooltip',
		}}
		class="btn_share{rest.class ? ' ' + rest.class : ''}"
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
		{...rest}
		class="btn_share{rest.class ? ' ' + rest.class : ''}"
	/>
{/if}
