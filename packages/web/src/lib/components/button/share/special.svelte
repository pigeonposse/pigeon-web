<script lang="ts">

    import { faCopy, faPrint } from "@fortawesome/free-solid-svg-icons"
    import Button from "$lib/components/button/main.svelte"
    import './style.css'
    
    export let type: 'copy' | 'print' | 'copy-input' = 'copy'
    export let title: string
    export let url: string
    export let textOnclick: string | undefined = undefined
    
    let showTxt = false
    const copyUrl = async () => {
        try {
            await navigator.clipboard.writeText(url);
            showTxt = true
            setTimeout(() => showTxt = false, 2000)
        } catch (error) {
            console.error('Failed to copy URL to clipboard', error);
        }
    }

</script>

{#if type === 'copy'}
    <Button 
        icon="{faCopy}"
        on:click={copyUrl}
        color={'dark'}
        class="btn_share {textOnclick && showTxt === true ? 'none' : ''}"
        tooltip={{
            title: textOnclick && showTxt === true ? textOnclick : '',
            placement:'top',
            class: 'btn_share__tooltip',
        }}
        {...$$restProps}
    > 
        {title}
    </Button>
    <!-- <Tooltip 
        class={tClass} 
        style={showTxt && textOnclick ? ' ': 'display:none;'}
        placement={'top'}
    >
        {#if textOnclick && showTxt === true}
            {textOnclick}
        {/if} 
    </Tooltip> -->
    


{:else if type === 'print'}
    <Button 
        icon="{faPrint}"
        on:click={() => {window?.print() }}
        class="btn_share"
        {...$$restProps}
    > {title}</Button>

{/if}
