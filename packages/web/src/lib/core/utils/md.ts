import { marked } from 'marked'

import type { HTMLAttributeAnchorTarget } from 'svelte/elements'

const renderer       = new marked.Renderer()
const HEADING_LEVELS = [
	1,
	2,
	3,
	4,
	5,
	6,
] as const
type HeadingLevel = ( typeof HEADING_LEVELS )[number]

type Props = {
	/**
	 * Change heading
	 * @default 1
	 */
	heading?         : HeadingLevel
	/**
	 * Change all anchor targets
	 */
	anchorTarget?    : HTMLAttributeAnchorTarget
	/** Change base of relative links */
	anchorHrefBase?  : string
	/** Change base of source image */
	imageSourceBase? : string
}

export const renderMarkdown = async ( content: string, opts?: Props ): Promise<string> => {

	if ( opts?.heading && HEADING_LEVELS.includes( opts.heading ) ) {

		renderer.heading = ( {
			tokens, depth,
		} ) => {

			const newLevel = depth < 6 ? depth + ( opts.heading as number - 1 ) : 6
			return `<h${newLevel}>${tokens.map( token => token.raw ).join( '' )}</h${newLevel}>`

		}

	}

	if ( opts?.anchorTarget ) {

		const linkRenderer = renderer.link
		renderer.link      = data => {

			const html = linkRenderer.call( renderer, data )
			return html.replace( /^<a /, '<a target="_blank"' )

		}

	}
	if ( opts?.anchorHrefBase ) {

		const linkRenderer = renderer.link
		renderer.link      = data => {

			const html = linkRenderer.call( renderer, data )
			return html.replace( /href="(?!http)([^"]+)"/g, `href="${opts.anchorHrefBase?.endsWith( '/' ) ? opts.anchorHrefBase : ( opts.anchorHrefBase + '/' )}$1"` )

		}

	}

	// Handle image source base
	if ( opts?.imageSourceBase ) {

		const imageRenderer = renderer.image
		renderer.image      = data => {

			data.href = data.href.startsWith( 'http' ) ? data.href : `${opts.imageSourceBase}${data.href}`
			return imageRenderer.call( renderer, data )

		}

	}
	return await marked( content, { renderer } )

}

