<script lang="ts">

    import Cards from "./cards.svelte";
    import Page from "$lib/components/section/content.svelte";
    import Section from "$lib/components/section/container.svelte";

    export let data
    const {t, appName, apiData } = data
    
</script>

<Page
    type="center"
    title={$t('common.routes.contribute.title')}
    seo={{
        title:$t('common.routes.contribute.title'),
        pageTitle: appName,
        description: $t('common.routes.contribute.desc')
    }}
    share={$t('common.routes.contribute.title')}
>
    <Section>
        {#if apiData.user }
            <Cards data={apiData.user}/>
        {/if}
    </Section>

</Page>
