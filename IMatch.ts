import { IEntity } from "./IEntity.js";
import { IResult } from "./IResult.js";
import { ITeam } from "./ITeam.js";

export interface IMatch extends IEntity{
    get uid(): number|null
    set uid(value: number)

    get homeTeam(): ITeam|null
    set homeTeam(value: ITeam)

    get awayTeam(): ITeam|null
    set awayTeam(value: ITeam)

    get homeTeamId(): number|null
    set homeTeamId(value: number)

    get awayTeamId(): number|null
    set awayTeamId(value: number)

    get dateTime(): Date|null
    set dateTime(value: Date)

    get timestamp(): number|null
    set timestamp(value: number)

    get result(): IResult|null 
    set result(value: IResult)    
}