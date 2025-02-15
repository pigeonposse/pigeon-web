type Routes = { [k in string]: { params?: Record<string, string> } }

export const routesID = {
	home     : {},
	projects : { params : {
		search : 's',
		sort   : 'sort',
	} },
	about      : {},
	contribute : {},
	sponsors   : {},
	policy     : {},
	contact    : {},
} as const satisfies Routes
