/**
 * NO LINKS FUNCTIONABILITY (ONLY XHR REQUEST) .
 *
 *
 * This function transforms all html links <a> into sections <div>
 * Every time you click the divs an xhr request call is made to the corresponding url.
 *
 * Since    1.0.0
 * version  1.0.0.
 */ 
 
/**
 *
 */
export function dataURL(){
  
	var queryLinks, newQueryLinks, url

	// CHANGE LINKS <a href> TO <div data-href>
	/**
	 *
	 */
	function ChangeLinks(){

		queryLinks = document.querySelectorAll( 'a' )

		for ( var i = queryLinks.length - 1; i >= 0; i-- ) {

			var queryLink = queryLinks[i],
			 targetLink = queryLink.getAttribute( 'target' )

			if ( !targetLink || targetLink != 'blank' ){

				// get HREF Attribute
				url = queryLink.getAttribute( 'href' )

				// Get rest atributes
				var attributes = '',
				 attr       = queryLink.attributes

				// console.log(attr);

				for ( var key in attr ) {

					if ( typeof attr[key] != 'function' ){

						if( attr[key] != 'href' || attr[key] != 'undefined' ){

							attributes += attr[key].nodeName + '="' + attr[key].nodeValue + '" '
							// console.log( attr[key] );

						}

					}

				}
                
				queryLink.outerHTML = '<div data-href="' + url + '" ' + attributes + '>' + queryLink.innerHTML + '</div>' 

			}

		}

	}

	// SELECT <div data-href> AND DO A HTTP REQUEST FO EACH DIV
	/**
	 *
	 */
	function updateUrls(){

		newQueryLinks = document.querySelectorAll( 'div[data-href]' )

		for ( var i = 0; i < newQueryLinks.length; i++ ) {

			var newQueryLink = newQueryLinks[i],
			 newURL       = newQueryLinks[i].getAttribute( 'data-href' )

			newQueryLinks[i].addEventListener( 'click', function( e ){

				var target = e.target || e.srcElement,
				 newURL = target.getAttribute( 'data-href' )
				console.log( newURL )

				pigeon_request( {
					url          : newURL,
					method       : 'GET',
					async        : true,
					done         : pigeon_request_done,
					error        : pigeon_request_error,
					responseType : '',
				} )

			} )

		}

	}

	/**
	 *
	 */
	async function set(){

		await ChangeLinks()
		await updateUrls()

	}

}

/**
 * NO LINKS.
 *
 * Check that the url exists before and if it exists chage html link with a no link query.
 *
 * Since    1.0.0
 * version  1.0.0.
 *
 * @param query
 * @param tag
 * @param url
 */  
export function noLinks( 
	query, 
	tag, 
	url, 
) {
    
	if( url ){

		url = ' data-url="' + url + '" '
	
	}

	query.outerHTML = '<' + tag + url + '>' + query.innerHTML + '</' + tag + '>' 

}
