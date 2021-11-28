import { IAppSettings } from "./IAppSettings.js";

export class AppSettings implements IAppSettings{
    #matchesRepositoryUrl: string
    #matchesIndexedDbName: string
    #matchesIndexedDbVersion: number
    #teamsIndexedDbName: string
    #teamsIndexedDbVersion: number
    
    get matchesRepositoryUrl(): string {
        return this.#matchesRepositoryUrl;
    }
    set matchesRepositoryUrl(value: string) {
        this.#matchesRepositoryUrl = value;
    }

    get matchesIndexedDbName(): string {
        return this.#matchesIndexedDbName;
    }
    set matchesIndexedDbName(value: string) {
        this.#matchesIndexedDbName = value;
    }

    get matchesIndexedDbVersion(): number {
        return this.#matchesIndexedDbVersion;
    }
    set matchesIndexedDbVersion(value: number) {
        this.#matchesIndexedDbVersion = value;
    }

    get teamsIndexedDbName(): string {
        return this.#teamsIndexedDbName;
    }
    set teamsIndexedDbName(value: string) {
        this.#teamsIndexedDbName = value;
    }

    get teamsIndexedDbVersion(): number {
        return this.#teamsIndexedDbVersion;
    }
    set teamsIndexedDbVersion(value: number) {
        this.#teamsIndexedDbVersion = value;
    }
}