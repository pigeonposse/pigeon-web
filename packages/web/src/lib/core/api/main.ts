
import { createClient } from '@pigeonposse/api-client-2024'

import type Card               from '$lib/components/card/project.svelte'
import type { ApiDataRepo }    from './types'
import type { Config }         from '../../../bin/main'
import type { ComponentProps } from 'svelte'

import { dev }    from '$app/environment'
import { env }    from '$env/dynamic/public'
import { images } from '$lib/components/images'

const fetchData = async () => {

	try {

		const client = createClient( {
			baseUrl : env.PUBLIC_API_URL,
			headers : { 'Content-Type': 'application/json' },
		} )

		const res = await client.GET( '/all' )

		if ( res.error ) return { type: 'error' } as const

		else {

			if ( !res.data.github?.data ) return { type: 'error' } as const
			const data = res.data.github?.data[Object.keys( res.data.github.data )[0]]
			return {
				data : data,
				type : 'success',
			}

		}

	}
	catch ( e ) {

		console.warn( 'Unexpected error getting api data', e )
		return { type: 'error' } as const

	}

}

export type ApiData = Awaited<ReturnType<typeof fetchData>>['data']

export class Api {

	data     : ApiData
	response : 'error' | 'loading' | 'success' = 'loading'
	customData = env.PUBLIC_DATA

	async init() {

		if ( this.data ) return

		const res = await fetchData()

		if ( dev ) console.log( 'Dev info: ', {
			dev,
			PUBLIC_API_URL : env.PUBLIC_API_URL,
			PUBLIC_CONFIG  : env.PUBLIC_CONFIG,
			data           : res.data,
		} )

		if ( res.type === 'success' ) {

			this.response = 'success'
			this.data     = res.data as ApiData

		}
		else this.response = 'error'

	}

	protected sortItemsByUpdatedAt( items: ApiDataRepo[] ): ApiDataRepo[] | undefined {

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

	protected async checkImageExists( url: string ) {

		try {

			const response = await fetch( url, { method: 'HEAD' } )
			if ( response.ok ) {

				const contentType = response.headers.get( 'Content-Type' )
				const res         = contentType && contentType.startsWith( 'image/' )
				if ( typeof res === 'boolean' ) return res
				return false

			}
			else {

				return false

			}

		}
		catch ( _e ) {

			// console.error('Error checking image:', error);
			return false

		}

	}

	protected async map() {

		if ( !this.data || typeof this.data?.repo === 'undefined' || !Array.isArray( this.data?.repo ) ) return

		const sortedItems = this.sortItemsByUpdatedAt( this.data.repo )
		if ( !sortedItems ) return

		// @ts-ignore
		const resPromise = sortedItems.map( async repo => {

			const githubUrl = !repo.isPrivate ? repo.url : undefined
			const web       = repo.content?.config?.content?.web || undefined
			const content   = web ? web[Object.keys( web )[0]] : undefined
			const isOther   = (
				!content
				&& 'id' in repo && 'url' in repo && 'desc' in repo
				&& typeof repo.id === 'string' && typeof repo.url === 'string'  && typeof repo.desc === 'string'
			)

			const img = async () => {

				if ( !content || !content.logo ) return images.defaultImg

				const exist = await this.checkImageExists( content.logo )
				if ( exist && content.logo ) return content.logo

				return images.defaultImg

			}

			const value: ComponentProps<Card> = {
				type      : isOther ? 'simple' : 'main',
				data      : repo,
				title     : content && content.name ? content.name : repo.id,
				href      : repo.homepage || ( githubUrl || '/' ),
				desc      : repo.desc || '',
				githubUrl : githubUrl,
				webUrl    : content && content.homepage ? content.homepage : repo.homepage || undefined,
				docsUrl   : content && content.docs ? content.docs : undefined,
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

	async get() {

		try {

			if ( !this.data ) return
			this.response = 'loading'
			const res     = await this.map()
			this.response = 'success'
			return res

		}
		catch ( _e ) {

			this.response = 'error'
			return

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
