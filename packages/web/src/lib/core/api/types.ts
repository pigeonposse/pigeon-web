import type { ApiData as ResData } from './main'

export type ApiData = NonNullable<ResData>
export type ApiDataRepo = NonNullable<NonNullable<ApiData>['repo']>[number]
export type ApiDataRepoContent = NonNullable<ApiDataRepo['content']>
export type ApiDataUser = NonNullable<NonNullable<ApiData>['user']>
export type ApiDataUserTeam = NonNullable<ApiDataUser['teams']>[number]
export type ApiDataUserMember = NonNullable<ApiDataUserTeam['members']>[number]
