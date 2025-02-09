<script lang="ts">

	import './style.css'
	import { goto } from '$app/navigation'
	import { page } from '$app/state'
	import {
		locale,
		locales,
		t,
	} from '$lib/core/i18n/main'

	const { placeholder = '' }: { placeholder?: string } = $props()
	const route                                          = $derived( page.data.route )

	const onChange = ( { target }: Event ) => {

		if ( !(
			target
			&& 'value' in target
			&& typeof target.value === 'string'
		) ) return

		goto( `/${target.value}${route}` )
		locale.set( target.value )

	}

</script>

<select
	{placeholder}
	onchange={onChange}
	class="select__lang"
>
	<!-- {#if placeholder}
		<option value="" disabled selected>{placeholder}</option>
	{/if} -->

	{#each $locales as lc}
		<option
			value="{lc}"
			selected="{lc === $locale}"
		>   {$t( `lang.${lc}` )}
		</option>
	{/each}

</select>

