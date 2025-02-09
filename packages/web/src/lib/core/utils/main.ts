export const capitalize = ( v: string ) => {

	if ( !v ) return ''
	return v.charAt( 0 ).toUpperCase() + v.slice( 1 )

}
