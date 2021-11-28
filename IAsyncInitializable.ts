export interface IAsyncInitializable {
    initializeAsync(): Promise<void>
}