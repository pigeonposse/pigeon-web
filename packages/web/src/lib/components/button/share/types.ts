
export const shareTypes = {
	mail       : 'mail',
	facebook   : 'facebook',
	twitter    : 'twitter',
	instagram  : 'Instagram',
	reddit     : 'Reddit',
	pinterest  : 'Pinterest',
	linkedin   : 'LinkedIn',
	telegram   : 'Telegram',
	whatsapp   : 'WhatsApp',
	line       : 'Line',
	tumblr     : 'Tumblr',
	vk         : 'VK',
	xing       : 'Xing',
	viber      : 'Viber',
	snapchat   : 'Snapchat',
	youtube    : 'YouTube',
	github     : 'GitHub',
	hackernews : 'hackernews',
	ok         : 'ok',
	skype      : 'skype',
	getPocket  : 'pocket',
	evernote   : 'evernote',
} as const
type ObjectValues<Values> = Values[keyof Values]
export type ShareType = ObjectValues<typeof shareTypes>
