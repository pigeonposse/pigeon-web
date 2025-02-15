import { convertToRawGitHub } from '$lib/core/utils/main'
import { renderMarkdown }     from '$lib/core/utils/md'

export async function load( {
	parent, params,
} ) {

	const d     = await parent()
	const posts = d.apiRepos?.general
	if ( !posts ) throw Error( 'Api repo data not found' )

	const index = posts.findIndex( post => post.data.id === params.slug )
	if ( index === -1 ) throw Error( 'No post found' )

	const post     = posts[index]
	const lastPost = posts[posts.length - 1]
	const fistPost = posts[0]
	const prevPost = index > 0 ? posts[index - 1] : lastPost
	const nextPost = index < posts.length - 1 ? posts[index + 1] : fistPost

	const readme = post.data.content?.readme.content
	if ( !readme ) throw Error( 'No readme post found' )

	return {
		post,
		prevPost,
		nextPost,
		postReadme : await renderMarkdown( readme, {
			anchorTarget    : '_blank',
			heading         : 1,
			imageSourceBase : post.githubUrl ? convertToRawGitHub( post.githubUrl ) : undefined,
		} ),
	}

}
