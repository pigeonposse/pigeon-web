import type { routesID } from './const'

type RouteValue = typeof routesID [keyof typeof routesID]

export type RouteID = keyof typeof routesID
export type RouteCons<Key extends string, V extends RouteValue> = {
	id     : Key
	path   : string
	name   : string
	child  : ( v:string ) => string
	params : V extends { params: Record<string, string> }
		? { [key in keyof V['params']]: {
			id   : string
			path : ( v?:string ) => string
		} }
		: undefined
}
export type Routes = { [key in keyof typeof routesID] : RouteCons<key, typeof routesID[key]> }
export type Route = Routes[keyof Routes]
