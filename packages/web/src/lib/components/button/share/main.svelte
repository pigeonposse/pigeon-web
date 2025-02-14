<script lang="ts">

	import {
		faEvernote,
		faFacebook,
		faGetPocket,
		faHackerNews,
		faLine,
		faLinkedin,
		faPinterest,
		faReddit,
		faSkype,
		faTelegram,
		faTumblr,
		faViber,
		faVk,
		faWhatsapp,
		faXTwitter,
		faXing,
	} from '@fortawesome/free-brands-svg-icons'
	import { faAt } from '@fortawesome/free-solid-svg-icons'

	import './style.css'
	import { shareTypes } from './types'
	import Button from '$components/button/main.svelte'

	import type { ShareType } from './types'
	import type { ComponentProps } from 'svelte'

	let {
		type  = shareTypes.facebook,
		title,
		url,
		desc,
		media,
		...rest
	}: Omit<ComponentProps<typeof Button>, 'type'> & {
		type   : ShareType
		title  : string
		url    : string
		desc?  : string
		media? : string
	} = $props()
	const colors = {
		facebook   : '#2e4373',
		mail       : '#777777',
		twitter    : 'black',
		instagram  : '#bc2a8d',
		reddit     : '#ff4500',
		pinterest  : '#bd081c',
		linkedin   : '#0077b5',
		telegram   : '#0088cc',
		whatsapp   : '#25d366',
		line       : '#00c300',
		tumblr     : '#36465d',
		vk         : '#4a76a8',
		xing       : '#026466',
		viber      : '#665cac',
		snapchat   : '#fffc00',
		youtube    : '#ff0000',
		github     : '#181717',
		hackernews : '#ff6600',
		skype      : '#00aff0',
		getPocket  : '#ef4056',
		evernote   : '#2dbe60',
		ok         : '#ff6a00',
	}

	let hover = $state( false )
</script>

{#if type === shareTypes.facebook}
	<Button
		icon={faFacebook}
		href={encodeURI( `https://facebook.com/sharer/sharer.php?u=${url}&quote=${title}` )}
		style={`background-color:${colors.facebook}`}
		tooltip={{
			title : 'Facebook',
			class : 'btn_share__tooltip',
		}}
		{...rest}
		class="btn_share {rest.class ? ' ' + rest.class : ''}"
		bind:hover={hover}
	/>
{:else if type === shareTypes.mail}
	<Button
		icon={faAt}
		href={encodeURI( `mailto:?subject=${title}&body=${desc + ' ' + url}` )}
		style={`background-color:${colors.mail}`}
		tooltip={{
			title : 'Mail',
			class : 'btn_share__tooltip',
		}}
		{...rest}
		class="btn_share {rest.class ? ' ' + rest.class : ''}"
		bind:hover={hover}
	/>
{:else if type === shareTypes.twitter}
	<Button
		icon={faXTwitter}
		href={encodeURI( `https://x.com/intent/tweet/?text=${title}&url=${url}` )}
		tooltip={{
			title : 'Twitter',
			class : 'btn_share__tooltip',
		}}
		style={`background-color:${colors.twitter}`}
		{...rest}
		class="btn_share {rest.class ? ' ' + rest.class : ''}"
		bind:hover={hover}
	/>
{:else if type === shareTypes.pinterest}
	<Button
		icon={faPinterest}
		href={encodeURI( `https://pinterest.com/pin/create/button/?url=${url}&media=${media}&description=${desc}` )}
		tooltip={{
			title : 'Pinterest',
			class : 'btn_share__tooltip',
		}}
		style={`background-color:${colors.pinterest}`}
		{...rest}
		class="btn_share {rest.class ? ' ' + rest.class : ''}"
		bind:hover={hover}
	/>
{:else if type === shareTypes.reddit}
	<Button
		icon={faReddit}
		href={encodeURI( `https://reddit.com/submit/?url=${url}&resubmit=true&title=${title}` )}
		tooltip={{
			title : 'Reddit',
			class : 'btn_share__tooltip',
		}}
		style={`background-color:${colors.reddit}`}
		{...rest}
		class="btn_share {rest.class ? ' ' + rest.class : ''}"
		bind:hover={hover}
	/>
{:else if type === shareTypes.hackernews}
	<Button
		icon={faHackerNews}
		href={encodeURI( `https://news.ycombinator.com/submitlink?u=${url}&t=${title}` )}
		style={`background-color:${colors.hackernews}`}
		tooltip={{
			title : 'Hackernews',
			class : 'btn_share__tooltip',
		}}
		{...rest}
		class="btn_share {rest.class ? ' ' + rest.class : ''}"
		bind:hover={hover}
	/>
{:else if type === shareTypes.line}
	<Button
		icon={faLine}
		href={encodeURI( `https://social-plugins.line.me/lineit/share?url=${url}` )}
		tooltip={{
			title : 'Line',
			class : 'btn_share__tooltip',
		}}
		style={`background-color:${colors.line}`}
		{...rest}
		class="btn_share {rest.class ? ' ' + rest.class : ''}"
		bind:hover={hover}
	/>
{:else if type === shareTypes.linkedin}
	<Button
		icon={faLinkedin}
		href={encodeURI( `https://www.linkedin.com/sharing/share-offsite/?url=${url}` )}
		tooltip={{
			title : 'Linkedin',
			class : 'btn_share__tooltip',
		}}
		style={`background-color:${colors.linkedin}`}
		{...rest}
		class="btn_share {rest.class ? ' ' + rest.class : ''}"
		bind:hover={hover}
	/>
{:else if type === shareTypes.telegram}
	<Button
		icon={faTelegram}
		href={encodeURI( `https://telegram.me/share/url?text=${title}&url=${url}` )}
		tooltip={{
			title : 'Telegram',
			class : 'btn_share__tooltip',
		}}
		style={`background-color:${colors.telegram}`}
		{...rest}
		class="btn_share {rest.class ? ' ' + rest.class : ''}"
		bind:hover={hover}
	/>

{:else if type === shareTypes.tumblr}
	<Button
		icon={faTumblr}
		href={encodeURI( `https://www.tumblr.com/widgets/share/tool?posttype=link&title=${title}&caption=${desc}&content=${url}&canonicalUrl=${url}&shareSource=tumblr_share_button` )}
		style={`background-color:${colors.tumblr}`}
		tooltip={{
			title : 'Tumblr',
			class : 'btn_share__tooltip',
		}}
		{...rest}
		class="btn_share {rest.class ? ' ' + rest.class : ''}"
		bind:hover={hover}
	/>

{:else if type === shareTypes.viber}
	<Button
		icon={faViber}
		href={encodeURI( `viber://forward?text=${desc}` )}
		tooltip={{
			title : 'Viber',
			class : 'btn_share__tooltip',
		}}
		style={`background-color:${colors.viber}`}
		{...rest}
		class="btn_share {rest.class ? ' ' + rest.class : ''}"
		bind:hover={hover}
	/>

{:else if type === shareTypes.vk}
	<Button
		icon={faVk}
		href={encodeURI( `http://vk.com/share.php?title=${title}&url=${url}` )}
		tooltip={{
			title : 'VK',
			class : 'btn_share__tooltip',
		}}
		style={`background-color:${colors.vk}`}
		{...rest}
		class="btn_share {rest.class ? ' ' + rest.class : ''}"
		bind:hover={hover}
	/>

{:else if type === shareTypes.whatsapp}
	<Button
		icon={faWhatsapp}
		href={encodeURI( `https://wa.me/?text=${desc}%20${url}` )}
		tooltip={{
			title : 'Whatsapp',
			class : 'btn_share__tooltip',
		}}
		style={`background-color:${colors.whatsapp}`}
		{...rest}
		class="btn_share {rest.class ? ' ' + rest.class : ''}"
		bind:hover={hover}
	/>

{:else if type === shareTypes.xing}
	<Button
		icon={faXing}
		href={encodeURI( `https://www.xing.com/app/user?op=share;url=${url};title=${title}` )}
		style={`background-color:${colors.xing}`}
		tooltip={{
			title : 'Ximg',
			class : 'btn_share__tooltip',
		}}
		{...rest}
		class="btn_share {rest.class ? ' ' + rest.class : ''}"
		bind:hover={hover}
	/>

	<!-- {:else if type === shareTypes.snapchat}
    <Button
        icon={faWhatsapp}
        href={encodeURI(`https://wa.me/?text=${desc}%20${url}`)}
        class="{bClass}"
        style={`background-color:${colors.snapchat}`}
        {...rest}
    />   -->
	<!-- {:else if type === shareTypes.ok}
    <Button
        href={encodeURI(`https://connect.ok.ru/dk?st.cmd=WidgetSharePreview&service=odnoklassniki&st.shareUrl=${url}`)}
        class="{bClass}"
        style={`background-color:${colors.ok}`}
        {...rest}
    />   -->
{:else if type === shareTypes.skype}
	<Button
		icon={faSkype}
		href={encodeURI( `https://web.skype.com/share?url=${url}&source=button&text=${desc}` )}
		style={`background-color:${colors.skype}`}
		tooltip={{
			title : 'Skype',
			class : 'btn_share__tooltip',
		}}
		{...rest}
		class="btn_share {rest.class ? ' ' + rest.class : ''}"
		bind:hover={hover}
	/>

{:else if type === shareTypes.getPocket}
	<Button
		icon={faGetPocket}
		href={encodeURI( `https://getpocket.com/edit?url=${url}&title=${title}` )}
		style={`background-color:${colors.getPocket}`}
		tooltip={{
			title : 'GetRocket',
			class : 'btn_share__tooltip',
		}}
		{...rest}
		class="btn_share {rest.class ? ' ' + rest.class : ''}"
		bind:hover={hover}
	/>

{:else if type === shareTypes.evernote}
	<Button
		icon={faEvernote}
		href={encodeURI( `https://www.evernote.com/clip.action?url=${url}&t=${title}` )}
		style={`background-color:${colors.evernote}`}
		tooltip={{
			title : 'Evernote',
			class : 'btn_share__tooltip',
		}}
		{...rest}
		class="btn_share {rest.class ? ' ' + rest.class : ''}"
		bind:hover={hover}
	/>
{/if}
