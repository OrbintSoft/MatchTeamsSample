import { IEntity } from "./IEntity.js";

export interface ITeam extends IEntity {
    get uid(): number|null
    set uid(value : number)
    
    get name(): string|null
    set name(value : string)

    get abbr(): string|null
    set abbr(value : string)
}