<script lang="ts">
    import { githubsponsorsSVG, kofiSVG, opencollectiveSVG } from "$lib/components/icons/main";
    import Card from "$lib/components/card/main.svelte";

    export let type: "kofi" | "opencollective" | "github"
    export let name: string
    export let href : string
    export let feat: boolean = false
    export let desc: string | undefined = undefined

</script>

<Card 
    {href}
    class="transition_general p-8 [&_span_svg]:transition_general [&_span_svg]:opacity-20 [&_span_svg]:hover:opacity-100 {feat ? '!border-4 colored_feat': 'colored'}"
>
    <div>
        <span class="[&_svg]:w-40 {feat ? '[&_svg]:fill-secondary-500': '[&_svg]:fill-primary-500'}">

            {#if type === "kofi"}
                {@html kofiSVG }
            {:else if type === "opencollective"}
                {@html opencollectiveSVG }
            {:else if type === "github"}
                {@html githubsponsorsSVG }
            {/if}
           
        </span>
        <div class="py-4">
            <h3 class="text-4xl font-extrabold text-start">{name}</h3>
            <div class="text-start py-4 px-2">
				{desc || ''}
                <slot/>
            </div>
        </div>
    </div>
    <span 
        class="button {feat ? 'secondary': 'primary'} w-full mt-2"
    >Contribute</span>
</Card>
