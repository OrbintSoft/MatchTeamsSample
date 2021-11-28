import { ITeam } from "./ITeam.js";

export class Team implements ITeam{
    #id: number = null
    #uid: number = null
    #name: string|null = null
    #abbr: string|null = null

    get id(): number|null {
        return this.#id;
    }
    set id(value: number) {
        this.#id = value;
    }

    get uid(): number|null {
        return this.#uid;
    }
    set uid(value: number) {
        this.#uid = value;
    }

    get name(): string|null {
        return this.#name;
    }
    set name(value: string) {
        this.#name = value;
    }
    
    get abbr(): string|null {
        return this.#abbr;
    }
    set abbr(value: string) {
        this.#abbr = value;
    }
}