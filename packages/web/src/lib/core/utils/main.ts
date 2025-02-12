export const capitalize = ( v: string ) => {

	if ( !v ) return ''
	return v.charAt( 0 ).toUpperCase() + v.slice( 1 )

}
export const setTitleFromID = ( text: string ): string => {

	if ( !text ) return ''
	const res = text.charAt( 0 ).toUpperCase() + text.slice( 1 ).toLowerCase()
	return res.replaceAll( '-', ' ' )

}

export const convertToRawGitHub = ( url: string ): string => {

	return url.replace(
		/https:\/\/github\.com\/([^\\/]+)\/([^\\/]+)/,
		'https://raw.githubusercontent.com/$1/$2/main/',
	)

}

export const joinURL = ( ...parts: string[] ): string => {

	if ( parts.length === 0 ) return ''

	const isFullURL      = /^https?:\/\//.test( parts[0] ) // Detecta si es una URL completa
	const isAbsolutePath = parts[0].startsWith( '/' ) // Detecta si es una ruta absoluta

	let url = parts
		.map( part => part.replace( /^\/+|\/+$/g, '' ) ) // Elimina barras iniciales y finales
		.filter( part => part.length > 0 ) // Filtra strings vacíos
		.join( '/' ) // Une con "/"

	// Mantiene la barra inicial si la primera parte era un path absoluto
	if ( isAbsolutePath && !isFullURL ) {

		url = '/' + url

	}

	return url

}

