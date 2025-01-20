/**
 * Todo.
 * @description Todo.
 * @version 1.0.0
 */

export const setShare = ( library, args ) => {

	return library.create( {
		get   : 'html',
		types : {
			facebook : {
				title   : '<i class="pigeon-icon-share fa-brands fa-facebook-f"></i>',
				message : args.general.msg,
			},
			twitter : {
				title   : '<i class="pigeon-icon-share fa-brands fa-twitter"></i>',
				message : args.general.msg,
			},
			pinterest : {
				title   : '<i class="pigeon-icon-share fa-brands fa-pinterest-p"></i>',
				message : args.general.msg,
				media   : '',
			},
			whatsapp : {
				title   : '<i class="pigeon-icon-share fa-brands fa-whatsapp"></i>',
				message : args.general.msg,
			},
			telegram : {
				title   : '<i class="pigeon-icon-share fa-brands fa-telegram-plane"></i>',
				message : args.general.msg,
			},
			reddit : {
				title   : '<i class="pigeon-icon-share fa-brands fa-reddit-alien"></i>',
				message : args.general.msg,
			},
			linkedin : {
				title   : '<i class="pigeon-icon-share fa-brands fa-linkedin-in"></i>',
				message : args.general.msg,
			},
			houzz : {
				title   : '<i class="pigeon-icon-share fa-brands fa-houzz"></i>',
				message : args.general.msg,
			},
			mail : {
				title   : '<i class="pigeon-icon-share fa-solid fa-envelope"></i>',
				subject : args.mail.subject,
				message : args.mail.msg,
			},
			copy : {
				title          : args.copy.title,
				link           : args.copy.link,
				button         : '<i class="far fa-copy"></i>',
				successMessage : '<i class="fas fa-thumbs-up"></i>' + args.copy.successMessage,
			},
		},
	} )

}
