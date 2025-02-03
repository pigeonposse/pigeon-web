import config                from '@pigeonposse/repo-config/unbuild'
import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig( [ config, { failOnWarn: false } ] )
