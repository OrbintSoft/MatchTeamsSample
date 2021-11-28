var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _AppSettings_matchesRepositoryUrl, _AppSettings_matchesIndexedDbName, _AppSettings_matchesIndexedDbVersion, _AppSettings_teamsIndexedDbName, _AppSettings_teamsIndexedDbVersion;
export class AppSettings {
    constructor() {
        _AppSettings_matchesRepositoryUrl.set(this, void 0);
        _AppSettings_matchesIndexedDbName.set(this, void 0);
        _AppSettings_matchesIndexedDbVersion.set(this, void 0);
        _AppSettings_teamsIndexedDbName.set(this, void 0);
        _AppSettings_teamsIndexedDbVersion.set(this, void 0);
    }
    get matchesRepositoryUrl() {
        return __classPrivateFieldGet(this, _AppSettings_matchesRepositoryUrl, "f");
    }
    set matchesRepositoryUrl(value) {
        __classPrivateFieldSet(this, _AppSettings_matchesRepositoryUrl, value, "f");
    }
    get matchesIndexedDbName() {
        return __classPrivateFieldGet(this, _AppSettings_matchesIndexedDbName, "f");
    }
    set matchesIndexedDbName(value) {
        __classPrivateFieldSet(this, _AppSettings_matchesIndexedDbName, value, "f");
    }
    get matchesIndexedDbVersion() {
        return __classPrivateFieldGet(this, _AppSettings_matchesIndexedDbVersion, "f");
    }
    set matchesIndexedDbVersion(value) {
        __classPrivateFieldSet(this, _AppSettings_matchesIndexedDbVersion, value, "f");
    }
    get teamsIndexedDbName() {
        return __classPrivateFieldGet(this, _AppSettings_teamsIndexedDbName, "f");
    }
    set teamsIndexedDbName(value) {
        __classPrivateFieldSet(this, _AppSettings_teamsIndexedDbName, value, "f");
    }
    get teamsIndexedDbVersion() {
        return __classPrivateFieldGet(this, _AppSettings_teamsIndexedDbVersion, "f");
    }
    set teamsIndexedDbVersion(value) {
        __classPrivateFieldSet(this, _AppSettings_teamsIndexedDbVersion, value, "f");
    }
}
_AppSettings_matchesRepositoryUrl = new WeakMap(), _AppSettings_matchesIndexedDbName = new WeakMap(), _AppSettings_matchesIndexedDbVersion = new WeakMap(), _AppSettings_teamsIndexedDbName = new WeakMap(), _AppSettings_teamsIndexedDbVersion = new WeakMap();
//# sourceMappingURL=AppSettings.js.map