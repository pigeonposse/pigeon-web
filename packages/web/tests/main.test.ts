import {
	expect,
	test,
} from '@playwright/test'

test( 'about page has expected h1', async ( { page } ) => {

	await page.goto( '/es/about' )

	const h1 = page.locator( 'h1' )
	await expect( h1 ).toBeVisible()

} )

test( 'page exposes a skip link', async ( { page } ) => {

	await page.goto( '/en/about' )

	await expect( page.getByRole( 'link', { name: 'Skip to content' } ) ).toHaveCount( 1 )

} )

test( 'mobile navigation opens', async ( { page } ) => {

	await page.setViewportSize( {
		width  : 390,
		height : 844,
	} )
	await page.goto( '/en/about' )

	await page.getByRole( 'button', { name: 'Open navigation menu' } ).click()
	await expect( page.getByRole( 'dialog', { name: 'Navigation menu' } ) ).toBeVisible()

} )
