export interface IHtmlComponent<T> {    
    renderAsync(container: HTMLElement, data: T)
}