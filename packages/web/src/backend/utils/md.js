/**
 * Todo.
 * @description Todo.
 * @version 1.0.0
 */

import showdown from 'showdown'

const converter = new showdown.Converter()
const toHtml    = text => converter.makeHtml( text )

export const md = { toHtml }
