/**
 * Todo.
 * @description Todo.
 */

export const data = ( utils, html, banda ) => {

	let popupsArgs, shareHtml, shareMsg, location

	location = utils.location()
	shareMsg = 'See what original projects I just discovered at PIGEONPOSSE 🤩 Code 💻, games 👾 and creativity 💻 all in one, incredible 😎😎😎! ' + location

	shareHtml = utils.setShare(
		banda.share,
		{
			general : { msg: 'W👀👀W! ' + shareMsg },
			mail    : {
				msg     : shareMsg,
				subject : '👇🤩 See what original projects in ' + location + '🤩👇',
			},
			copy : {
				title          : 'Copy URL here',
				link           : location,
				successMessage : 'Copied successfully!',
			},
		},
	)

	/**
	 * Set defaults popups.
	 */
	popupsArgs = {
		generalOptions : {
			classSelector  : 'body',
			appendSelector : '.footer',
		},
		popups : {
			donate : {
				title    : 'Donate',
				footer   : '',
				position : 'left',
				section  : html.popupSections.donate( ),
			},
			share : {
				title    : 'Share on Social networks',
				footer   : '',
				position : 'center',
				section  : html.popupSections.share( shareHtml ),
			},
			more : {
				title    : 'More info',
				footer   : '',
				position : 'center',
				section  : html.popupSections.more(),
			},
			about : {
				title    : 'About',
				footer   : '',
				position : 'right',
				section  : html.popupSections.about(),
			},
		},
	}
	return { popups: popupsArgs }

}
