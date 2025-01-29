<script lang="ts">
    
    import './style.css'

    import { goto as gotoFunct } from '$app/navigation';
    import type { ComponentProps } from 'svelte';
    import Tooltip from "$lib/components/tooltip/main.svelte"
    import Icon from "$lib/components/icons/main.svelte"

    export let icon: ComponentProps<Icon> | ComponentProps<Icon>['svg'] | undefined = undefined
    export let iconPosition: 'left' | 'right' = 'left'
    export let hover = false
    export let goto: undefined | string = undefined
    export let href: undefined | string = undefined
    export let type: 'none' | 'dark' | 'transparent' | 'primary' | 'secondary' | 'logo' = "primary"
    export let active: boolean = false
    export let tooltip: ComponentProps<Tooltip> | undefined = undefined

    function handleMouseEnter() {
        hover = true;
    }

    function handleMouseLeave() {
        hover = false;
    }

</script>

<button
    type="button"
    on:mouseenter={handleMouseEnter}
    on:mouseleave={handleMouseLeave}
    on:click={() => { 
        if(goto) gotoFunct(goto) 
        if(href) window?.open(href)
    }}
    on:click
    on:mousemove
    {...$$restProps}
    class="{type !== 'none' ? 'button ' + type : ''}{active ? ' active' : ''}{$$restProps.class ? ' '+$$restProps.class : ''}"
>

    {#if icon && iconPosition === 'left'}
        <Icon 
            class="{$$slots.default ? iconPosition: ''}" 
            {...(typeof icon === 'object' && 'svg' in icon ? icon : { svg: icon })}
        />
    {/if}
    <slot/>
    {#if icon && iconPosition === 'right'}
        <Icon 
            class="{$$slots.default ? iconPosition: ''}" 
            {...(typeof icon === 'object' && 'svg' in icon ? icon : { svg: icon })}
        />
    {/if}

</button>

{#if tooltip}
    <Tooltip {...tooltip} />
{/if}
