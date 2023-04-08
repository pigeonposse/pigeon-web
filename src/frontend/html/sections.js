/**
 * Todo.
 *
 * @description Todo.
 *
 * @version 1.0.0
 */

const sectionsData = ( api, utils )=>{
	
	let res
	
	res = []

	if ( !api.repos ) return false

	for ( const [ key, value ] of Object.entries( api.repos ) ) {

		let web = value.web

		for ( const values of web ) {
			
			let id, color, gradient, status, soon, desc, defaultImg
			
			id         = values.id ? values.id : key
			color      = values.color ? values.color : '#FFE300'
			gradient   = values.gradient ? values.gradient : [ color,'#3e3e3e' ]
			status     = values.status ? values.status : 'active'
			soon       = status == 'coming-soon' ? true : false
			desc       = values.description ? values.description : ''
			defaultImg = api.assets && api.assets.defaultLogoRepo ? api.assets.defaultLogoRepo : api.orgData.avatar_url
			
			if ( values.id !== 'pigeon-web' ) {

				res.push( {
					id         : id,
					img        : values.logo && values.logo !== 'false' ? values.logo : defaultImg,
					url        : values.homepage && values.homepage !== 'false' ? values.homepage : utils.location(),
					desc       : desc,
					title      : values.name ? values.name : id,
					color      : color,
					gradient   : gradient,
					comingSoon : soon,
				} )		
			
			}
		
		}

	} 
	
	return res

}

export const sections = ( data, utils ) => {

	let html, sections 
	html = ''
	
	sections = sectionsData( data, utils )
	if ( !sections ) return html
	sections.forEach( ( args ) => {

		html += `
      <div class="pigeon-archive-part ${args.comingSoon ? 'future' : ''}">
        <a href="${args.url}" target="_blank">
          ${args.comingSoon ? '<div class="cs-tag">Coming soon</div>' : ''}
          <div class="pigeon-archive-part-content">
            ${args.title ? `<h4 class="pigeon-archive-part-title">${args.title}</h4>` : ''}
            <div class="pigeon-archive-part-excerpt">${args.desc}
              <span class="learn-more">
                View more <i class="fa-solid fa-angle-right"></i>
              </span>
            </div>
          </div>
          <div class="pigeon-archive-part-img">
            ${args.img ? `<img loading="lazy" src="${args.img}" width="200px" onerror="this.src='${data.orgData.avatar_url}';">` : ''}
          </div>
        </a>
      </div>
    `
	
	} )

	return html

}
