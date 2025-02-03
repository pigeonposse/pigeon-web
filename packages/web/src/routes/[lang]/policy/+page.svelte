<script lang="ts">

	import {
		faLink,
		faShieldHalved,
	} from '@fortawesome/free-solid-svg-icons'

	import { page } from '$app/state'
	import Accordion from '$lib/components/accordion/main.svelte'
	import Notification from '$lib/components/notification/main.svelte'
	import Page from '$lib/components/section/content.svelte'
	import Tabs from '$lib/components/tabs/main.svelte'

	export let data

	const {
		t, appName,
	} = data

</script>

{#snippet web()}

	<Accordion type="section">
		<Accordion
			type="item"
			icon="{faShieldHalved}"
			open="{true}"
			title="Our Privacy Policy"
		>
			<p>We maintain a transparent privacy policy and do not track any personal information from our users. We only use the necessary cookies to ensure a better user experience.</p>
		</Accordion>
		<Accordion
			type="item"
			icon="{faLink}"
			title="Embedded Content from Other Websites"
		>
			<p>
				Articles on this site may include embedded content (e.g., videos, images, articles, etc.).
				<br>
				Embedded content from other websites behaves in the same way as if the visitor had visited the other website.
				<br>
				These websites may collect data about you, use cookies, embed additional third-party tracking, and monitor your interaction with that embedded content, including tracking your interaction if you have an account and are logged into that website.
			</p>
			<p>We are not responsible for embedded content from other websites. Although we try to include content only from reliable sources, we have no control over how these sites handle your data and privacy policies.</p>
			<p>Possible examples of embedded content on our site:</p>
			<ul>
				<li>YouTube videos</li>
				<li>Instagram posts</li>
				<li>News media articles</li>
			</ul>
		</Accordion>
	</Accordion>

{/snippet}

{#snippet extensions()}

	<div class="py-3">

		<Notification type="info" class="w-max">
			This text applies to all extensions developed by PigeonPosse whose policy is linked to this page.
		</Notification>

		<p>In our collective, we take our users' privacy very seriously. That is why we want to assure you that our extensions are designed with total transparency and without user tracking.</p>

		<p>Additionally, all our extensions are open-source, meaning the code is available for anyone to review, modify, and improve. We believe in the importance of transparency and collaboration in software development.</p>

		<p>If you have any questions about our privacy policy or how we handle user data, please do not hesitate to contact us.</p>

		<p>Thank you for trusting our extensions.</p>

	</div>

{/snippet}

<Page
	title={$t( 'common.policy.title' )}
	seo={{
		pageTitle   : appName,
		description : $t( 'common.policy.desc' ),
	}}
	share={$t( 'common.policy.title' )}
>
	<p>{$t( 'common.policy.webDesc' )} <italic class="opacity-70">{page.url.origin}</italic></p>

	<Tabs
		id="type"
		items={ [
			{
				name  : 'Web',
				id    : 'web',
				input : web,
			},
			{
				name  : 'Extensions',
				id    : 'browser-extension',
				input : extensions,
			},
		]}
		urlParams={true}
	/>
</Page>
