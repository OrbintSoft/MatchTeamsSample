import { IFilter } from "./IFilter.js";
import { IReadRepository } from "./IReadRepository.js";

export interface ICrudRepository<T> extends IReadRepository<T> {
    createAsync(entity: T): Promise<T>
    putAsync(entity: T): Promise<T>
    getByQueryAsync(filter: IFilter<T>): Promise<T|null>
    getAllFilteredAsync(filter: IFilter<T>): Promise<AsyncIterable<T>>
    deleteAsync(id: number): Promise<void>
}