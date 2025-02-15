<script lang="ts">

	type Props = { src: string } & { [key in string]?: any }

	let {
		src, 
		...rest
	}: Props = $props()

</script>

<img
	loading="lazy"
	width="150"
	height="150"
	src={src}
	{...rest}
/>
