<script lang="ts">

	import {
		faCircleCheck,
		faCircleExclamation,
		faCircleInfo,
		faTriangleExclamation,
	} from '@fortawesome/free-solid-svg-icons'

	import './style.css'
	import Icon from '$lib/components/icons/main.svelte'

	/**
	 * TYPES
	 */
	type ObjectValues<Values> = Values[keyof Values]
	const typeNot =  {
		error   : 'error',
		warn    : 'warn',
		success : 'success',
		info    : 'info',
	} as const

	/**
	 * VARIABLES
	 */
	export let id: string = ''
	export let type: ObjectValues<typeof typeNot> = typeNot.info
	export let onHover = false

	const icon = {
		[typeNot.error]   : faCircleExclamation,
		[typeNot.warn]    : faTriangleExclamation,
		[typeNot.success] : faCircleCheck,
		[typeNot.info]    : faCircleInfo,
	}

	/**
	 * EVENTS
	 */
	const handleHover = () => {

		onHover = true

	}
	const handleLeave = () => {

		onHover = false

	}

</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<div
	{id}
	{...$$restProps}
	class="notification {type}{$$restProps.class ? ' ' + $$restProps.class : ''}"
	on:mouseover={handleHover}
	on:mouseleave={handleLeave}
>
	<Icon
		svg={icon[type]}
		class="notification__icon"
	/>
	<span class="notification__content">
		<slot/>
	</span>
</div>
