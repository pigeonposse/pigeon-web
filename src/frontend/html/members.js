/**
 * Todo.
 *
 * @description Todo.
 *
 * @version 1.0.0
 */

export const members = ( data ) => {
	
	let founders, html 

	html = ''
	
	if ( !data.members ) return html
	
	founders = data.members.find( d => d.slug === 'founders' )

	if ( !founders || !founders.members ) return html

	founders.members.forEach( value => {

		let web = !value.blog.startsWith( 'http://' ) && !value.blog.startsWith( 'https://' ) ? 'https://' + value.blog : value.blog
		
		html += ` 
		<a href="${web}">
			<span class="img">
			<img loading="lazy" src="${value.avatar}" alt="${value.login}">
			</span>
			<span class="title">${value.name}</span>
			<span class="info">Founder</span>
		</a>
		`
	
	} )

	return html 

}

