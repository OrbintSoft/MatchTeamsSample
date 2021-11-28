export interface IAppSettings {
    get matchesRepositoryUrl(): string
    get matchesIndexedDbName(): string
    get matchesIndexedDbVersion(): number
    get teamsIndexedDbName(): string
    get teamsIndexedDbVersion(): number
}