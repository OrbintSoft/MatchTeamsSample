var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _App_instances, _App_appSettings, _App_teamsIndexedDbRepository, _App_matchesIndexedDbRepository, _App_matchesFeedRepository, _App_matchesTableComponent, _App_matchesNewFormComponent, _App_seed;
import { JsonMatchesMapper } from "./JsonMatchesMaper.js";
import { MatchesIndexedDbRepository } from "./MatchesIndexedDbRepository.js";
import { MatchesNewFormComponent } from "./MatchesNewFormComponent.js";
import { MatchesRestApiRepository } from "./MatchesRestApiRespository.js";
import { MatchesTableComponent } from "./MatchesTableComponent.js";
import { TeamsIndexedDbRepository } from "./TeamsIndexedDbRepository.js";
export class App {
    constructor(appsettings) {
        _App_instances.add(this);
        _App_appSettings.set(this, void 0);
        _App_teamsIndexedDbRepository.set(this, void 0);
        _App_matchesIndexedDbRepository.set(this, void 0);
        _App_matchesFeedRepository.set(this, void 0);
        _App_matchesTableComponent.set(this, void 0);
        _App_matchesNewFormComponent.set(this, void 0);
        __classPrivateFieldSet(this, _App_appSettings, appsettings, "f");
    }
    get matchesNewFormComponent() {
        return __classPrivateFieldGet(this, _App_matchesNewFormComponent, "f");
    }
    get matchesTableComponent() {
        return __classPrivateFieldGet(this, _App_matchesTableComponent, "f");
    }
    get matchesIndexedDbRepository() {
        return __classPrivateFieldGet(this, _App_matchesIndexedDbRepository, "f");
    }
    loadServices() {
        __classPrivateFieldSet(this, _App_teamsIndexedDbRepository, new TeamsIndexedDbRepository(__classPrivateFieldGet(this, _App_appSettings, "f").teamsIndexedDbName, __classPrivateFieldGet(this, _App_appSettings, "f").teamsIndexedDbVersion), "f");
        __classPrivateFieldSet(this, _App_matchesIndexedDbRepository, new MatchesIndexedDbRepository(__classPrivateFieldGet(this, _App_appSettings, "f").matchesIndexedDbName, __classPrivateFieldGet(this, _App_appSettings, "f").matchesIndexedDbVersion, __classPrivateFieldGet(this, _App_teamsIndexedDbRepository, "f")), "f");
        __classPrivateFieldSet(this, _App_matchesFeedRepository, new MatchesRestApiRepository(__classPrivateFieldGet(this, _App_appSettings, "f").matchesRepositoryUrl, new JsonMatchesMapper()), "f");
        __classPrivateFieldSet(this, _App_matchesTableComponent, new MatchesTableComponent(__classPrivateFieldGet(this, _App_matchesIndexedDbRepository, "f")), "f");
        __classPrivateFieldSet(this, _App_matchesNewFormComponent, new MatchesNewFormComponent(__classPrivateFieldGet(this, _App_matchesIndexedDbRepository, "f"), __classPrivateFieldGet(this, _App_teamsIndexedDbRepository, "f")), "f");
    }
    async initializeAsync() {
        await __classPrivateFieldGet(this, _App_teamsIndexedDbRepository, "f").initializeAsync();
        await __classPrivateFieldGet(this, _App_matchesIndexedDbRepository, "f").initializeAsync();
        await __classPrivateFieldGet(this, _App_instances, "m", _App_seed).call(this);
    }
}
_App_appSettings = new WeakMap(), _App_teamsIndexedDbRepository = new WeakMap(), _App_matchesIndexedDbRepository = new WeakMap(), _App_matchesFeedRepository = new WeakMap(), _App_matchesTableComponent = new WeakMap(), _App_matchesNewFormComponent = new WeakMap(), _App_instances = new WeakSet(), _App_seed = async function _App_seed() {
    if (__classPrivateFieldGet(this, _App_matchesIndexedDbRepository, "f").isNewDb) {
        const matches = await __classPrivateFieldGet(this, _App_matchesFeedRepository, "f").getAllAsync();
        for await (const m of matches) {
            await __classPrivateFieldGet(this, _App_matchesIndexedDbRepository, "f").putAsync(m);
        }
    }
};
//# sourceMappingURL=App.js.map