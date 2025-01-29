<script lang="ts">

    import Link from "$lib/components/link/main.svelte"
    import Card from "$lib/components/card/main.svelte";
	import { faGlobe } from "@fortawesome/free-solid-svg-icons";
	import { faGithub } from "@fortawesome/free-brands-svg-icons";


	type TeamMemberData = any
    export let data
    
    const {avatar, desc, github} = data
    const url = data.homepage || github
    const name = data.name || data.login

</script>

    
<Card 
    class="p-8"
    href={url}
    imgBgUrl={avatar}
>
    <!-- svelte-ignore a11y-img-redundant-alt -->
    <img 
        slot="header"
        src="{avatar}" 
        alt="card-image" 
        width="150" 
        height="150"
        class="object-contain rounded-full bg-primary-800/10 p-2"
    />

    <div>
        <div class="py-4">
            <h3 class="text-4xl font-extrabold text-start">{name}</h3>
            <div class="text-start py-4 px-2">
                {#if desc}
                    {desc}
                {/if}
            </div>
        </div>
    </div>
    <div slot="footer" class="flex gap-4 w-full justify-end p-2">
        {#if url}
            <Link 
                href={url} 
                icon={faGlobe}
                tooltip={{title: 'Web'}}
            />
        {/if}
        {#if github}
            <Link 
                href={github} 
                icon={faGithub}
                tooltip={{title: 'Repository'}}
            />
        {/if}
    </div>
</Card>

