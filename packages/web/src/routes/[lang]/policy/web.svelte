<script lang="ts">

    import Accordion from "$lib/components/accordion/main.svelte";
	import { page } from "$app/stores";
    import { faLink, faShieldHalved } from "@fortawesome/free-solid-svg-icons";

	const { t } = $page.data

</script>
<Accordion type="section">
	<Accordion
		type="item"
		icon="{faShieldHalved}"
		open="{true}"
		title="Nuestra Política de Privacidad"
	>
		<p>En PigeonPosse, mantenemos una política de privacidad transparente y no rastreamos ninguna información personal de nuestros usuarios. Utilizamos solo las cookies necesarias para garantizar una experiencia mejor para el usuario.</p>
	</Accordion>
	<Accordion
		type="item"
		icon="{faLink}"
		title="Contenido embebido de otros sitios web"
	>
		<p>
			Los artículos en este sitio pueden incluir contenido embebido (por ejemplo, videos, imágenes, artículos, etc.).
			<br>
			El contenido embebido de otros sitios web se comporta de la misma manera que si el visitante hubiera visitado el otro sitio web.
			<br>
			Estos sitios web pueden recopilar datos sobre usted, usar cookies, incrustar un seguimiento adicional de terceros y monitorear su interacción con ese contenido embebido, incluyendo el seguimiento de su interacción con el contenido embebido si tiene una cuenta y está conectado a ese sitio web.
		</p>
		<p>No nos hacemos responsables del contenido embebido proveniente de otros sitios web. Aunque tratamos de incluir solo contenido de fuentes confiables, no tenemos control sobre cómo estos sitios manejan sus datos y políticas de privacidad.</p>
		<p>Posibles ejemplos de contenido embebido en nuestro sitio:</p>
		<ul>
			<li >Videos de YouTube</li>
			<li >Publicaciones de Instagram</li>
			<li >Artículos de medios de noticias</li>
		</ul>
	</Accordion>
</Accordion>
