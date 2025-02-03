import { marked } from 'marked'

const renderer = new marked.Renderer()

renderer.heading = ( {
	tokens, depth,
} ) => {

	const newLevel = depth < 6 ? depth + 1 : 6
	return `<h${newLevel}>${tokens.map( token => token.raw ).join( '' )}</h${newLevel}>`

}

export const renderMarkdown = async ( content: string ): Promise<string> => {

	return await marked( content, { renderer } )

}

export const setTitleFromID = ( text: string ): string => {

	if ( !text ) return ''
	const res = text.charAt( 0 ).toUpperCase() + text.slice( 1 ).toLowerCase()
	return res.replaceAll( '-', ' ' )

}
