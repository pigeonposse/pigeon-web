/**
 * Todo.
 *
 * @description Todo.
 */

import fs           from 'fs'
import { join }     from 'path'
import { pkg }      from './getPkg.js'
import { introMsg } from './introMsg.js'

const usageTxt = `
> For development you need to add a file ".env" with ${pkg.data.extra.envs.ghToken.name}=${pkg.data.extra.envs.ghToken.defaultValue}

### ⚙️ Usage

- [Docker image](https://hub.docker.com/r/pigeonposse/${pkg.data.name})
- [Using docker compose](/docker-compose.yml)

`

const defaultOrgs = `
## 👨‍💻 Development

You can contribute via **_Github_**.

[![Issues](https://img.shields.io/badge/Issues-grey?style=flat-square)](${pkg.data.repository.url}/issues)
[![Pull requests](https://img.shields.io/badge/Pulls-grey?style=flat-square)](${pkg.data.repository.url}/pulls)

## ☕ Donate

Help us to develop more interesting things.

[![Donate](https://img.shields.io/badge/Donate-grey?style=flat-square)](${pkg.data.funding.url}) 


## 📜 License

This software is licensed with ***[GPLv3](/LICENSE)***.

[![Read more](https://img.shields.io/badge/Read-more-grey?style=flat-square)](/LICENSE)

## 🐦 About us

_PigeonPosse_ is a ✨ **code development collective** ✨ focused on creating practical and interesting tools that help developers and users enjoy a more agile and comfortable experience. Our projects cover various programming sectors and we do not have a thematic limitation in terms of projects.

[![More](https://img.shields.io/badge/Read-more-grey?style=flat-square)](https://github.com/PigeonPosse/PigeonPosse)

### Collaborators

|                                                                                    | Name        | Role         | GitHub                                         |
| ---------------------------------------------------------------------------------- | ----------- | ------------ | ---------------------------------------------- |
| <img src="${pkg.data.author.url}.png?size=72" style="border-radius:100%"/> | ${pkg.data.author.name} |   Author   | [@${pkg.data.author.name}](${pkg.data.author.url}) |
| <img src="https://github.com/${pkg.data.extra.collective.name}.png?size=72" style="border-radius:100%"/> | ${pkg.data.extra.collective.name} | Collective	  | [@${pkg.data.extra.collective.name}](https://github.com/${pkg.data.extra.collective.name}) |


<br> 
`
const markTxt = `<!-- 
${introMsg()}
-->`

const addTextToMarkdownFile = ( filepath, startMarker, endMarker, textToAdd ) =>{

	const fileContent = fs.readFileSync( filepath, 'utf-8' )

	const startIndex = fileContent.indexOf( startMarker ) + startMarker.length
	const endIndex   = fileContent.indexOf( endMarker )

	const newTextContent = `${fileContent.substring( 0, startIndex )}\n${textToAdd}\n${fileContent.substring( endIndex )}`

	fs.writeFileSync( filepath, newTextContent )

}

export const dynamicReadme = () => {

	try{

		const readme = join( pkg.dir, 'README.md' )

		addTextToMarkdownFile( readme, '<!-- PIGEONPOSSE START MARK -->', '<!-- PIGEONPOSSE END MARK -->', markTxt )
		addTextToMarkdownFile( readme, '<!-- PIGEONPOSSE START USAGE -->', '<!-- PIGEONPOSSE END USAGE -->', usageTxt )
		addTextToMarkdownFile( readme, '<!-- PIGEONPOSSE START ORG -->', '<!-- PIGEONPOSSE END ORG -->', defaultOrgs )

	}catch( e ){

		console.error( e )

	}

}

