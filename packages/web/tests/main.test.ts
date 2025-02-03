import {
	expect,
	test,
} from '@playwright/test'

test( 'about page has expected h1', async ( { page } ) => {

	await page.goto( '/es/about' )

	await expect( page.getByRole( 'heading', {
		name  : 'Temporal Server Error',
		level : 1,
	} ) ).toBeVisible( { timeout: 5000 } ) // Se da más tiempo si la carga es lenta

} )
