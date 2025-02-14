<script lang="ts">

	import { goto } from '$app/navigation'
	import { page } from '$app/state'
	import Select from '$components/input/select.svelte'
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

<Select
	{placeholder}
	attr={{ onchange: onChange }}
	type='none'
	bind:value={$locale}
	options={$locales.map( v => ( {
		value : v,
		text  : $t( `lang.${v}` ),
		attr  : { selected: v === $locale },
	} ) )}
/>

