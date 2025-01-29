<script lang="ts">
	

    import Page from "$lib/components/section/content.svelte";
    import Tabs from "$lib/components/tabs/main.svelte";
    import BrowserExtension from "./browser-extension.svelte";
    import Web from "./web.svelte";
    
    export let data
	const { t, appName } = data

</script>

<Page
    title={'Policy Privacy'}
    seo={{
        title:$t('common.routes.policy.title'),
        pageTitle: appName,
        description: $t('common.routes.policy.desc')
    }}
    share={$t('common.routes.policy.title')}
>
    <p>La dirección de nuestro sitio web es: <italic class="opacity-70">pigeonposse.com</italic></p>
    <Tabs 
        id="type"
        items={ [
            { 
                name: "Web",
                id: 'web',
                component: Web
            },
            { 
                name: "Extensions",
                id: 'browser-extension',
                component: BrowserExtension
            },
        ]}
        urlParams={true}
    />
</Page>
