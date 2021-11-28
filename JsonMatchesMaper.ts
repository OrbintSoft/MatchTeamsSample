import { IJsonMatchesMapper } from "./IJsonMatchesMapper.js";
import { IMatch } from "./IMatch.js";
import { ITeam } from "./ITeam.js";
import { Match } from "./Match.js";
import { Result } from "./Result.js";
import { Team } from "./Team.js";

export class JsonMatchesMapper implements IJsonMatchesMapper<string> {   

    #mapTeam(obj:any): ITeam|null{
        if (obj && typeof(obj.uid) === 'number'){
            const team = new Team();
            team.uid = obj.uid;
            if (typeof(obj.name) === 'string'){
                team.name = obj.name;
            }
            if (typeof(obj.abbr) === 'string'){
                team.abbr = obj.abbr;
            }
            return team;
        }
        return null;
    }

    map(responseJson: string): IMatch[] {
        const obj = JSON.parse(responseJson);
        const result = [];
        if (obj){
            const doc = obj.doc || []; 
            if (doc.length > 0){
                for (const event of doc){
                    if (event){
                        const data = event.data;
                        if (data) {
                            const matches = data.matches;
                            if (matches){
                                for (const p in matches){
                                    if (matches.hasOwnProperty(p)){
                                        const matchObj = matches[p];
                                        const uid = Number(p);
                                        if (!isNaN(uid) && matchObj){                                            
                                            const match = new Match();
                                            match.uid = uid;
                                            const time = matchObj.time;
                                            if (time && typeof(time.uts) === 'number'){
                                                const dateTime = new Date(time.uts * 1000);
                                                match.dateTime = dateTime;                                                
                                            }
                                            const resultObj = matchObj.result;
                                            if (resultObj){
                                                const result = new Result();
                                                if (typeof(resultObj.home) === 'number'){
                                                    result.home = resultObj.home;
                                                }
                                                if (typeof(resultObj.away) === 'number'){
                                                    result.away = resultObj.away;
                                                }
                                                match.result = result;
                                            }
                                            const teamsObj = matchObj.teams;
                                            if (teamsObj){
                                                const homeTeamObj = teamsObj.home;
                                                match.homeTeam = this.#mapTeam(homeTeamObj);
                                                const awayTeamObj = teamsObj.away;
                                                match.awayTeam = this.#mapTeam(awayTeamObj);
                                            }
                                            result.push(match);
                                        }                                        
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        return result;        
    }
}