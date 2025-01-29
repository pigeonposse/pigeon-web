<script lang="ts">
    
    import SearchInput from "$lib/components/search/main.svelte";
    import Card from "$lib/components/card/project.svelte";
    import Spinner from "$lib/components/spinner/main.svelte"
    import Page from "$lib/components/section/content.svelte";
    import Section from "$lib/components/section/container.svelte";
    import Notification from "$lib/components/notification/main.svelte"
    
    import { writable } from 'svelte/store';
    import { onMount, type ComponentProps } from "svelte";
    export let data;
    
    const { t, api, appName } = data

    let projects: Awaited<ReturnType<typeof api.get>>;
    let projectsStore = writable<typeof projects>(projects)
    let filterTimer: NodeJS.Timeout

	const run = async () => {
		api.response = 'loading'
        projects = await api.get();
		if(projects){
        	projectsStore.set(JSON.parse(JSON.stringify(projects)))
			api.response = 'success'
		}else api.response = 'error'
    }
	
    onMount(async () => {
        await run()
    })

    function handleFilter( value: string) {

        if(!projects) return;

        const searchTerm = value.trim().toLowerCase();

        if (filterTimer) clearTimeout(filterTimer);

        filterTimer = setTimeout(() => {
            
            if (!searchTerm || searchTerm === "") {
                projectsStore.set(JSON.parse(JSON.stringify(projects)));
                return;
            }

            projectsStore.update(value => {
                
                if(!projects || !value) return
                
                const filterF =( p: ComponentProps<Card>) =>
                    p.title.toLowerCase().includes(searchTerm) ||
                    p.title.replace(' ', '').toLowerCase().includes(searchTerm) ||
                    p.desc.toLowerCase().includes(searchTerm)  ||
                    (p.tags && Array.isArray(p.tags) && p.tags.join(' ').includes(searchTerm)) ||
                    (p.status && Array.isArray(p.status) && p.status.join(' ').includes(searchTerm))


                value.general = projects.general.filter(p => filterF(p) )
                value.other = projects.other.filter(p => filterF(p) )

                return value;

            })
        }, 200)
        
    }

    // $: console.log( {$projectsStore, api,projects})
</script>

<Page
    title={$t('common.routes.projects.title')}
    seo={{
        title:$t('common.routes.projects.title'),
        pageTitle: appName,
        description: $t('common.routes.projects.desc')
    }}
    share={$t('common.routes.projects.title')}
>

    {#if api.response === 'loading' }
        <Section type="center">
            <Spinner/>
        </Section>
    {:else if api.response === 'success' && projects}
        
        {#if (
            !($projectsStore && 'general' in $projectsStore && $projectsStore.general.length > 0) &&
            !( $projectsStore && 'other' in  $projectsStore &&  $projectsStore.other.length > 0)
        )}
         <Section>
            <Notification 
                class="!p-4"
            >Project not found</Notification>
         </Section>
        {:else}
            {#if 'general' in $projectsStore && $projectsStore.general.length > 0}
                <Section>
                    <div class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {#each  $projectsStore.general as project}
                            <Card {...project}/>
                        {/each}
                    </div>
                </Section>
            {/if}
            {#if 'other' in $projectsStore &&  $projectsStore.other.length > 0}
                <Section
                    title={'Other projects'}
                >
                    <div class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {#each $projectsStore.other as project}
                            <Card {...project}/>
                        {/each}
                    </div>
                </Section>
            {/if}
        {/if}

    {:else}
		<Section>
			Error getting projects
		</Section>
    {/if}
    
    <svelte:fragment slot="bottom">
        {#if api.response === 'success' && projects}
            <SearchInput 
                id='filter'
                placeholder="Search..." 
                onChange={handleFilter}
                onKeyFocus={true}
                urlParams={true}
            />
        {/if}
    </svelte:fragment>
    
</Page>
