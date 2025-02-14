<script lang="ts">

	import { faChevronRight } from '@fortawesome/free-solid-svg-icons'

	import './container.css'
	import Button from '$components/button/main.svelte'

	import type { Snippet } from 'svelte'

	let {
		class:Klass,
		goto,
		btnTitle,
		title,
		type = 'center',
		children,
		header,
		footer,
	}: {
		title?    : string
		goto?     : string
		btnTitle? : string
		type?     : 'center' | 'end' | 'start' | 'diagonal-bottom' | 'diagonal-top' | 'archive'
		class?    : string
		children? : Snippet
		header?   : Snippet
		footer?   : Snippet
	} = $props()
</script>

<section class="section_container {type} {Klass || ''}">

	{#if title}

		<div class="section_container__header">
			<h3>{title}</h3>
		</div>

	{:else}

		{#if header }
			<div class="section_container__header">
				{@render header()}
			</div>
		{/if}

	{/if}

	<div class="section_container__content">
		{@render children?.()}
	</div>

	{#if goto}

		<div class="section_container__footer">
			<Button
				{ goto }
				icon={faChevronRight}
				iconPosition="right"
				type="dark"
				class="border-2 !border-primary-600/10"
			>
				{btnTitle}
			</Button>
		</div>

	{:else}

		{#if footer}
			<div class="section_container__footer">
				{@render footer()}
			</div>
		{/if}

	{/if}

</section>
