/**
 * GRID .
 *
 * Class to create grids faster and easier.
 *
 * Since    1.0.0
 * version  1.0.0.
 */  

/**
 *
 * @param query
 * @param itemClass
 * @param contentClass
 */
export function grid( query, itemClass, contentClass ) {

	var grid = document.querySelectorAll( query )[0]

	grid.classList.add( 'grid' )

	/**
	 *
	 * @param item
	 */
	function resizeGridItem( item ){

		grid      = document.querySelectorAll( query )[0]
		rowHeight = parseInt( window.getComputedStyle( grid ).getPropertyValue( 'grid-auto-rows' ) )
		rowGap    = parseInt( window.getComputedStyle( grid ).getPropertyValue( 'grid-row-gap' ) )
		rowSpan   = Math.ceil( ( item.querySelector( contentClass ).getBoundingClientRect().height + rowGap ) / ( rowHeight + rowGap ) )

		item.style.gridRowEnd = 'span ' + rowSpan

	}

	/**
	 *
	 */
	function resizeAllGridItems(){

		allItems = document.querySelectorAll( itemClass )

		for( var x = 0; x < allItems.length; x++ ){

			resizeGridItem( allItems[x] )

		}
        
	}

	/**
	 *
	 * @param instance
	 */
	function resizeInstance( instance ){

		item = instance.elements[0]
		resizeGridItem( item )

	}

	window.onload = resizeAllGridItems()
	window.addEventListener( 'resize', resizeAllGridItems )

	// allItems = document.querySelectorAll( itemClass );

	// for( x=0;x<allItems.length;x++ ){

	//     imagesLoaded( allItems[x], resizeInstance);

	// }

}

/**
 * PIGEON SECTIONS.
 *
 * Mostrar las 12 imagenes que estan almacenadas en el objeto js 
 * Que las imagenes mmoldeen su tamaño si la pantalla cambia de tamaño, desaparecen si la pantalla es menos de 900px
 * Ir cambiando las imagenes en base a un intervalo de tiempo.
 *
 * Since    1.0.0
 * version  1.0.0.
 *
 * @param query
 * @param objectType
 * @param objectContent
 * @param rows
 * @param columns
 * @param timeInterval
 * @param limitPx
 */
function ramdomPosts(
	query = '',
	objectType = 'post',
	objectContent = '',
	rows = '',
	columns = '',
	timeInterval = 5000,
	limitPx = 900,
) {

	var divQuery = query,
	 objectContent       = objectContent,
	 objectType          = objectType,
	 sectionDivsNumber   = columns * rows,
	 objectContentNumber = Object.keys( objectContent ).length

	/**
	 * Crear el div de la seción dependiendo del tipo de sección que sea.
	 *
	 * @param prop
	 * @param object
	 */
	function setSectionHTML( 
		prop = '', 
		object = {
			url        : '',
			iconClass  : '',
			title      : '',
			excerpt    : '',
			catTitle   : '',
			authorName : '',
			authorUrl  : '',
			authorImg  : '',

		},
	){
        
		var html

		if ( objectType == 'image' ){

			html = '<div data-type="' + prop + '"  data-id="' + prop + '" class="pigeon-rp-section pigeon-img-login" >'
                    + '<img src="' + object.url + '" class="pigeon-rp-div" >'
                + '</div>'

		}else if ( objectType == 'post' ) {

			html = '<div data-id="' + prop + '" class="pigeon-rp-section pigeon-meta" >'
                    + '<div class="pigeon-rp-div" >'
                        + '<div class="pigeon-rp-top" >'
                            + '<div class="pigeon-meta-title">'
                                + '<span class="' + object.iconClass + '"></span>'
                                + '<span class="pigeon-meta-subtitle">' + object.catTitle + '</span>'
                            + '</div>' 
                            + '<a class="pigeon-meta-link" href="' + object.url + '">' + object.title + '</a>'
                        + '</div>'    
                        + '<div class="pigeon-rp-middle" >'
                        + object.excerpt
                        + '</div>' 
                        + '<div  class="pigeon-rp-bottom" >'
                            + '<div class="pigeon-meta-author">'
                                + '<a href="' + object.authorUrl + '">'
                                    + '@' + object.authorName 
                                    + '<img src="' + object.authorImg + '" width="20px" height="20px">'
                                + '</a>'
                            + '</div>'
                        + '</div>'
                    + '</div>'
                + '</div>'

		}

		return html

	}

	/**
	 * Poner altura y anchura de cada sección.
	 */
	function setSectionSIZE() {

		var sections = document.querySelectorAll( '.pigeon-rp-section' ),
		 divs          = document.querySelectorAll( '.pigeon-rp-div' ),
		 sectionWidth  = divQuery.clientWidth, 
		 sectionHeight = divQuery.clientHeight, 
		 widthSection  = ( sectionWidth / columns ) - 40,
		 heightSection = ( sectionHeight / rows ) - 55

		for ( var i = sections.length - 1; i >= 0; i-- ) {

			sections[i].style.width  = widthSection + 'px'
			sections[i].style.height = heightSection + 'px'
			divs[i].style.height     = heightSection + 'px'

		}

	}

	/**
	 * Mostrar Divs de las imagenes .
	 */
	function displaySectionDivs(){

		var windowWidth = window.innerWidth

		// If the window is mayor than 'limitpx'
		if ( windowWidth > limitPx ) {
            
			// If is the first time
			if ( !divQuery.classList.contains( 'active' ) ) {
                
				// Set each Object div 
				for ( var prop in objectContent ) {

					// Stop set section divs when is all rows and columns are completed
					if ( prop < sectionDivsNumber ) {

						var backgroundSection = setSectionHTML( prop, objectContent[prop] )

						divQuery.innerHTML += backgroundSection

					}

				}

				divQuery.classList.add( 'active' )

			}

			// Set size of divs
			setSectionSIZE( )

		}else {

			// Remove DIVS
			divQuery.innerHTML = ''
			divQuery.classList.remove( 'active' )

		}

	}

	/**
	 * Cambiar imagenes.
	 */
	function intervalFunct() {
        
		// Verifica si existe la clase 'active' 
		// Verifica si el número de divs de la seccion es mayor que los divs del objeto 
		if ( 
			divQuery.classList.contains( 'active' ) && 
            sectionDivsNumber < objectContentNumber 
		) {

			var divSections = document.querySelectorAll( '.pigeon-rp-section' ),
			 divSectionArray = [],
			 objectArray     = []

			// Group in array all data id of displayed images
			for ( var i = divSections.length - 1; i >= 0; i-- ) {

				var atributeSection = divSections[i].getAttribute( 'data-id' )
				divSectionArray.push( atributeSection )

			}

			// Select ramdom id of data id array
			var randomDiv = Math.floor( Math.random() * divSectionArray.length ), 
			 randomDivValue = divSectionArray[randomDiv]
            
			// Group in array all keys of js object less ids of data-id array
			for ( var prop in objectContent ) {

				if( !divSectionArray.includes( prop ) ){

					objectArray.push( prop )
				
				}

			}

			// Select random id of object array 
			var randomObjArray = Math.floor( Math.random() * objectArray.length ), 
			 randomObjArrayValue = objectArray[randomObjArray],

				// Change div
			 backgroundSection   = setSectionHTML( randomObjArrayValue, objectContent[randomObjArrayValue] ),
			 querySelectorDiv    = 'div[data-id="' + randomDivValue + '"]',
			 divSection          = document.querySelector( querySelectorDiv )

			divSection.outerHTML = backgroundSection

			setSectionSIZE()

		}

	}

	/**
	 * Set functions.
	 */

	if( objectContent != '' && divQuery != '' ) {

		displaySectionDivs()
		window.addEventListener( 'resize', displaySectionDivs )
		setInterval( intervalFunct, timeInterval )
	
	}

}
