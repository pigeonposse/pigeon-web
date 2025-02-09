
import { createClient } from '@pigeonposse/api-client-2024'

import { capitalize } from '../utils/main'

import type Card               from '$lib/components/card/project.svelte'
import type { ApiDataRepo }    from './types'
import type { Config }         from '../../../bin/main'
import type { ComponentProps } from 'svelte'

import { dev }    from '$app/environment'
import { env }    from '$env/dynamic/public'
import { images } from '$lib/components/images'

const fetchData = async ( fetch: typeof window.fetch ) => {

	try {

		const client = createClient( {
			baseUrl : env.PUBLIC_API_URL,
			headers : { 'Content-Type': 'application/json' },
			fetch,
		} )

		const res = await client.GET( '/all' )

		if ( res.error ) throw new Error( res.error.message )
		else {

			if ( !res.data.github?.data ) throw new Error( 'Github data does not exists' )
			const key = Object.keys( res.data.github.data )[0]
			if ( !key ) throw new Error( `Github KEY ${key} data does not exists` )
			const data = res.data.github?.data[key]
			if ( !data.repo || !data.user ) throw new Error( `USER or REPO data does not exists` )
			return data as Required<typeof data>

		}

	}
	catch ( e ) {

		console.warn( 'Error getting api data', e )
		return undefined

	}

}

export type ApiData = Awaited<ReturnType<typeof fetchData>>
export type RepoFilteredValue = ComponentProps<typeof Card>
export type RepoFiltered = {
	all     : RepoFilteredValue[]
	noFeat  : RepoFilteredValue[]
	feat    : RepoFilteredValue[]
	general : RepoFilteredValue[]
	other   : RepoFilteredValue[]
} | undefined

export class Api {

	constructor( private fetch: typeof window.fetch ) {}

	readonly ID         = 'api-data'
	data : ApiData = undefined
	name = $derived( typeof this.data?.user?.name === 'string' ? this.data.user.name : 'PigeonPosse' )

	#repo : RepoFiltered = $state( undefined )
	repos = $derived( this.#repo )
	user = $derived( this.data?.user )

	filteredRepoValue : string = $state( '' )
	filteredRepos     :RepoFiltered = $derived.by( () => {

		const repos = this.repos
		if ( !repos ) return

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

		const resPromise = sortedItems.map( async repo => {

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
				tags      : [ content?.type || [], repo.tags || [] ].flat(),
				status    : content && content.status ? content.status : undefined,
			}

			return {
				feat    : repo.isPinned || false,
				general : content ? true : false,
				other   : isOther,
				value,
			}

		} )
		const res = await Promise.all( resPromise )

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
