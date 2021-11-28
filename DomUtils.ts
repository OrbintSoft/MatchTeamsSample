export class DomUtils{
   static async getElementByIdAsync(id: string): Promise<HTMLElement>{
        let el = document.getElementById(id);
        if (!el){
            const promise = new Promise<void>((resolve, reject) => {
                window.addEventListener('load', (e) => {
                    resolve();
                });
            });
            await promise;
            el = document.getElementById(id);
        }
        return el;
    }
}