import { ICrudRepository } from "./ICrudRepository.js";
import { IHtmlComponent } from "./IHtmlComponent.js";
import { IMatch } from "./IMatch.js";
import { ITeam } from "./ITeam.js";
import { Match } from "./Match.js";
import { Result } from "./Result.js";

export class MatchesNewFormComponent implements IHtmlComponent<AsyncIterable<IMatch>> {
    #matchesRepository: ICrudRepository<IMatch>
    #teamsRepository: ICrudRepository<ITeam>
    constructor(matchesRepository: ICrudRepository<IMatch>, teamsRepository: ICrudRepository<ITeam>){
        this.#matchesRepository = matchesRepository;
        this.#teamsRepository = teamsRepository;
    }

    async saveAsync(form: HTMLFormElement){
        const data = new FormData(form)
        const match = new Match();
        match.homeTeamId = Number(data.get('homeTeam'));
        match.awayTeamId = Number(data.get('awayTeam'));
        match.timestamp = new Date(data.get('datetime').toString()).getTime();
        match.result = new Result();
        match.result.home = Number(data.get('homeResult'));
        match.result.away = Number(data.get('awayResult'));
        this.#matchesRepository.createAsync(match);
    }

    async renderAsync(container: HTMLElement):Promise<void> {
        const allTeamsIterable = await this.#teamsRepository.getAllAsync();
        const allTeams = [] as {label: string, value: string}[];
        for await (const t of allTeamsIterable){
            allTeams.push({
                label: t.name,
                value: t.id.toString()
            });
        }
        const homeTeamFg = this.#createFormGroup(container);
        const homeTeamLb = this.#createLabel(homeTeamFg, 'Home Team', 'homeTeam');
        const homeTeamIn = this.#createSelect(homeTeamFg, 'homeTeam', allTeams);
        const awayTeamFg = this.#createFormGroup(container);
        const awayTeamLb = this.#createLabel(homeTeamFg, 'Away Team', 'awayTeam');
        const awayTeamIn = this.#createSelect(homeTeamFg, 'awayTeam', allTeams);
        const dateTimeTeamFg = this.#createFormGroup(container);
        const dateTimeTeamLb = this.#createLabel(dateTimeTeamFg, 'Date time', 'datetime');
        const dateTimeTeamIn = this.#createInput(dateTimeTeamFg, 'datetime-local', 'datetime');
        const homeResultFg = this.#createFormGroup(container);
        const homeResultTeamLb = this.#createLabel(homeResultFg, 'Home result', 'homeResult');
        const homeResultTeamIn = this.#createInput(homeResultFg, 'number', 'homeResult');
        const awayResultFg = this.#createFormGroup(container);
        const awayResultTeamLb = this.#createLabel(awayResultFg, 'Away result', 'awayResult');
        const awayResultTeamIn = this.#createInput(awayResultFg, 'number', 'awayResult');
    }


    #createFormGroup(container: HTMLElement, ):HTMLElement {
        const el = document.createElement('div');
        el.className = 'form-group';
        container.appendChild(el);
        return el;        
    }

    #createLabel(container: HTMLElement, label:string, forInput: string):HTMLElement {
        const el = document.createElement('label');
        el.setAttribute('for', forInput);
        el.innerText = label;
        container.appendChild(el);
        return el;        
    }

    #createInput(container: HTMLElement, type:string, name: string):HTMLElement {
        const el = document.createElement('input');
        el.className = 'form-control';
        el.setAttribute('type', type);
        el.name = name;
        container.appendChild(el);
        return el;        
    }

    #createSelect(container: HTMLElement, name:string, values: Iterable<{label: string, value: string}>):HTMLElement {
        const el = document.createElement('select');
        el.className = 'form-control';
        for (const v of values){
            const option = document.createElement('option');
            option.innerText = v.label;
            option.value = v.value;
            el.appendChild(option);
        }
        el.name = name;
        container.appendChild(el);
        return el;        
    }

    
}