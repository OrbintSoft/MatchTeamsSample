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
var _TeamsIndexedDbRepository_instances, _TeamsIndexedDbRepository_version, _TeamsIndexedDbRepository_name, _TeamsIndexedDbRepository_database, _TeamsIndexedDbRepository_initialized, _TeamsIndexedDbRepository_isNewDb, _TeamsIndexedDbRepository_tableName, _TeamsIndexedDbRepository_mapRow, _TeamsIndexedDbRepository_getFilteredByCursor, _TeamsIndexedDbRepository_deleteTables, _TeamsIndexedDbRepository_createTables;
import { Team } from "./Team.js";
import { TransactionResolverUtility } from "./TransactionResolverUtility.js";
export class TeamsIndexedDbRepository {
    constructor(name, version) {
        _TeamsIndexedDbRepository_instances.add(this);
        _TeamsIndexedDbRepository_version.set(this, void 0);
        _TeamsIndexedDbRepository_name.set(this, void 0);
        _TeamsIndexedDbRepository_database.set(this, void 0);
        _TeamsIndexedDbRepository_initialized.set(this, false);
        _TeamsIndexedDbRepository_isNewDb.set(this, false);
        _TeamsIndexedDbRepository_tableName.set(this, 'teams');
        __classPrivateFieldSet(this, _TeamsIndexedDbRepository_name, name, "f");
        __classPrivateFieldSet(this, _TeamsIndexedDbRepository_version, version, "f");
    }
    get isNewDb() {
        return __classPrivateFieldGet(this, _TeamsIndexedDbRepository_isNewDb, "f");
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
                        const team = __classPrivateFieldGet(this, _TeamsIndexedDbRepository_instances, "m", _TeamsIndexedDbRepository_mapRow).call(this, row);
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
        return __classPrivateFieldGet(this, _TeamsIndexedDbRepository_instances, "m", _TeamsIndexedDbRepository_getFilteredByCursor).call(this, cursorRequest, filter);
    }
    async createAsync(entity, transaction) {
        const autoCommit = transaction ? false : true;
        transaction = transaction || this.getTransaction();
        const promise = new Promise((resolve, reject) => {
            const transaction = this.getTransaction();
            const objectStore = this.getObjectStore(transaction);
            const obj = {
                uid: entity.uid,
                abbr: entity.abbr,
                name: entity.name
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
        const trans = __classPrivateFieldGet(this, _TeamsIndexedDbRepository_database, "f").transaction([__classPrivateFieldGet(this, _TeamsIndexedDbRepository_tableName, "f")], "readwrite");
        return trans;
    }
    getObjectStore(transaction) {
        const objectStore = transaction.objectStore(__classPrivateFieldGet(this, _TeamsIndexedDbRepository_tableName, "f"));
        return objectStore;
    }
    async initializeAsync() {
        const self = this;
        if (__classPrivateFieldGet(this, _TeamsIndexedDbRepository_initialized, "f")) {
            throw Error('Already initialized');
        }
        const promise = new Promise((resolve, reject) => {
            const dBOpenRequest = window.indexedDB.open(__classPrivateFieldGet(this, _TeamsIndexedDbRepository_name, "f"), __classPrivateFieldGet(this, _TeamsIndexedDbRepository_version, "f"));
            dBOpenRequest.addEventListener('error', (e) => {
                reject(e);
            });
            dBOpenRequest.addEventListener('upgradeneeded', (e) => {
                __classPrivateFieldSet(self, _TeamsIndexedDbRepository_initialized, true, "f");
                __classPrivateFieldSet(self, _TeamsIndexedDbRepository_database, e.target.result, "f");
                __classPrivateFieldGet(self, _TeamsIndexedDbRepository_instances, "m", _TeamsIndexedDbRepository_deleteTables).call(self);
                __classPrivateFieldGet(self, _TeamsIndexedDbRepository_instances, "m", _TeamsIndexedDbRepository_createTables).call(self);
                resolve();
            });
            dBOpenRequest.addEventListener('success', (e) => {
                __classPrivateFieldSet(self, _TeamsIndexedDbRepository_initialized, true, "f");
                __classPrivateFieldSet(self, _TeamsIndexedDbRepository_database, e.target.result, "f");
                __classPrivateFieldGet(self, _TeamsIndexedDbRepository_instances, "m", _TeamsIndexedDbRepository_createTables).call(self);
                resolve();
            });
        });
        return promise;
    }
}
_TeamsIndexedDbRepository_version = new WeakMap(), _TeamsIndexedDbRepository_name = new WeakMap(), _TeamsIndexedDbRepository_database = new WeakMap(), _TeamsIndexedDbRepository_initialized = new WeakMap(), _TeamsIndexedDbRepository_isNewDb = new WeakMap(), _TeamsIndexedDbRepository_tableName = new WeakMap(), _TeamsIndexedDbRepository_instances = new WeakSet(), _TeamsIndexedDbRepository_mapRow = function _TeamsIndexedDbRepository_mapRow(row) {
    const team = new Team();
    team.id = row.id;
    team.uid = row.uid;
    team.name = row.name;
    team.abbr = row.abbr;
    return team;
}, _TeamsIndexedDbRepository_getFilteredByCursor = async function* _TeamsIndexedDbRepository_getFilteredByCursor(cursorRequest, filter) {
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
    while (cursor = await moveNext()) {
        const row = cursor.value;
        if (filter(row)) {
            const t = __classPrivateFieldGet(this, _TeamsIndexedDbRepository_instances, "m", _TeamsIndexedDbRepository_mapRow).call(this, row);
            yield t;
        }
    }
}, _TeamsIndexedDbRepository_deleteTables = function _TeamsIndexedDbRepository_deleteTables() {
    if (__classPrivateFieldGet(this, _TeamsIndexedDbRepository_database, "f").objectStoreNames.contains(__classPrivateFieldGet(this, _TeamsIndexedDbRepository_tableName, "f"))) {
        __classPrivateFieldGet(this, _TeamsIndexedDbRepository_database, "f").deleteObjectStore(__classPrivateFieldGet(this, _TeamsIndexedDbRepository_tableName, "f"));
    }
}, _TeamsIndexedDbRepository_createTables = function _TeamsIndexedDbRepository_createTables() {
    if (!__classPrivateFieldGet(this, _TeamsIndexedDbRepository_database, "f").objectStoreNames.contains(__classPrivateFieldGet(this, _TeamsIndexedDbRepository_tableName, "f"))) {
        __classPrivateFieldGet(this, _TeamsIndexedDbRepository_database, "f").createObjectStore(__classPrivateFieldGet(this, _TeamsIndexedDbRepository_tableName, "f"), {
            keyPath: 'id',
            autoIncrement: true
        });
        __classPrivateFieldSet(this, _TeamsIndexedDbRepository_isNewDb, true, "f");
    }
};
//# sourceMappingURL=TeamsIndexedDbRepository.js.map