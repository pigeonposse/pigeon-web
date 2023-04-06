/**
 * Todo.
 *
 * @description Todo.
 *
 * @version 1.0.0
 */

export const header = ( data ) => {
	
	let html, menu 

	menu = `
	<ul>
 		<li>
		    <a href="/">Home</a>
		</li>
	
	    <li>
		    <div data-open="donate">Donate</div>
		</li>
	
	    <li>
		    <div data-open="about">About</div>
		</li>

	    <li>
		    <a href="${data.orgData.url}">
			    <i class="fa-brands fa-github"></i>
		    </a>
		</li>
	</ul>
	`
	
	html = ` 
<div class="logo">
	<a href="/">
		<img src="${data.orgData.avatar_url}" alt="${data.orgData.name}" height="80px">
	</a>
</div>
<div class="menu">
	${menu}
	<div class="responsive">
		<i class="fa-solid fa-bars"></i>
	</div>
</div>
	`

	return html 

}
	
