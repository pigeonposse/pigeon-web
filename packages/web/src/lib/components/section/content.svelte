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
			onclick?: () => void
			type?: 'info' | 'none'
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
		// const btns = document.querySelector('.content_bottom .bottom_btns');

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
	let user = apiData?.user 
	let social = user?.social 
	
</script>

{#snippet infoSnippet()}

	<div>
		<span>{$t( 'common.info.social.title' )}</span>
		<div>
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
		</div>
	</div>
	<div>
		<span>{$t( 'common.info.lang.title' )}</span>
		<div>
			<Lang placeholder={$t( 'common.info.lang.placeholder' )}/>
		</div>
	</div>
	<div>
		<span>{$t( 'common.info.more.title' )}</span>
		<div>
			<Button
				goto={$routes.policy.path}
				type="none"
				disabled={$currentRouteID == $routes.policy.id}
			>
				{$routes.policy.name}
			</Button>
		</div>
	</div>

{/snippet}

{#snippet shareSnippet()}
<div>
	<span>{$t( 'common.info.share.title' )}</span>
	<div>
		<Share
		url={page.url.href}
		title={typeof share === 'string' ? share : ( title || '' )}
		{...( typeof share === 'object' ? share : {} )}
	/>
	</div>

</div>

{/snippet}

{#if seo}
	<Seo {...{
		title : title || '',
		...seo,
	}} />
{/if}

<article class="content {type} {Klass || ''}">

	{#if title && !titleContent}
		<h1>{@html title}</h1>
	{:else if titleContent}
		{@render titleContent()}
	{/if}

	{@render children?.()}

	{#if bottomContent && apiData}
		<section class="content_bottom hide_bottom_on_scroll" class:opened={bottomOpened}>

			{#each Object.keys(bottomContent) as key }
				<div 
					class="bottom_content popup__content {bottomContent[key].type || 'info'}" class:!hidden={bottomOpened !== key} 
					aria-hidden="false"
				>
					{@render bottomContent[key]?.content()}
				</div>
			{/each}

			<div class="bottom_btns popup__content">

				{#each Object.keys(bottomContent) as key }
					<Button
						icon={bottomContent[key].icon}
						type={'none'}
						class={bottomOpened === key ? 'disabled' : undefined}
						onclick={() => {

							if(bottomOpened === key) bottomOpened = false
							else bottomOpened = key 
							bottomContent[key].onclick?.()
						}}
						tooltip={{ title: bottomContent[key].title, cmd: bottomContent[key].cmd }}
					/>
				{/each}	

			</div>

		</section>
	{/if}
</article>
