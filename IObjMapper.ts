export interface IObjMapper<From, To> {
    map(obj: From): To
}