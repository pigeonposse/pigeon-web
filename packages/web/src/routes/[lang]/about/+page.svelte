<script lang="ts">
	
    import Page from "$lib/components/section/content.svelte";
    import Section from "$lib/components/section/container.svelte";
    import Link from "$lib/components/link/main.svelte"
    import Card from "$lib/components/card/main.svelte";
	import { faGlobe } from "@fortawesome/free-solid-svg-icons";
	import { faGithub } from "@fortawesome/free-brands-svg-icons";
    
    export let data
	const { t, appName, apiData } = data

</script>

<Page 
    title={$t('common.routes.about.title')}
    seo={{
        title:$t('common.routes.about.title'),
        pageTitle: appName,
        description: $t('common.routes.about.desc')
    }}
    share={$t('common.routes.about.title')}
>

    {#if apiData.user && Array.isArray(apiData.user.teams)}
        {#each apiData.user.teams as team}
            {#if 'members' in team}
                <Section 
                    title={team.name}
                    type="center"
                >
                    <div class="flex flex-row gap-4 h-max items-between justify-between">
                        {#each team.members as member}
   
						<Card 
							class="p-8"
							href={ member.homepage || member.github}
							imgBgUrl={member.avatar}
						>
							<!-- svelte-ignore a11y-img-redundant-alt -->
							<img 
								slot="header"
								src="{member.avatar}" 
								alt="card-image" 
								width="150" 
								height="150"
								class="object-contain rounded-full bg-primary-800/10 p-2"
							/>

							<div>
								<div class="py-4">
									<h3 class="text-4xl font-extrabold text-start">{name}</h3>
									<div class="text-start py-4 px-2">
										{ member.desc || ''}
									</div>
								</div>
							</div>
							<div slot="footer" class="flex gap-4 w-full justify-end p-2">
								{#if  member.homepage }
									<Link 
										href={member.homepage} 
										icon={faGlobe}
										tooltip={{title: 'Web'}}
									/>
								{/if}
								{#if member.github}
									<Link 
										href={member.github} 
										icon={faGithub}
										tooltip={{title: 'Repository'}}
									/>
								{/if}
							</div>
						</Card>

                        {/each}
        
                    </div>
                </Section>
            {/if}
        {/each}
    {/if}
    
</Page>
