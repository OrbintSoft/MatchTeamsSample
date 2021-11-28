export interface IFilter<T> {
    (el: T): boolean
}