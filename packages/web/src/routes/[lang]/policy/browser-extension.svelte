<script lang="ts">

    import Notification from "$lib/components/notification/main.svelte";
	import { page } from "$app/stores";

	const { t } = $page.data

</script>
<div class="py-3">

	<Notification type="info" class="w-max">Este texto es referido para todas las extensiones desarrolladas por pigeonposse cuya politica exte enlazada a esta página</Notification>

	<p>En nuestro colectivo, nos tomamos muy en serio la privacidad de nuestros usuarios. Por eso, queremos asegurarte que nuestras extensiones están diseñadas con total transparencia y sin rastreos al usuario.</p>

	<p>Además, todas nuestras extensiones son de código abierto (open source), lo que significa que el código está disponible para que cualquier persona lo examine, modifique y mejore. Creemos en la importancia de la transparencia y la colaboración en el desarrollo de software.</p>

	<p>Si tienes alguna pregunta sobre nuestra política de privacidad o sobre cómo manejamos los datos de los usuarios, no dudes en ponerte en contacto con nosotros.</p>

	<p>Gracias por confiar en nuestras extensiones.</p>

</div>

