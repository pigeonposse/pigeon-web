<script lang="ts">

    import Card from "$lib/components/card/main.svelte";
    import Page from "$lib/components/section/content.svelte";
    import Button from "$lib/components/button/main.svelte";
    import { faHeart, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
    import Cards from "../contribute/cards.svelte";
    import Section from "$lib/components/section/container.svelte";
    export let data;
	
    const { t, routes, appName, apiData } = data
	const fund = apiData.user?.funding?.filter(d => d.provider === 'opencollective')[0] || apiData.user?.funding?.[0]
</script>

<Page
    title={$t('common.routes.sponsors.title')}
    seo={{
        title:$t('common.routes.sponsors.title'),
        pageTitle: appName,
        description: $t('common.routes.sponsors.desc')
    }}
    share={$t('common.routes.sponsors.title')}
>
    <Card class="my-8 p-10 max-w-max text-start">
        <h2 class="text-[30px] font-extrabold">Hazte patrocinador</h2>
        <p >
            Conviértete en patrocinador oficial de nuestro colectivo de desarrollo y apoya nuestros proyectos.
        </p>
        <div class="flex gap-4">
				{#if apiData.user}

					{#if fund }
						<Button 
							href={fund.url}
							icon={faHeart}
							class="secondary"
						>
							{fund.provider === 'opencollective' ? 'Open Collective' : fund.provider}
						</Button>

					{/if}

					<Button 
						href={'mailto:'+apiData.user.email}
						icon={faPaperPlane}
						class="primary"
					>
						Envianos un mail
					</Button>	
				{/if}

        </div>
    </Card>

    <Section 
        title={'Contribute'}
        btnTitle={'Leer mas'}
        goto={$routes.contribute.path}
        type="diagonal-bottom"
    >
        {#if apiData.user }
            <Cards data={apiData.user}/>
        {/if}
    </Section>
    
</Page>
