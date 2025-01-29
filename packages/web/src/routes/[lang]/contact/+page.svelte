<script lang="ts">
	
    import Page from "$lib/components/section/content.svelte";
    export let data
	const { t, appName, apiData } = data

</script>

<Page 
    title={$t('common.routes.contact.title')}
    seo={{
        title:$t('common.routes.contact.title'),
        pageTitle: appName,
        description: $t('common.routes.contact.desc')
    }}
    share={$t('common.routes.contact.title')}
>
    
</Page>
