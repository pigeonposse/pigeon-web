<script lang="ts">

    import { Accordion, AccordionItem } from 'flowbite-svelte'
    import type { IconDefinition } from '../icons/main';
    import Icon from "$lib/components/icons/main.svelte"

    import './style.css'

    /**
     * VARIABLES
     */
    export let title: string | undefined = undefined;
    export let icon: IconDefinition | undefined = undefined;
    export let type: "section" | "item" = "item"
    export let open: boolean = false;
	
</script>

{#if type === "item"}

    <AccordionItem 
        bind:open={open} 
        borderClass="border-none"
        borderBottomClass="border-none" 
        {...$$restProps}
        class="{open ? '!text-primary-300' : '!text-primary-100'} p-4 font-bold text-xl {$$restProps.class || ''}"
    >

        <span slot="header" class="relative flex gap-2 items-center"> 
            {#if icon}
                <Icon svg={icon} class=""/>
            {/if}
            {#if title}
                {title}
            {/if}

        </span>

        <slot/>

    </AccordionItem>

{:else if type === "section" }

    <Accordion 
        flush  
        class="w-full {$$restProps.class || ''}"
        {...$$restProps}
    >

        <slot/>
    
    </Accordion>

{/if}
