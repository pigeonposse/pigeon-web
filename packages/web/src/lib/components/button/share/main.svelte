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
		type = shareTypes.facebook,
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
		style={`background-color:${colors.facebook}`}
		href={encodeURI( `https://facebook.com/sharer/sharer.php?u=${url}&quote=${title}` )}
		icon={faFacebook}
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
		style={`background-color:${colors.mail}`}
		href={encodeURI( `mailto:?subject=${title}&body=${desc + ' ' + url}` )}
		icon={faAt}
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
		style={`background-color:${colors.twitter}`}
		href={encodeURI( `https://x.com/intent/tweet/?text=${title}&url=${url}` )}
		icon={faXTwitter}
		tooltip={{
			title : 'Twitter',
			class : 'btn_share__tooltip',
		}}
		{...rest}
		class="btn_share {rest.class ? ' ' + rest.class : ''}"
		bind:hover={hover}
	/>
{:else if type === shareTypes.pinterest}
	<Button
		style={`background-color:${colors.pinterest}`}
		href={encodeURI( `https://pinterest.com/pin/create/button/?url=${url}&media=${media}&description=${desc}` )}
		icon={faPinterest}
		tooltip={{
			title : 'Pinterest',
			class : 'btn_share__tooltip',
		}}
		{...rest}
		class="btn_share {rest.class ? ' ' + rest.class : ''}"
		bind:hover={hover}
	/>
{:else if type === shareTypes.reddit}
	<Button
		style={`background-color:${colors.reddit}`}
		href={encodeURI( `https://reddit.com/submit/?url=${url}&resubmit=true&title=${title}` )}
		icon={faReddit}
		tooltip={{
			title : 'Reddit',
			class : 'btn_share__tooltip',
		}}
		{...rest}
		class="btn_share {rest.class ? ' ' + rest.class : ''}"
		bind:hover={hover}
	/>
{:else if type === shareTypes.hackernews}
	<Button
		style={`background-color:${colors.hackernews}`}
		href={encodeURI( `https://news.ycombinator.com/submitlink?u=${url}&t=${title}` )}
		icon={faHackerNews}
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
		style={`background-color:${colors.line}`}
		href={encodeURI( `https://social-plugins.line.me/lineit/share?url=${url}` )}
		icon={faLine}
		tooltip={{
			title : 'Line',
			class : 'btn_share__tooltip',
		}}
		{...rest}
		class="btn_share {rest.class ? ' ' + rest.class : ''}"
		bind:hover={hover}
	/>
{:else if type === shareTypes.linkedin}
	<Button
		style={`background-color:${colors.linkedin}`}
		href={encodeURI( `https://www.linkedin.com/sharing/share-offsite/?url=${url}` )}
		icon={faLinkedin}
		tooltip={{
			title : 'Linkedin',
			class : 'btn_share__tooltip',
		}}
		{...rest}
		class="btn_share {rest.class ? ' ' + rest.class : ''}"
		bind:hover={hover}
	/>
{:else if type === shareTypes.telegram}
	<Button
		style={`background-color:${colors.telegram}`}
		href={encodeURI( `https://telegram.me/share/url?text=${title}&url=${url}` )}
		icon={faTelegram}
		tooltip={{
			title : 'Telegram',
			class : 'btn_share__tooltip',
		}}
		{...rest}
		class="btn_share {rest.class ? ' ' + rest.class : ''}"
		bind:hover={hover}
	/>

{:else if type === shareTypes.tumblr}
	<Button
		style={`background-color:${colors.tumblr}`}
		href={encodeURI( `https://www.tumblr.com/widgets/share/tool?posttype=link&title=${title}&caption=${desc}&content=${url}&canonicalUrl=${url}&shareSource=tumblr_share_button` )}
		icon={faTumblr}
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
		style={`background-color:${colors.viber}`}
		href={encodeURI( `viber://forward?text=${desc}` )}
		icon={faViber}
		tooltip={{
			title : 'Viber',
			class : 'btn_share__tooltip',
		}}
		{...rest}
		class="btn_share {rest.class ? ' ' + rest.class : ''}"
		bind:hover={hover}
	/>

{:else if type === shareTypes.vk}
	<Button
		style={`background-color:${colors.vk}`}
		href={encodeURI( `http://vk.com/share.php?title=${title}&url=${url}` )}
		icon={faVk}
		tooltip={{
			title : 'VK',
			class : 'btn_share__tooltip',
		}}
		{...rest}
		class="btn_share {rest.class ? ' ' + rest.class : ''}"
		bind:hover={hover}
	/>

{:else if type === shareTypes.whatsapp}
	<Button
		style={`background-color:${colors.whatsapp}`}
		href={encodeURI( `https://wa.me/?text=${desc}%20${url}` )}
		icon={faWhatsapp}
		tooltip={{
			title : 'Whatsapp',
			class : 'btn_share__tooltip',
		}}
		{...rest}
		class="btn_share {rest.class ? ' ' + rest.class : ''}"
		bind:hover={hover}
	/>

{:else if type === shareTypes.xing}
	<Button
		style={`background-color:${colors.xing}`}
		href={encodeURI( `https://www.xing.com/app/user?op=share;url=${url};title=${title}` )}
		icon={faXing}
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
		style={`background-color:${colors.skype}`}
		href={encodeURI( `https://web.skype.com/share?url=${url}&source=button&text=${desc}` )}
		icon={faSkype}
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
		style={`background-color:${colors.getPocket}`}
		href={encodeURI( `https://getpocket.com/edit?url=${url}&title=${title}` )}
		icon={faGetPocket}
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
		style={`background-color:${colors.evernote}`}
		href={encodeURI( `https://www.evernote.com/clip.action?url=${url}&t=${title}` )}
		icon={faEvernote}
		tooltip={{
			title : 'Evernote',
			class : 'btn_share__tooltip',
		}}
		{...rest}
		class="btn_share {rest.class ? ' ' + rest.class : ''}"
		bind:hover={hover}
	/>
{/if}
