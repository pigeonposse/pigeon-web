<script lang="ts">

	type ImageTypes = { src: string } & { [key in string]?: any }

	let {
		src, 
		...rest
	}: ImageTypes = $props()

</script>

<img
	loading="lazy"
	width="150"
	height="150"
	src={src}
	{...rest}
/>
