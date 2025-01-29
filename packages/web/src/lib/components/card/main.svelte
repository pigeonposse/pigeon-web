<script lang="ts">

    import Button from "$lib/components/button/main.svelte"
    import Tooltip from "$lib/components/tooltip/main.svelte"
    import type { ComponentProps } from "svelte";
    import './style.css'

    /**
     * VARIABLES
     */
    export let href:string | undefined = undefined
    export let imgBgUrl: string | undefined = undefined
    export let type: 'main' | 'global' = 'main'
    export let tooltip: ComponentProps<Tooltip> | undefined = undefined
    export let shadowHover: boolean = true
    
    let x = 0;
    let y = 0;
    const shadowSize = 200

    let onHover:boolean
    function handleMouseMove(event: MouseEvent) {
        if(!event.currentTarget ) return
        // @ts-ignore
        const rect = event.currentTarget.getBoundingClientRect()
        x = event.clientX - rect.left - shadowSize / 2;
        y = event.clientY - rect.top - shadowSize / 2;
    }

</script>

<Button 
    {href}
    on:click 
    {...$$restProps}
    type="none"
    {tooltip}
    class="card {type} group colored transition_general relative {$$restProps.class || ''}"
    on:mousemove={(e) => {if(shadowHover) handleMouseMove(e)}}
    bind:hover={onHover}
>   

    {#if imgBgUrl}
        <!-- svelte-ignore a11y-img-redundant-alt -->
        <img 
            src="{imgBgUrl}" 
            alt="bg-image-card" 
            width="100" 
            height="100"
            class="card__bg_img transition_general"
        />
    {/if}

    {#if onHover && shadowHover}
        <div
            class="card__bg_shadow"
            style="top: {y}px; left: {x}px; width: {shadowSize}px; height: {shadowSize}px;"
        ></div>
    {/if}

    {#if "top" in $$slots}
        <div class="card__top">
            <slot name="top" />
        </div>
    {/if}

    <div class="card__container">
        
        {#if "header" in $$slots}
            <div>
                <slot name="header" />
            </div>
        {/if}

        <slot/>

        {#if "footer" in $$slots}
            <div>
                <slot name="footer" />
            </div>
        {/if}

    </div>

</Button>