/**
 * Todo.
 *
 * @description Todo.
 *
 * @version 1.0.0
 */

export const sections = async ( repos, utils )=>{
	
	let res
	
	res = []

	for ( const [ key, value ] of Object.entries( repos ) ) {

		let web = value.web

		for ( const values of web ) {
			
			let id, color, gradient, status, soon, imgExist, desc

			id       = values.id ? values.id : key
			color    = values.color ? values.color : '#FFE300'
			gradient = values.gradient ? values.gradient : [ color,'#3e3e3e' ]
			status   = values.status ? values.status : 'active'
			soon     = status == 'coming-soon' ? true : false
			imgExist = await utils.urlExists( values.logo )
			desc     = values.description ? values.description : ''

			res.push( {
				id         : id,
				img        : imgExist ? values.logo : false,
				url        : values.homepage ? values.homepage : 'https://pigeonposse.com',
				desc       : desc,
				title      : values.name ? values.name : id,
				color      : color,
				gradient   : gradient,
				comingSoon : soon,
			} )		
		
		}

	} 
	
	return res

}

