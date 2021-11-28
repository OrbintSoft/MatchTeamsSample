import { App } from "./App.js";
import { AppSettings } from "./AppSettings.js";
import { DomUtils } from "./DomUtils.js";
const appsettings = new AppSettings();
appsettings.matchesRepositoryUrl = 'https://www.dontouch.ch/json/cc.json';
appsettings.matchesIndexedDbName = 'matches';
appsettings.matchesIndexedDbVersion = 1;
appsettings.teamsIndexedDbName = 'teams';
appsettings.teamsIndexedDbVersion = 1;
const app = new App(appsettings);
app.loadServices();
app.initializeAsync().then(async () => {
    const matchesTableContainer = await DomUtils.getElementByIdAsync('matchesContainerList');
    const addNewMatchForm = await DomUtils.getElementByIdAsync('addNewMatchForm');
    const saveMatchButton = await DomUtils.getElementByIdAsync('saveNewMatchButton');
    const matches = await app.matchesIndexedDbRepository.getAllAsync();
    await app.matchesTableComponent.renderAsync(matchesTableContainer, matches);
    await app.matchesNewFormComponent.renderAsync(addNewMatchForm);
    saveMatchButton.addEventListener('click', async () => {
        await app.matchesNewFormComponent.saveAsync(addNewMatchForm);
        const matches = await app.matchesIndexedDbRepository.getAllAsync();
        await app.matchesTableComponent.renderAsync(matchesTableContainer, matches);
    });
});
//# sourceMappingURL=Index.js.map