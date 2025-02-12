<script lang="ts">
	import {
		type IconDefinition,
		faInfo,
		faPaperPlane,
		faShare,
	} from '@fortawesome/free-solid-svg-icons'

	import './content.css'
	import { page } from '$app/state'
	import Button from '$components/button/main.svelte'
	import Share from '$components/button/share/all.svelte'
	import Seo from '$components/seo/main.svelte'
	import { t } from '$lib/core/i18n/main'

	import {
	onDestroy,
	onMount,
		type ComponentProps,
		type Snippet,
	} from 'svelte'
	import { joinURL } from '$core/utils/main';
	import { faGithub, faInstagram, faMedium, faXTwitter } from '@fortawesome/free-brands-svg-icons';
	import Link from '$components/button/link.svelte';
	import { currentRouteID, routes } from '$core/routes/main';
	import Lang from '$components/input/lang.svelte';
	import type { ApiData } from '$core/api/types';


	type Props = {
		title?         : string
		type?          : 'main' | 'center'
		share?         : string | Partial<ComponentProps<typeof Share>>
		seo?           : ComponentProps< typeof Seo>
		class?         : string
		children?      : Snippet
		titleContent?  : Snippet
		bottomOpened?  : string | false
		bottomContent? :  { [key in string]: {
			icon    : IconDefinition
			title   : string
			content : () => ReturnType<import("svelte").Snippet>
			cmd?: string[]
		}} 
	}

	let {
		title,
		type  = 'main',
		share,
		seo,
		class: Klass,
		children,
		bottomContent,
		bottomOpened = $bindable( false ),
		titleContent,
	}: Props = $props()

	if ( !bottomContent ) bottomContent = {}
	if ( share ) bottomContent['share'] = {
		icon    : faShare,
		title   : $t( 'common.btns.share' ),
		content : shareSnippet,
	}
	bottomContent['info'] = {
		icon    : faInfo,
		title   : $t( 'common.btns.info' ),
		content : infoSnippet,
	} 


    function handleClickOutside(event: MouseEvent) {
		if(!bottomOpened) return
        const contentBottom = document.querySelector('.content_bottom');

        if (contentBottom && !contentBottom.contains(event.target as Node)) {
            bottomOpened = false;
        }
    }
    onMount(() => {
        document.addEventListener('click', handleClickOutside)
    })

	onDestroy(() => {
        document.removeEventListener('click', handleClickOutside);
    });
	let apiData = page.data.apiData as Required<ApiData>
		let user = apiData.user 
	let social = user.social 
</script>

{#snippet infoSnippet()}

<div class="info__social">
	{#if social}
	
	{#each social as s}
		{#if s.provider === 'twitter' }
			<Link href={s.url} icon={faXTwitter}/>
		{/if}
		{#if s.provider === 'instagram' }
			<Link  href={s.url} icon={faInstagram}/>
		{/if}
		{#if s.provider === 'medium' }
			<Link  href={s.url} icon={faMedium}/>
		{/if}

	{/each}
	{/if}
	{#if user?.email }
		<Link href={user?.email} icon={faPaperPlane}/>
	{/if}
	{#if user?.id }
		<Link href={joinURL( 'https://github.com/', user.id )} icon={faGithub}/>
	{/if}

	<div class="footer__nav">

		<Button
			goto={$routes.policy.path}
			type="transparent"
			disabled={$currentRouteID == $routes.policy.id}
			class="text-sm"
		>
			{$routes.policy.name}
		</Button>
	
		<Lang placeholder={$t( 'common.lang.placeholder' )}/>
		
	</div>
</div>
{/snippet}

{#snippet shareSnippet()}
	<Share
		url={page.url.href}
		title={typeof share === 'string' ? share : ( title || '' )}
		{...( typeof share === 'object' ? share : {} )}
	/>
{/snippet}

{#if seo}
	<Seo {...{
		title : title || '',
		...seo,
	}} />
{/if}

<div class="content {type} {Klass || ''}">

	{#if title && !titleContent}
		<h1>{@html title}</h1>
	{:else if titleContent}
		{@render titleContent()}
	{/if}

	{@render children?.()}

	{#if bottomContent}
		<section class="content_bottom hide_bottom_on_scroll" class:opened={bottomOpened}>

			{#each Object.keys(bottomContent) as key }
				<div class="bottom_content" class:hidden={bottomOpened !== key}>
						<!-- <div class="flex flex-row  w-full pb-1">
							<h4 class="text-primary-50/70">{bottomContent[key]?.title}</h4>
						</div>
						<div class="border-y-2 border-primary-600/20 bg-primary-900/10">
							{@render bottomContent[key]?.content()}
						</div> -->
					{@render bottomContent[key]?.content()}
				</div>
			{/each}

			<div class="bottom_btns">

				{#each Object.keys(bottomContent) as key }
					<Button
						icon={bottomContent[key].icon}
						type={'none'}
						disabled={bottomOpened === key}
						onclick={() => bottomOpened = key }
						tooltip={{ title: bottomContent[key].title, cmd: bottomContent[key].cmd }}
					/>
				{/each}	

			</div>

		</section>
	{/if}
</div>
