import { IJsonMatchesMapper } from "./IJsonMatchesMapper.js";
import { IMatch } from "./IMatch.js";
import { IMatchesReadRepository } from "./IMatchesReadRepository.js";
import { Match } from "./Match.js";

export class MatchesRestApiRepository implements IMatchesReadRepository{
    #apiUrl: string;
    #jsonToMatchesMapper: IJsonMatchesMapper<string>
    constructor(apiUrl : string, jsonToMatchesMapper: IJsonMatchesMapper<string>){
        this.#apiUrl = apiUrl;
        this.#jsonToMatchesMapper = jsonToMatchesMapper;
    }
    
    async getAllAsync(): Promise<AsyncIterable<IMatch>> {
        const response = await fetch(this.#apiUrl);
        if (response.status === 200){
            const responseJson = await response.text();            
            const matches = this.#jsonToMatchesMapper.map(responseJson);
            return this.#getMatches(matches);                    
        } else {
            throw Error('Unable to fetch data');
        }
    }

    async *#getMatches(matches: Iterable<IMatch>): AsyncIterable<IMatch>{
        for (const m of matches){
            yield m
        }  
    }
}