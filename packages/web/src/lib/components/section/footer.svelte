<script lang="ts">

    import './footer.css'
    import  Link from "$lib/components/link/main.svelte";
    import Button from "$lib/components/button/main.svelte";
    import { currentRouteID, type Route } from "$lib/core/routes/main";
	import type { ApiData } from '$lib/core/api/main';
	import { faInstagram, faMedium, faXTwitter } from '@fortawesome/free-brands-svg-icons';
	import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

    export let title: string | undefined = undefined
    export let social: NonNullable<NonNullable<ApiData>['user']>['social'] = undefined
	export let email: NonNullable<NonNullable<ApiData>['user']>['email'] = undefined
    export let nav: Route[]

    const pkg = PKG
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
      </div>
    {/if}

    <div class="footer__nav">
      {#each nav as li}
        <Button 
          goto="{li.path}" 
          type="transparent"
          disabled={$currentRouteID == li.id}
        >
          {li.name}
        </Button>
      {/each}
	  <Link 
	  href={pkg.repository.url} 
	  title={`v${pkg.version}`}
	  class="opacity-50"
	/>
    </div>
</footer>
