import type CardMain                 from '$components/card/main.svelte'
import type { ApiDataRepo }          from '$core/api/types'
import type { ComponentProps }       from 'svelte'
import type { HTMLButtonAttributes } from 'svelte/elements'

type Parent = Pick<ComponentProps<typeof CardMain>, 'onclick'>
export type ProjectProps = Parent & Partial<Omit<HTMLButtonAttributes, 'type'>> & {
	href?               : string
	title               : string
	desc                : string
	img                 : string
	githubUrl?          : string
	webUrl?             : string
	docsUrl?            : string
	type?               : 'simple' | 'banner' | 'main'
	data                : ApiDataRepo
	status?             : string
	tags?               : string[] | string
	class?              : string
	viewTransitionName? : boolean
	onTagClick?         : ( n:string ) => Promise<void> | void
}
