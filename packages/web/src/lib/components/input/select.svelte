<script lang="ts">

	import './select.css'

	import type {
		HTMLOptionAttributes,
		HTMLSelectAttributes,
	} from 'svelte/elements'

	const {
		title, options, attr, class: Klass,
	}: {
		title   : string
		attr?   : Omit<HTMLSelectAttributes, 'class'>
		class?  : string
		options: ( {
			value : string
			text? : string
			attr? : Omit<HTMLOptionAttributes, 'value'>
		} )[]
	} = $props()

</script>
<div class="select {Klass || ''}">
	<span>{title}</span>
	<select {...attr}>
		{#each options as opt}
			<option
				value={opt.value}
				{...opt.attr}
			>   {opt.value || opt.text}
			</option>
		{/each}
	</select>
</div>

