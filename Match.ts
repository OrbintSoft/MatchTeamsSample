import { IMatch } from "./IMatch.js";
import { IResult } from "./IResult.js";
import { ITeam } from "./ITeam.js";

export class Match implements IMatch {
    #id: number = null
    #uid: number = null
    #homeTeam: ITeam|null = null
    #awayTeam: ITeam|null = null
    #homeTeamId: number|null = null
    #awayTeamId: number|null = null
    #timestamp: number|null = null
    #result: IResult|null = null

    get id() : number|null{
        return this.#id;
    }
    set id(value: number){
        this.#id = value;
    }

    get uid() : number|null{
        return this.#uid;
    }
    set uid(value: number){
        this.#uid = value;
    }

    get homeTeam(): ITeam|null {
        return this.#homeTeam;
    }
    set homeTeam(value: ITeam) {
        this.#homeTeam = value;
        this.#homeTeamId = value.id;
    }

    get awayTeam(): ITeam|null {
        return this.#awayTeam;
    }
    set awayTeam(value: ITeam) {
        this.#awayTeam = value;
        this.#awayTeamId = value.id;
    }

    get dateTime(): Date|null {
        return new Date(this.#timestamp);
    }
    set dateTime(value: Date) {
        this.#timestamp = value.getTime();
    }

    get timestamp(): number|null {
        return this.#timestamp;
    }
    set timestamp(value: number) {
        this.#timestamp = value;
    }

    get result(): IResult|null {
        return this.#result;
    }
    set result(value: IResult) {
        this.#result = value;
    }    

    get homeTeamId(): number|null {
        return this.#homeTeamId;
    }
    set homeTeamId(value: number) {
        this.#homeTeamId = value;
        if (this.#homeTeam && this.#homeTeam.id !== value){
            this.#homeTeam = null;
        }
    }

    get awayTeamId(): number {
        return this.#awayTeamId;
    }
    set awayTeamId(value: number) {
        this.#awayTeamId = value;
        if (this.#awayTeam && this.#awayTeam.id !== value){
            this.#awayTeam = null;
        }
    }
}