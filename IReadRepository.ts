export interface IReadRepository<T>{
    getAllAsync(): Promise<AsyncIterable<T>>
}