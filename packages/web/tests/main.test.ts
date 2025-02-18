import {
	expect,
	test,
} from '@playwright/test'

test( 'about page has expected h1', async ( { page } ) => {

	await page.goto( '/es/about' )

	const h1 = page.locator( 'h1' )
	await expect( h1 ).toBeVisible()

} )
