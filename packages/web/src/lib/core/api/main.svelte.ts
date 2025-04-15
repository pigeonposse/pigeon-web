
import { fetchData }  from './get'
import { projects }   from '../../../_locales/es/common.json'
import { capitalize } from '../utils/main'

import type Card               from '$components/card/project.svelte'
import type { ApiDataRepo }    from './types'
import type { Config }         from '../../../bin/main'
import type { ComponentProps } from 'svelte'

import { dev }    from '$app/environment'
import { images } from '$components/images'
import { t }      from '$core/i18n/main'
import {
	Sort,
	SORT_TYPE,
} from '$core/utils/filter'
import { env } from '$env/dynamic/public'

export type ApiData = Awaited<ReturnType<typeof fetchData>>
export type RepoFilteredValue = ComponentProps<typeof Card>
export type RepoFiltered = {
	all     : RepoFilteredValue[]
	noFeat  : RepoFilteredValue[]
	feat    : RepoFilteredValue[]
	general : RepoFilteredValue[]
	other   : RepoFilteredValue[]
} | undefined

export const sortedTypes = {
	atoz         : 'atoz',
	ztoa         : 'ztoa',
	leastPop     : 'least-pop',
	mostPop      : 'most-pop',
	oldest       : 'oldest',
	newest       : 'newest',
	leastUpdated : 'least-updated',
	mostUpdated  : 'most-updated',
} as const

type Sorted = typeof sortedTypes[keyof typeof sortedTypes]

export class Api {

	constructor( private fetch: typeof window.fetch ) {}

	readonly ID         = 'api-data'
	data : ApiData = undefined

	user = $derived( this.data?.user )
	name = $derived( typeof this.data?.user?.name === 'string' ? this.data.user.name : 'pigeonposse' )

	#repo             : RepoFiltered = $state( undefined )
	repos             : RepoFiltered = $derived( this.#repo )
	sortedBy          : Sorted = $state( sortedTypes.newest )
	filteredRepoValue : string = $state( '' )
	filteredRepos     : RepoFiltered = $derived.by( () => {

		const repos = this.repos
		if ( !repos ) return
		const all = () => {

			const data = new Sort( repos.general )

			return this.sortedBy === sortedTypes.atoz
				? data.by( SORT_TYPE.STRING_ATOZ, 'title' )
				: this.sortedBy === sortedTypes.ztoa
					? data.by( SORT_TYPE.STRING_ZTOA, 'title' )
					: this.sortedBy === sortedTypes.leastPop
						? data.by( SORT_TYPE.NUMBER_MIN, 'data.stargazers' )
						: this.sortedBy === sortedTypes.mostPop
							? data.by( SORT_TYPE.NUMBER_MAX, 'data.stargazers' )
							: this.sortedBy === sortedTypes.newest
								? data.by( SORT_TYPE.DATE_DESC, 'data.createdAt' )
								: this.sortedBy === sortedTypes.oldest
									? data.by( SORT_TYPE.DATE_ASC, 'data.createdAt' )
									: this.sortedBy === sortedTypes.mostUpdated
										? data.by( SORT_TYPE.DATE_DESC, 'data.updatedAt' )
										: this.sortedBy === sortedTypes.leastUpdated
											? data.by( SORT_TYPE.DATE_ASC, 'data.updatedAt' )
											: repos.all

		}

		repos.general = all()

		const searchTerm = typeof this.filteredRepoValue === 'string'
			? this.filteredRepoValue.trim().toLowerCase()
			: undefined

		if ( !searchTerm || searchTerm === '' ) return repos

		const filterF = ( p: RepoFilteredValue ) => p.title.toLowerCase().includes( searchTerm )
			|| p.title.replace( ' ', '' ).toLowerCase().includes( searchTerm )
			|| p.desc.toLowerCase().includes( searchTerm )
			||  ( p.tags && Array.isArray( p.tags ) && p.tags.join( ' ' ).includes( searchTerm ) )
			|| ( p.status && Array.isArray( p.status ) && p.status.join( ' ' ).includes( searchTerm ) )

		return {
			...repos || {},
			general : repos.general.filter( p => filterF( p ) ),
			other   : repos.other.filter( p => filterF( p ) ),
		}

	} )

	tags = $derived.by( () => {

		const tagsArray = this.#repo?.all.filter( d => d.tags ).map( d => d.tags  )
		if ( !tagsArray ) return
		const tags = ( [ ...new Set( tagsArray.flat().filter( Boolean ) ) ] ) as string[]

		const actualTags = tags.filter( v => Object.keys( projects.tags ).includes( v ) )
		if ( !actualTags ) return

		return actualTags.map( v => ( {
			id   : v,
			name : t.get( 'common.projects.tags.' + v ) as string || v,
		} ) )

	} )

	async #getRepo( v:ApiData ) {

		try {

			if ( !v ) return
			const res = await this.#map()

			return res

		}
		catch ( _e ) {

			return undefined

		}

	}

	#getData( v:ApiData ) {

		if ( v?.repo && v.user ) return v
		return undefined

	}

	async get() {

		if ( this.data ) return this.data

		const storedData = window.sessionStorage.getItem( this.ID )

		if ( storedData ) {

			try {

				const res = JSON.parse( storedData )
				this.data =	this.#getData( res )

			}
			catch ( _e ) {

				console.warn( 'Error parsing stored API data:' )
				this.data = undefined

			}

		}
		else {

			const res = await fetchData( this.fetch )

			if ( res ) {

				this.data =	res
				sessionStorage.setItem( this.ID, JSON.stringify( this.data ) )

			}
			else this.data = undefined

		}

		if ( dev ) console.log( `Dev info (${storedData ? 'stored' : 'fetched'})`, {
			dev,
			env,
			data   : this.data,
			stored : storedData ? true : false,
		} )

		if ( this.data ) this.#repo = await this.#getRepo( this.data )
		else this.#repo = undefined

		return this.data

	}

	#sortItemsByUpdatedAt( items: ApiDataRepo[] ): ApiDataRepo[] | undefined {

		if ( !items ) return
		// @ts-ignore
		return items.sort( ( a, b ) => {

			if (
				!a || !b
				|| !( 'updated_at' in a )
				|| !( 'updated_at' in b )
				|| typeof b.updated_at !== 'string'
				|| typeof a.updated_at !== 'string'
			) return 0

			const dateA = new Date( a.updated_at )
			const dateB = new Date( b.updated_at )
			return dateB.getTime() - dateA.getTime()

		} )

	}

	async #checkImageExists( url: string ) {

		try {

			const response = await this.fetch( url, { method: 'HEAD' } )

			if ( response.ok ) {

				const contentType = response.headers.get( 'Content-Type' )
				const res         = contentType && contentType.startsWith( 'image/' )

				if ( typeof res === 'boolean' ) return res
				return false

			}
			else return false

		}
		catch ( _e ) {

			return false

		}

	}

	async #map(): Promise<RepoFiltered> {

		if ( !this.data || typeof this.data?.repo === 'undefined' || !Array.isArray( this.data?.repo ) ) return

		const sortedItems = this.#sortItemsByUpdatedAt( this.data.repo )

		if ( !sortedItems ) return
		const filtered = sortedItems.filter( d => {

			try {

				// @ts-ignore
				return d.content?.package.content?.extra?.config !== false

			}
			catch ( _e ) {

				return true

			}

		} )
		// console.log( { filtered } )
		const resPromise = filtered
			.map( async repo => {

				const githubUrl = !repo.isPrivate ? repo.url : undefined
				const web       = repo.content?.config?.content?.web || undefined
				const content   = web ? web[Object.keys( web )[0]] : undefined
				const isOther   = (
					!content
					&& 'id' in repo && 'url' in repo && 'desc' in repo
					&& typeof repo.id === 'string' && typeof repo.url === 'string'  && typeof repo.desc === 'string'
				)

				const img                      = async () => {

					if ( !content ) return images.defaultImg

					if ( content?.logo && await this.#checkImageExists( content.logo ) )
						return content.logo

					if ( repo.content?.logo?.url && await this.#checkImageExists( repo.content.logo.url ) )
						return repo.content.logo.url

					return images.defaultImg

				}
				const docsUrl                  = content?.docs || undefined
				const webUrl                   = content?.homepage || repo.homepage || undefined
				const tags                     = Array.from(
					new Set(
						[ content?.type || [], repo.tags || [] ]
							.flat()
							.filter( v => Object.keys( projects.tags ).includes( v ) ),
					),
				)
				const value: RepoFilteredValue = {
					type      : isOther ? 'simple' : 'main',
					data      : repo,
					title     : capitalize( content && content.name ? content.name : repo.id ),
					desc      : content?.desc || repo.desc || '',
					href      : webUrl || githubUrl || docsUrl || '/',
					githubUrl : githubUrl,
					webUrl    : webUrl,
					docsUrl   : docsUrl,
					img       : await img(),
					tags,
					status    : content && content.status ? content.status : undefined,
				}

				return {
					feat    : repo.isPinned || false,
					general : content ? true : false,
					other   : isOther,
					value,
				}

			} )
		const res = ( await Promise.all( resPromise ) )

		return {
			all     : res.map( i => i.value ),
			noFeat  : res.filter( i => !i.feat ).map( i => i.value ),
			feat    : res.filter( i => i.feat ).map( i => i.value ),
			general : res.filter( i => i.general ).map( i => i.value ),
			other   : res.filter( i => i.other ).map( i => i.value ),
		}

	}

	getConfig() {

		if ( !env.PUBLIC_CONFIG ) return
		try {

			return JSON.parse( env.PUBLIC_CONFIG ) as Config

		}
		catch ( _e ) {

			return

		}

	}

}
