<script lang="ts">

    import { page } from '$app/stores'
    import SharePopover from "$lib/components/section/share.svelte"
    import Seo from "$lib/components/seo/main.svelte"
    import type { ComponentProps } from 'svelte';
    import './content.css'
	// import Header from './header.svelte';


	// export let data
	const {apiData} = $page.data
    export let title: string | undefined = undefined
    export let type: 'main' | 'center' = 'main'
    export let share: string | ComponentProps<SharePopover> | undefined = undefined
    export let seo: ComponentProps<Seo> | undefined = undefined

</script>

{#if seo}
    <Seo 
        {...seo}
    />
{/if}


<div class="content {type}">

    {#if title }
        <h1>{title}</h1>
    {/if}

    <slot/>

    {#if "bottom" in $$slots || share }

        <section class="content_bottom">
            
            <slot name="bottom" />

            {#if share}
                <SharePopover
                    {...(typeof share === 'string' ? {title: share} : {title: title ? title : ''})}
                    url={$page.url.href}
                    {...(typeof share === 'object' ? share : {})}
                />
            {/if}

        </section>

    {/if}

</div>
