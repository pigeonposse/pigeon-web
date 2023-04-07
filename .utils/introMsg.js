/**
 * Todo.
 *
 * @description Todo.
 */

import { pkg } from './getPkg.js'

const data = pkg.data

export const introMsg = ( ) => {
	
	let collective, version, repoUrl, author, authorLink

	collective = data.extra.collective.name 
	author     = data.author.name 
	authorLink = data.author.url 
	repoUrl    = data.repository.url 
	version    = data.version ? data.version : 'UNDEFINDED'

	return `
██████╗ ██╗ ██████╗ ███████╗ ██████╗ ███╗   ██╗
██╔══██╗██║██╔════╝ ██╔════╝██╔═══██╗████╗  ██║
██████╔╝██║██║  ███╗█████╗  ██║   ██║██╔██╗ ██║ 
██╔═══╝ ██║██║   ██║██╔══╝  ██║   ██║██║╚██╗██║ 
██║     ██║╚██████╔╝███████╗╚██████╔╝██║ ╚████║ 
╚═╝     ╚═╝ ╚═════╝ ╚══════╝ ╚═════╝ ╚═╝  ╚═══╝ 
                                                
██████╗  ██████╗ ███████╗███████╗███████╗       
██╔══██╗██╔═══██╗██╔════╝██╔════╝██╔════╝       
██████╔╝██║   ██║███████╗███████╗█████╗         
██╔═══╝ ██║   ██║╚════██║╚════██║██╔══╝         
██║     ╚██████╔╝███████║███████║███████╗       
╚═╝      ╚═════╝ ╚══════╝╚══════╝╚══════╝       
                                                                                                                                                
█████╗█████╗█████╗█████╗█████╗█████╗█████╗█████╗
╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝╚════╝ 

██╗    ██╗███████╗██████╗                       
██║    ██║██╔════╝██╔══██╗                      
██║ █╗ ██║█████╗  ██████╔╝                      
██║███╗██║██╔══╝  ██╔══██╗                      
╚███╔███╔╝███████╗██████╔╝                      
 ╚══╝╚══╝ ╚══════╝╚═════╝                       
                                                
VERSION: ${version} 
AUTHOR: ${author} (${authorLink})
REPOSITORY: ${repoUrl}

DEVELOPED BY ${collective.toUpperCase()} 🐦🌈

` 

}

