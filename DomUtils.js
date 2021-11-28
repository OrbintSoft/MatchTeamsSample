export class DomUtils {
    static async getElementByIdAsync(id) {
        let el = document.getElementById(id);
        if (!el) {
            const promise = new Promise((resolve, reject) => {
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
//# sourceMappingURL=DomUtils.js.map