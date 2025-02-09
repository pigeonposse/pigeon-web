<script lang="ts">
	import './body.css'

	let props = $props()

</script>

<div class="page">
	<!-- BACKGROUND -->
	<div class="bg__gradient"></div>
	<div class="bg__circle_primary"></div>
	<div class="bg__circle_secondary"></div>
	<!-- PAGE -->
	<div class="page__content {props.class || ''}">
		{@render props.children?.()}
	</div>
</div>
