<script lang="ts">

	import {
		faCircleCheck,
		faCircleExclamation,
		faCircleInfo,
		faTriangleExclamation,
	} from '@fortawesome/free-solid-svg-icons'

	import './style.css'
	import Icon from '$components/icons/main.svelte'

	import type { Snippet } from 'svelte'
	import type { HTMLAttributes } from 'svelte/elements'

	type ObjectValues<Values> = Values[keyof Values]
	const typeNot =  {
		error   : 'error',
		warn    : 'warn',
		success : 'success',
		info    : 'info',
	} as const

	let {
		id = '',
		type = typeNot.info,
		onHover = $bindable( false ),
		children,
		...rest
	}: HTMLAttributes<HTMLDivElement> & {
		id?       : string
		type?     : ObjectValues<typeof typeNot>
		onHover?  : boolean
		children? : Snippet
	} = $props()
	const icon = {
		[typeNot.error]   : faCircleExclamation,
		[typeNot.warn]    : faTriangleExclamation,
		[typeNot.success] : faCircleCheck,
		[typeNot.info]    : faCircleInfo,
	}

</script>

<div
	{id}
	{...rest}
	class="notification {type}{rest.class ? ' ' + rest.class : ''}"
	onmouseleave={() => {

		onHover = false

	}}
	onmouseover={() => {

		onHover = true

	}}
>
	<Icon
		class="notification__icon"
		svg={icon[type]}
	/>
	<span class="notification__content">
		{@render children?.()}
	</span>
</div>
