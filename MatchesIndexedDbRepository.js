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
var _MatchesIndexedDbRepository_instances, _MatchesIndexedDbRepository_version, _MatchesIndexedDbRepository_name, _MatchesIndexedDbRepository_database, _MatchesIndexedDbRepository_initialized, _MatchesIndexedDbRepository_isNewDb, _MatchesIndexedDbRepository_tableName, _MatchesIndexedDbRepository_teamsRepository, _MatchesIndexedDbRepository_getFilteredByCursor, _MatchesIndexedDbRepository_mapRow, _MatchesIndexedDbRepository_deleteTables, _MatchesIndexedDbRepository_createTables;
import { Match } from "./Match.js";
import { Result } from "./Result.js";
import { TransactionResolverUtility } from "./TransactionResolverUtility.js";
export class MatchesIndexedDbRepository {
    constructor(name, version, teamsRepository) {
        _MatchesIndexedDbRepository_instances.add(this);
        _MatchesIndexedDbRepository_version.set(this, void 0);
        _MatchesIndexedDbRepository_name.set(this, void 0);
        _MatchesIndexedDbRepository_database.set(this, void 0);
        _MatchesIndexedDbRepository_initialized.set(this, false);
        _MatchesIndexedDbRepository_isNewDb.set(this, false);
        _MatchesIndexedDbRepository_tableName.set(this, 'matches');
        _MatchesIndexedDbRepository_teamsRepository.set(this, void 0);
        __classPrivateFieldSet(this, _MatchesIndexedDbRepository_name, name, "f");
        __classPrivateFieldSet(this, _MatchesIndexedDbRepository_version, version, "f");
        __classPrivateFieldSet(this, _MatchesIndexedDbRepository_teamsRepository, teamsRepository, "f");
    }
    get isNewDb() {
        return __classPrivateFieldGet(this, _MatchesIndexedDbRepository_isNewDb, "f");
    }
    async putAsync(entity, transaction) {
        const autoCommit = transaction ? false : true;
        transaction = transaction || this.getTransaction();
        if (entity.id) {
            const storedEntity = await this.getByQueryAsync((r) => r.id == entity.id);
            entity.uid = entity.uid || storedEntity.uid;
        }
        if (entity.uid) {
            const storedEntity = await this.getByQueryAsync((r) => r.uid == entity.uid);
            if (storedEntity) {
                entity.id = storedEntity.id;
            }
        }
        const result = await this.createAsync(entity, transaction);
        return TransactionResolverUtility.resolveTransaction(transaction, autoCommit, result);
    }
    getByQueryAsync(filter, transaction) {
        transaction = transaction || this.getTransaction();
        const objectStore = this.getObjectStore(transaction);
        const cursorRequest = objectStore.openCursor();
        const promise = new Promise((resolve, reject) => {
            cursorRequest.addEventListener('success', (e) => {
                const cursor = e.target.result;
                if (cursor) {
                    const row = cursor.value;
                    if (filter(cursor.value)) {
                        const team = __classPrivateFieldGet(this, _MatchesIndexedDbRepository_instances, "m", _MatchesIndexedDbRepository_mapRow).call(this, row);
                        return resolve(team);
                    }
                    cursor.continue();
                }
                else {
                    return resolve(null);
                }
            });
            cursorRequest.addEventListener('error', e => {
                reject(e);
            });
        });
        return promise;
    }
    async getAllFilteredAsync(filter, transaction) {
        transaction = transaction || this.getTransaction();
        const objectStore = this.getObjectStore(transaction);
        const cursorRequest = objectStore.openCursor();
        return __classPrivateFieldGet(this, _MatchesIndexedDbRepository_instances, "m", _MatchesIndexedDbRepository_getFilteredByCursor).call(this, cursorRequest, filter);
    }
    async createAsync(entity, transaction) {
        const autoCommit = transaction ? false : true;
        transaction = transaction || this.getTransaction();
        if (entity.awayTeam) {
            entity.awayTeam = await __classPrivateFieldGet(this, _MatchesIndexedDbRepository_teamsRepository, "f").putAsync(entity.awayTeam);
        }
        if (entity.homeTeam) {
            entity.homeTeam = await __classPrivateFieldGet(this, _MatchesIndexedDbRepository_teamsRepository, "f").putAsync(entity.homeTeam);
        }
        const promise = new Promise((resolve, reject) => {
            const transaction = this.getTransaction();
            const objectStore = this.getObjectStore(transaction);
            const obj = {
                uid: entity.uid,
                homeResult: entity.result.home,
                awayResult: entity.result.away,
                homeTeamId: entity.homeTeamId,
                awayTeamId: entity.awayTeamId,
                timestamp: entity.timestamp
            };
            if (entity.id) {
                obj.id = entity.id;
            }
            const putRequest = objectStore.put(obj);
            putRequest.addEventListener('success', (e) => {
                resolve(e.target.result);
            });
            putRequest.addEventListener('error', (e) => {
                reject(e);
            });
        });
        entity.id = await promise;
        return TransactionResolverUtility.resolveTransaction(transaction, autoCommit, entity);
    }
    async deleteAsync(id, transaction) {
        const autoCommit = transaction ? false : true;
        transaction = transaction || this.getTransaction();
        const promise = new Promise((resolve, reject) => {
            const transaction = this.getTransaction();
            const objectStore = this.getObjectStore(transaction);
            const deleteRequest = objectStore.delete(id);
            deleteRequest.addEventListener('success', (e) => {
                resolve();
            });
            deleteRequest.addEventListener('error', (e) => {
                reject(e);
            });
        });
        await promise;
        return TransactionResolverUtility.resolveTransaction(transaction, autoCommit, null);
    }
    getAllAsync() {
        return this.getAllFilteredAsync((el) => true);
    }
    getTransaction() {
        const trans = __classPrivateFieldGet(this, _MatchesIndexedDbRepository_database, "f").transaction([__classPrivateFieldGet(this, _MatchesIndexedDbRepository_tableName, "f")], "readwrite");
        return trans;
    }
    getObjectStore(transaction) {
        const objectStore = transaction.objectStore(__classPrivateFieldGet(this, _MatchesIndexedDbRepository_tableName, "f"));
        return objectStore;
    }
    async initializeAsync() {
        const self = this;
        if (__classPrivateFieldGet(this, _MatchesIndexedDbRepository_initialized, "f")) {
            throw Error('Already initialized');
        }
        const promise = new Promise((resolve, reject) => {
            const dBOpenRequest = window.indexedDB.open(__classPrivateFieldGet(this, _MatchesIndexedDbRepository_name, "f"), __classPrivateFieldGet(this, _MatchesIndexedDbRepository_version, "f"));
            dBOpenRequest.addEventListener('error', (e) => {
                reject(e);
            });
            dBOpenRequest.addEventListener('upgradeneeded', (e) => {
                __classPrivateFieldSet(self, _MatchesIndexedDbRepository_initialized, true, "f");
                __classPrivateFieldSet(self, _MatchesIndexedDbRepository_database, e.target.result, "f");
                __classPrivateFieldGet(self, _MatchesIndexedDbRepository_instances, "m", _MatchesIndexedDbRepository_deleteTables).call(self);
                __classPrivateFieldGet(self, _MatchesIndexedDbRepository_instances, "m", _MatchesIndexedDbRepository_createTables).call(self);
                resolve();
            });
            dBOpenRequest.addEventListener('success', (e) => {
                __classPrivateFieldSet(self, _MatchesIndexedDbRepository_initialized, true, "f");
                __classPrivateFieldSet(self, _MatchesIndexedDbRepository_database, e.target.result, "f");
                __classPrivateFieldGet(self, _MatchesIndexedDbRepository_instances, "m", _MatchesIndexedDbRepository_createTables).call(self);
                resolve();
            });
        });
        return promise;
    }
}
_MatchesIndexedDbRepository_version = new WeakMap(), _MatchesIndexedDbRepository_name = new WeakMap(), _MatchesIndexedDbRepository_database = new WeakMap(), _MatchesIndexedDbRepository_initialized = new WeakMap(), _MatchesIndexedDbRepository_isNewDb = new WeakMap(), _MatchesIndexedDbRepository_tableName = new WeakMap(), _MatchesIndexedDbRepository_teamsRepository = new WeakMap(), _MatchesIndexedDbRepository_instances = new WeakSet(), _MatchesIndexedDbRepository_getFilteredByCursor = async function* _MatchesIndexedDbRepository_getFilteredByCursor(cursorRequest, filter) {
    let res = null;
    let rej = null;
    let cursor = null;
    cursorRequest.addEventListener('success', (e) => {
        const cursor = e.target.result;
        res(cursor);
    });
    cursorRequest.addEventListener('error', e => {
        rej(e);
    });
    const moveNext = () => {
        return new Promise((resolve, reject) => {
            res = resolve;
            rej = reject;
            if (cursor) {
                cursor.continue();
                cursor = null;
            }
        });
    };
    const list = [];
    while (cursor = await moveNext()) {
        const row = cursor.value;
        if (filter(row)) {
            list.push(row); //TODO: this is incefficient workaround because indexedDb experies the transactions
        }
    }
    for (const r of list) {
        const m = await __classPrivateFieldGet(this, _MatchesIndexedDbRepository_instances, "m", _MatchesIndexedDbRepository_mapRow).call(this, r);
        yield m;
    }
}, _MatchesIndexedDbRepository_mapRow = async function _MatchesIndexedDbRepository_mapRow(row) {
    const match = new Match();
    match.id = row.id;
    match.uid = row.uid;
    match.timestamp = row.timestamp;
    match.result = new Result();
    match.result.home = row.homeResult;
    match.result.away = row.awayResult;
    const homeTeam = await __classPrivateFieldGet(this, _MatchesIndexedDbRepository_teamsRepository, "f").getByQueryAsync((el) => el.id === row.homeTeamId);
    match.homeTeam = homeTeam;
    const awayTeam = await __classPrivateFieldGet(this, _MatchesIndexedDbRepository_teamsRepository, "f").getByQueryAsync((el) => el.id === row.awayTeamId);
    match.awayTeam = awayTeam;
    return match;
}, _MatchesIndexedDbRepository_deleteTables = function _MatchesIndexedDbRepository_deleteTables() {
    if (__classPrivateFieldGet(this, _MatchesIndexedDbRepository_database, "f").objectStoreNames.contains(__classPrivateFieldGet(this, _MatchesIndexedDbRepository_tableName, "f"))) {
        __classPrivateFieldGet(this, _MatchesIndexedDbRepository_database, "f").deleteObjectStore(__classPrivateFieldGet(this, _MatchesIndexedDbRepository_tableName, "f"));
    }
}, _MatchesIndexedDbRepository_createTables = function _MatchesIndexedDbRepository_createTables() {
    if (!__classPrivateFieldGet(this, _MatchesIndexedDbRepository_database, "f").objectStoreNames.contains(__classPrivateFieldGet(this, _MatchesIndexedDbRepository_tableName, "f"))) {
        __classPrivateFieldGet(this, _MatchesIndexedDbRepository_database, "f").createObjectStore(__classPrivateFieldGet(this, _MatchesIndexedDbRepository_tableName, "f"), {
            keyPath: 'id',
            autoIncrement: true
        });
        __classPrivateFieldSet(this, _MatchesIndexedDbRepository_isNewDb, true, "f");
    }
};
//# sourceMappingURL=MatchesIndexedDbRepository.js.map