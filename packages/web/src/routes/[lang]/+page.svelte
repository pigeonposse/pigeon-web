<script lang="ts">
	
    import Spinner from "$lib/components/spinner/main.svelte"
    import Button from "$lib/components/button/main.svelte"
    import Typewriter from "$lib/components/typewriter/main.svelte"
    import FeatCarousel from "$lib/components/carousel/feat.svelte"
    import CardCarousel from "$lib/components/carousel/cards.svelte"
    import Section from "../../lib/components/section/container.svelte";
    import Page from "$lib/components/section/content.svelte";

    import Cards from "./contribute/cards.svelte";
	import { onMount } from "svelte";
	import { faGithub } from "@fortawesome/free-brands-svg-icons";
	import { faBookOpen, faCode } from "@fortawesome/free-solid-svg-icons";

    export let data;
	
    const { t, routes, api, appName, apiData } = data
    
    let projects: Awaited<ReturnType<typeof api.get>>
    async function run(){
        projects = await api.get()

    }

	onMount(async () => {
		await run()
	})

	
</script>


<Page
    seo={{
        title:$t('common.routes.home.title'),
        pageTitle: appName+' -  a Software development collective',
        description: $t('common.routes.home.desc'),
        titleType:"left"
    }}
    share={$t('common.routes.home.title')}
>

    <Section type="start">
        <div slot="header">
            <h1 class="title">{appName}</h1>
        </div>
        <span class="title__subtitle">
            Software development collective focused on
            <Typewriter 
                texts={["Dev Tools", "User Utilities", "Software Plugins", "Software Themes", "Services"]} 
                speed={100} 
                delay={2000} 
                class="title__subtitle__typewriter"
            />
        </span>
        <span class="title__desc">Open source and self-hosting whenever possible.</span>
        <svelte:fragment slot="footer">
            <Button 
                goto={ $routes.projects.path} 
                icon={faGithub}
                type="primary"
            >Github</Button>
            <Button 
                goto={ $routes.projects.path} 
                icon={faCode}
                type="dark"
             >Projects</Button>
             <Button 
                goto={ $routes.about.path} 
                icon={faBookOpen}
                type="dark"
            >About us</Button>
        </svelte:fragment>

    </Section>

    {#if api.response === 'loading' }
        <div class="flex items-center justify-center">
            <Spinner/>
        </div>
    {:else if api.response === 'success' && projects}
        {#if 'feat' in projects}
            <Section
                type="diagonal-bottom"
                title={'Feat Projects'}
                btnTitle={'View more'}
                goto={ $routes.projects.path} 
            >
                <div class="py-8 flex flex-col gap-4 w-full">
                    <FeatCarousel values={projects.feat} />
                </div>
            </Section>
    
        {/if}
        {#if 'general' in projects}
            <Section
                type="diagonal-bottom"
                title={'Projects'}
                btnTitle={'All projects'}
                goto={ $routes.projects.path} 
            >
                <CardCarousel 
                    values={projects.noFeat} 
                    max={10}
                    goto={ $routes.projects.path} 
                    type="right"
                />
            </Section>

        {/if}

    {:else}
        <div class="flex items-center justify-center h-[50vh]">
            Error in Page
        </div>
    {/if}

    <Section
        title={'Contribute'}
        btnTitle={'Read more'}
        type="diagonal-bottom"
        goto={ $routes.contribute.path} 
    >

	{#if apiData.user }
		<Cards data={apiData.user}/>
	{/if}
	
    </Section>

</Page>
