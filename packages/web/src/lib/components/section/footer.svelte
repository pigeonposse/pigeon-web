<script lang="ts">
	import {
		faGithub,
		faInstagram,
		faMedium,
		faXTwitter,
	} from '@fortawesome/free-brands-svg-icons'
	import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'

	import './footer.css'
	import Lang from '../input/lang.svelte'
	import Button from '$lib/components/button/main.svelte'
	import Link from '$lib/components/link/main.svelte'
	import type { ApiData } from '$lib/core/api/types'
	import { t } from '$lib/core/i18n/main'
	import {
		type Route,
		currentRouteID,
	} from '$lib/core/routes/main'

	const {
		title,
		social,
		email,
		github,
		nav,
	}: {
		title?  : string
		social? : NonNullable<NonNullable<ApiData>['user']>['social']
		email?  : NonNullable<NonNullable<ApiData>['user']>['email']
		github? : string
		nav?    : Route[]
	} = $props()

</script>

<footer class="footer">

	{#if title }
		<div class="footer__title">
			<h4 class="font-bold">{title}</h4>
		</div>

	{/if}

	{#if social }
		<div class="footer__social">
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
			{#if email }
				<Link href={email} icon={faPaperPlane}/>
			{/if}
			{#if github }
				<Link href={github} icon={faGithub}/>
			{/if}
		</div>
	{/if}

	<div class="footer__nav">
		{#if nav}
			{#each nav as li}
				<Button
					goto={li.path}
					type="transparent"
					disabled={$currentRouteID == li.id}
					class="text-sm"
				>
					{li.name}
				</Button>
			{/each}
		{/if}
		<Lang placeholder={$t( 'common.lang.placeholder' )}/>
		<Link
			href={PKG.repository.url}
			title={`v${PKG.version}`}
			class="opacity-50"
		/>
	</div>

</footer>
