<script lang="ts">
	
	import Seo from "$lib/components/seo/main.svelte";
    import Page from "$lib/components/section/content.svelte";
    import { page } from '$app/stores';
    export let data
	const { t } = data
    console.log('error',data)
	
</script>

<Seo 
    title={$t('common.routes.policy.title')}
    pageTitle={'PigeonPosse'}
    description="{$t('common.routes.policy.desc')}"
/>

<Page
    title={'Error page'}
>
<main>
    <h1>Error {$page.status}</h1>
    <p>{$page.error?.message}</p>
    <!-- {#if error.data}
      <pre>{JSON.stringify(error.data, null, 2)}</pre>
    {/if} -->
  </main>
</Page>
