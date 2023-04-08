/**
 * Todo.
 *
 * @description Todo.
 *
 * @version 1.0.0
 */

const getFooterData = ( api ) => {

	let res = []

	Object.keys( api.social ).forEach( k => {

		let v = api.social[k]
		
		res.push( {
			id          : k,
			name        : '',
			url         : v.url,
			type        : 'url',
			iconClasses : ( k == 'email' ? 'fa-solid fa-envelope' : 'fa-brands' + ' fa-' + k ),
		} )
	
	} )

	return res.concat( [
		{
			id          : 'github',
			name        : '',
			type        : 'url',
			url         : api.orgData.url,
			iconClasses : 'fa-brands fa-github',
		},
		{
			id          : 'donate',
			name        : '',
			type        : 'popup',
			iconClasses : 'fa-solid fa-hand-holding-dollar',
		},
		{
			id          : 'share',
			name        : '',
			type        : 'popup',
			iconClasses : 'fa-solid fa-paper-plane',
		},
		{
			id          : 'more',
			name        : '',
			type        : 'popup',
			iconClasses : 'fa-solid fa-circle-info',
		},
	] )

}

const footerMsg = ( data ) => {
	
	let html, text, v 
	
	v = ( data.repos && data.repos['pigeon-web'] && data.repos['pigeon-web'].web[0] && data.repos['pigeon-web'].web[0].version ) ? data.repos['pigeon-web'].web[0].version : '1.0.0'
	v =  'v' + v
	
	html = ''
	text = [
		`With ♥️ by ${data.orgData.name}`,
		v, 
	]

	text.forEach( ( item ) => {

		html += `<div>${item}</div>`
		
	} )

	return html

}

export const footer = ( data ) => {
	
	let html, footerData
	
	html       = ''
	footerData = getFooterData( data )
	
	if ( footerData ) {

		html += '<ul>'

		footerData.forEach( ( item ) => {

			if ( item.type === 'popup' ) {

				html += `
          <li>
            <div data-open="${item.id}">
              ${item.name}
              ${item.iconClasses ? `<i class="${item.iconClasses}"></i>` : ''}
            </div>
          </li>
        `
			
			} else if ( item.type === 'url' ) {

				html += `
          <li>
            <a href="${item.url}" target="_blank">
              ${item.name}
              ${item.iconClasses ? `<i class="${item.iconClasses}"></i>` : ''}
            </a>
          </li>
        `
			
			}
		
		} )

		html += '</ul>'
	
	}
	
	html += footerMsg( data )

	return html

}
