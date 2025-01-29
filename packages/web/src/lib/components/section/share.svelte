<script lang="ts">

    import { shareTypes } from "$lib/components/button/share/types";
	import Popover from "$lib/components/popover/main.svelte";
	import { faShare } from "@fortawesome/free-solid-svg-icons";
    import { Button, ButtonShare, ButtonShareSpecial } from "../components";

    export let title: string
    export let url: string
    export let desc: string = ''
    export let media = '/favicon.png'
console.log(url)
</script>

<Button 
    icon={faShare} 
    type="dark"
    class="p-4"
/>
<Popover placement={'top-end'}>

    <div class="flex flex-col">
        <h5 class="font-bold my-2">Share in: </h5>
        <div class="inline-grid grid-cols-4 gap-2">

            {#each Object.values(shareTypes) as type }
                <ButtonShare 
                    {type} 
                    {url}
                    {title}
                    {desc}
                    {media}
                    class="!bg-primary-950/30"
                />        
            {/each}

        </div>
        <hr class="my-3 opacity-10 bg-primary-900">
        <div class="flex mb-3 w-full gap-2">
            <!-- <ButtonShareSpecial
                type="print"  
                {url}
                title={'Print'}
                class="!bg-primary-950/30"
            /> -->
            <ButtonShareSpecial 
                type="copy" 
                textOnclick="✅ Successfully copied" 
                title={'Copy link'}
                {url}
                class="!bg-primary-950/30"
            />
        </div>
    </div>

</Popover>
