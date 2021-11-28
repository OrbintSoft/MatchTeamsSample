import { IResult } from "./IResult.js";

export class Result implements IResult{
    #home: number = 0
    #away: number = 0

    get home(): number {
        return this.#home;
    }
    set home(value: number) {
        this.#home = value;
    }
    get away(): number {
        return this.#away;
    }
    set away(value: number) {
        this.#away = value;
    }

}