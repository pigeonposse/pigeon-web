<script lang="ts">

	import { faChevronRight } from '@fortawesome/free-solid-svg-icons'

	import './container.css'
	import Button from '$lib/components/button/main.svelte'

	export let title: string | undefined = undefined
	export let goto: string | undefined = undefined
	export let btnTitle: string | undefined = undefined
	export let type: 'center' | 'end' | 'start' | 'diagonal-bottom' | 'diagonal-top' = 'center'

</script>

<section class="section_container {type}">

	{#if title}

		<div class="section_container__header">
			<h3>{title}</h3>
		</div>

	{:else}

		{#if 'header' in $$slots}
			<div class="section_container__header">
				<slot name="header" />
			</div>
		{/if}

	{/if}

	<div class="section_container__content">
		<slot/>
	</div>

	{#if goto}

		<div class="section_container__footer">
			<Button
				{ goto }
				icon={faChevronRight}
				iconPosition="right"
				type="dark"
			>
				{btnTitle}
			</Button>
		</div>

	{:else}

		{#if 'footer' in $$slots}
			<div class="section_container__footer">
				<slot name="footer"/>
			</div>
		{/if}

	{/if}

</section>
