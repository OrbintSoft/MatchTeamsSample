import { IAppSettings } from "./IAppSettings.js";
import { IAsyncInitializable } from "./IAsyncInitializable.js";
import { IMatchesReadRepository } from "./IMatchesReadRepository.js";
import { JsonMatchesMapper } from "./JsonMatchesMaper.js";
import { MatchesIndexedDbRepository } from "./MatchesIndexedDbRepository.js";
import { MatchesNewFormComponent } from "./MatchesNewFormComponent.js";
import { MatchesRestApiRepository } from "./MatchesRestApiRespository.js";
import { MatchesTableComponent } from "./MatchesTableComponent.js";
import { TeamsIndexedDbRepository } from "./TeamsIndexedDbRepository.js";

export class App implements IAsyncInitializable{
    #appSettings : IAppSettings
    #teamsIndexedDbRepository: TeamsIndexedDbRepository
    #matchesIndexedDbRepository: MatchesIndexedDbRepository
    #matchesFeedRepository: IMatchesReadRepository
    #matchesTableComponent: MatchesTableComponent
    #matchesNewFormComponent: MatchesNewFormComponent
    
    get matchesNewFormComponent(): MatchesNewFormComponent{
        return this.#matchesNewFormComponent;
    }

    get matchesTableComponent(): MatchesTableComponent{
        return this.#matchesTableComponent;
    }

    get matchesIndexedDbRepository(): MatchesIndexedDbRepository{
        return this.#matchesIndexedDbRepository;
    }
    
    constructor(appsettings: IAppSettings){
        this.#appSettings = appsettings;
    }

    loadServices(): void {
        this.#teamsIndexedDbRepository = new TeamsIndexedDbRepository(this.#appSettings.teamsIndexedDbName, this.#appSettings.teamsIndexedDbVersion);
        this.#matchesIndexedDbRepository = new MatchesIndexedDbRepository(this.#appSettings.matchesIndexedDbName, this.#appSettings.matchesIndexedDbVersion,  this.#teamsIndexedDbRepository); 
        this.#matchesFeedRepository = new MatchesRestApiRepository(this.#appSettings.matchesRepositoryUrl, new JsonMatchesMapper());
        this.#matchesTableComponent = new MatchesTableComponent(this.#matchesIndexedDbRepository);
        this.#matchesNewFormComponent = new MatchesNewFormComponent(this.#matchesIndexedDbRepository, this.#teamsIndexedDbRepository);
    }

    async initializeAsync(): Promise<void> {        
        await this.#teamsIndexedDbRepository.initializeAsync();
        await this.#matchesIndexedDbRepository.initializeAsync();
        await this.#seed();
    }

    async #seed() {
        if (this.#matchesIndexedDbRepository.isNewDb) {
            const matches = await this.#matchesFeedRepository.getAllAsync();
            for await (const m of matches) {
                await this.#matchesIndexedDbRepository.putAsync(m);
            }
        }
    }
} 