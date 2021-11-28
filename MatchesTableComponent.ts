import { ICrudRepository } from "./ICrudRepository.js";
import { IHtmlComponent } from "./IHtmlComponent.js";
import { IMatch } from "./IMatch.js";

export class MatchesTableComponent implements IHtmlComponent<AsyncIterable<IMatch>> {
    #matchesRepository: ICrudRepository<IMatch>
    constructor(matchesRepository: ICrudRepository<IMatch>){
        this.#matchesRepository = matchesRepository;
    }

    async renderAsync(container: HTMLElement, data: AsyncIterable<IMatch>):Promise<void> {
        const table = document.createElement('table');
        table.className = 'table';
        this.#createHeaders(table);
        await this.#createBody(table, data);
        container.appendChild(table);
    }


    #createHeaders(table: HTMLTableElement) {
        const thead = document.createElement('thead');
        table.appendChild(thead);
        const tr = document.createElement('tr');
        this.#createHeader('Id', tr);
        this.#createHeader('Match Teams', tr);
        this.#createHeader('Date', tr);
        this.#createHeader('Time', tr);
        this.#createHeader('Result', tr);
        this.#createHeader('Actions', tr);
        thead.appendChild(tr);
    }

    async #createBody(table: HTMLTableElement, list: AsyncIterable<IMatch>) {
        const tbody = document.createElement('tbody');
        table.appendChild(tbody);
        for await (let el of list){
            const tr = document.createElement('tr');
            this.#createValue((el.uid || el.id).toString(), tr);
            this.#createValue(`${el.homeTeam?.abbr} - ${el.awayTeam?.abbr}`, tr);
            this.#createValue(`${el.dateTime.getDay()}/${el.dateTime.getMonth()}/${el.dateTime.getFullYear()}`, tr);
            this.#createValue(`${el.dateTime.getHours()}:${el.dateTime.getMinutes()}`, tr);
            this.#createValue(`${el.result.home}:${el.result.away}`, tr);
            const actionTd = this.#createValue(``, tr);
            this.#createActione('Delete', actionTd, async () => {
                await this.#matchesRepository.deleteAsync(el.id);
                tr.remove();
            });
            tbody.appendChild(tr);
        }            
    }

    #createHeader(name: string, tr: HTMLTableRowElement) {
        const th = document.createElement('th');
        th.innerText = name;
        th.setAttribute('scope', 'col');
        tr.appendChild(th);
    }

    #createValue(value: string, tr: HTMLTableRowElement): HTMLElement {
        const td = document.createElement('td');
        td.innerText = value;
        tr.appendChild(td);
        return td;
    }

    #createActione(text: string, conntainer: HTMLElement, fn: Function): HTMLElement {
        const button = document.createElement('button');
        button.className = 'btn btn-danger';
        button.innerText = text;
        conntainer.appendChild(button);
        button.addEventListener('click', () => {
            fn();
        })
        return button;
    }
}