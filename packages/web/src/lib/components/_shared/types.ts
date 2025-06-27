import type {
	Component,
	Snippet,
} from 'svelte'

export type RenderContentProps = {
	input? : string | Component | ( () => ReturnType<Snippet> )
	props? : object
}
