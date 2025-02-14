/* eslint-disable @typescript-eslint/no-explicit-any */
const DATE_TYPE = {
	ASC  : 'asc',
	DESC : 'desc',
} as const

const STRING_TYPE = {
	ATOZ : 'atoz',
	ZTOA : 'ztoa',
} as const

const NUMBER_TYPE = {
	MIN : 'min',
	MAX : 'max',
} as const

export const SORT_TYPE = {
	DATE_ASC    : `date-${DATE_TYPE.ASC}`,
	DATE_DESC   : `date-${DATE_TYPE.DESC}`,
	STRING_ATOZ : `string-${STRING_TYPE.ATOZ}`,
	STRING_ZTOA : `string-${STRING_TYPE.ZTOA}`,
	NUMBER_MIN  : `number-${NUMBER_TYPE.MIN}`,
	NUMBER_MAX  : `number-${NUMBER_TYPE.MAX}`,
} as const

export type SortType = typeof SORT_TYPE[keyof typeof SORT_TYPE]

export type SortValue = Record<string, unknown>[]

type Any = any

const isProxy = ( obj: unknown ): boolean =>
	typeof obj === 'object' && obj !== null && ( obj as any )[Symbol.toStringTag] === 'Proxy'

const getNestedValue = ( obj: Any, key: string ): Any => {

	if ( isProxy( obj ) ) obj = { ...obj } // Clonamos si es Proxy para evitar errores
	return key.split( '.' ).reduce( ( acc, k ) => ( acc ? acc[k] : undefined ), obj )

}

export class Sort<V extends SortValue = SortValue> {

	constructor( public value: V ) {}

	private sortFunction = {
		[DATE_TYPE.ASC]    : ( a: any, b: any ) => new Date( a ).getTime() - new Date( b ).getTime(),
		[DATE_TYPE.DESC]   : ( a: any, b: any ) => new Date( b ).getTime() - new Date( a ).getTime(),
		[STRING_TYPE.ATOZ] : ( a: any, b: any ) => a.localeCompare( b ),
		[STRING_TYPE.ZTOA] : ( a: any, b: any ) => b.localeCompare( a ),
		[NUMBER_TYPE.MIN]  : ( a: any, b: any ) => a - b,
		[NUMBER_TYPE.MAX]  : ( a: any, b: any ) => b - a,
	}

	by( type: SortType, key: string ): V {

		const [ _, order ] = type.split( '-' ) as [string, keyof typeof this.sortFunction]
		if ( !this.sortFunction[order] ) return this.value

		this.value.sort( ( a, b ) => {

			const aK = getNestedValue( a, key )
			const bK = getNestedValue( b, key )

			if ( aK == null || bK == null ) return 0
			return this.sortFunction[order]( aK, bK )

		} )

		return this.value

	}

}
