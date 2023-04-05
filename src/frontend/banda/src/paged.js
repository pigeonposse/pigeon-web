/**
 * PAGED .
 *
 * Class to create full pages styles faster and easier.
 *
 * Since    1.0.0
 * version  1.0.0.
 */  

const section = {}

section.constructor = ( sectionQuery, partQuery, btnQuery, goQuery ) => {
	
	var partBTNs = document.querySelectorAll( sectionQuery + ' ' + btnQuery )

	for ( var i = partBTNs.length - 1; i >= 0; i-- ) {

		partBTNs[i].addEventListener(
			'click', 
			function( event ){

				var partNum = event.currentTarget.closest( partQuery ).getAttribute( partQuery ),
				 partSelector = '[data-part="' + partNum + '"]',
				 part         = document.querySelector( partSelector ),

				 nextNum      = event.currentTarget.getAttribute( goQuery ),
				 nextSelector = '[data-part="' + nextNum + '"]',
				 nextPart     = document.querySelector( nextSelector )
                
				nextPart.setAttribute( 'data-mode', 'open' )
				part.setAttribute( 'data-mode', 'close' )

			},
			false,
		)
	
	}

}

section.set = () => {

	section.constructor( '[data-type="section"]','[data-part]', '[data-btn]', '[data-go]' )

	// var partBTNs = document.querySelectorAll( 'data-type="section"' );

	// for ( var i = partBTNs.length - 1; i >= 0; i-- ) {

	// 	partBTNs[i].addEventListener(
	// 		'click', 
	// 		function( event ){

	// 			var partNum                     = event.currentTarget.closest( '[data-part]' ).getAttribute( 'data-part' );
	// 			var partSelector                = '[data-part="'+partNum+'"]';
	// 			var part                        = document.querySelector( partSelector );

	// 			var nextNum                     = event.currentTarget.getAttribute( 'data-go' );
	// 			var nextSelector                = '[data-part="'+nextNum+'"]';
	// 			var nextPart                    = document.querySelector( nextSelector );
                
	// 			nextPart.setAttribute( 'data-mode', 'open' );
	// 			part.setAttribute( 'data-mode', 'close' );

	// 		},
	// 		false
	// 	);
	// }

}

section.get = function( 
	{
		queryID = '', 
		parts = [
			{
				content : '',
			},	
		],
	},
) {

	var sectionQuery = document.querySelector( queryID ),
	 html         = ''

	html += '<div data-type="section" >'

	for ( var i = parts.length - 1; i >= 0; i-- ) {

		var dataMode = ( i === 0 ) ? 'open' : 'close',
		 next     = ++i

		html += '<div data-part="' + i + '" data-mode="' + dataMode + '" >' +
			parts[i].content +
			'<div data-type="btn" data-go="' + next + '"></div>' +
		'</div>'

	}

	html += '</div>'

	sectionQuery.innerHTML = html

	section.set()

}

export default section
