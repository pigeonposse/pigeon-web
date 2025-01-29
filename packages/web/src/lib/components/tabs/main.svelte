<script lang="ts">
    
    import Button from "$lib/components/button/main.svelte"
    import type { ComponentType } from 'svelte'
    import { onMount } from 'svelte'
    import './style.css'
    import { goto } from "$app/navigation";

    export let items: {
        id: string, 
        component: ComponentType, 
        name: string, 
        desc?: string, 
        props?: object,
    }[]
    
    export let id: string
    export let activeTabId: string | undefined = undefined
    export let customSectionClasses: string = ''
    export let customBtnClasses: string = ''
    export let urlParams: boolean = false

    if(!activeTabId) activeTabId = items[0].id
    
    /**
     * EVENTS
     */
     function updateUrlWithId() {
        if(!urlParams || !id || !activeTabId) return
        const currentUrl = new URL(window.location.href)
        currentUrl.searchParams.set(id, activeTabId)
        goto(currentUrl.toString(), { replaceState: false });
    }

    const handleClick = (tabId: string) => () => {
        activeTabId = tabId;
        if (urlParams) updateUrlWithId()
    };

    onMount(() => {

        if(!urlParams || !id) return

        const params = new URLSearchParams(window.location.search);
        const tabParam = params.get(id);
        if (tabParam && items.some(item => item.id === tabParam)) {
            activeTabId = tabParam
        }
        updateUrlWithId()

    })

</script>

<div 
    {...$$restProps} 
    class="tabs{$$restProps.class ? ' '+$$restProps.class : ''}">

    <div class="tabs__header">

        {#each items as item}

            <Button 
                on:click={handleClick(item.id)}
                class="{customBtnClasses}"
                title="{item.desc}"
                type={activeTabId === item.id ? 'primary': 'dark'}
            >
                {item.name}

            </Button>

        {/each}

    </div>
    
    {#each items as item}

        {#if activeTabId === item.id}

            <div class="tabs__content {customSectionClasses}">
                <svelte:component 
                    this={item.component}
                    {...item.props}
                />
            </div>

        {/if}

    {/each}

</div>
