<script lang="ts">

    import { faGlobe, faBook } from "@fortawesome/free-solid-svg-icons";
	import { faGithub } from "@fortawesome/free-brands-svg-icons";
    import Link from "$lib/components/link/main.svelte"
    import Badge from "$lib/components/badge/main.svelte"
    import CardMain from  './main.svelte'
    // import { projectStatus} from "@pigeon-web/api"
    // import { type ProjectStatus } from "@pigeon-web/api/types"

    /**
     * VARIABLES
     */
    export let href:string
    export let title: string
    export let desc: string
    export let img: string
    export let githubUrl: string | undefined = undefined
    export let webUrl: string | undefined = undefined
    export let docsUrl: string | undefined = undefined
    export let type: 'simple' | 'main' = 'main'
    export let status: string = 'active'
    export let tags: string[] | string | undefined = undefined

</script>

<CardMain 
    {href}
    imgBgUrl={img}
    {...$$restProps}
    class="{$$restProps.class || ''}"
>   

    <div slot="top">
        {#if status === 'idea'}
            <Badge type="purple">idea</Badge>
        {:else if status === 'dev'}
            <Badge type="yellow">development</Badge>
        {:else if status === 'coming-soon'}
            <Badge type="green">coming soon</Badge>
        {:else if status === 'alpha'}
            <Badge type="primary">alpha</Badge>
        {:else if status === 'beta'}
            <Badge type="primary">beta</Badge>
        {:else if status === 'archived'}
            <Badge type="gray">archived</Badge>
        {/if}
    </div>
    
    {#if type === 'main'}
        <!-- svelte-ignore a11y-img-redundant-alt -->
        <img 
            src="{img}" 
            alt="card-image" 
            width="150" 
            height="150"
            class="object-contain"
        />
    {/if}

    <div class="flex flex-col justify-between items-start gap-2 break-words text-start h-full">
        <div class="max-w-full">
            <h3 class="mb-2 text-2xl font-bold tracking-tight text-white">{title}</h3>
            <p class="opacity-60">{desc}</p>
            
            {#if tags }
                {#if Array.isArray(tags)}
                    <div class="flex gap-2 flex-wrap max-h-[90px] overflow-y-scroll scrollbar_hide">
                        {#each tags as tag}
                            <Badge type="primary" class="opacity-60">{tag}</Badge>
                        {/each}
                    </div>
                {:else if typeof tags === 'string'}
                    <Badge type="primary" class="opacity-60">{tags}</Badge>
                {/if}
            
            {/if}
        </div>
    </div>
    <div slot="footer" class="flex gap-4 w-full justify-end">
        {#if webUrl}
            <Link 
                href={webUrl} 
                icon={faGlobe}
                tooltip={{title: 'Web'}}
            />
        {/if}
        {#if docsUrl}
            <Link 
                href={docsUrl} 
                icon={faBook}
                tooltip={{title: 'Documentation'}}
            />
        {/if}
        {#if githubUrl}
            <Link 
                href={githubUrl} 
                icon={faGithub}
                tooltip={{title: 'Repository'}}
            />
        {/if}
    </div>
</CardMain>
