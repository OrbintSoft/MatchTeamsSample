import { IAsyncInitializable } from "./IAsyncInitializable.js";
import { ICrudRepository } from "./ICrudRepository.js";
import { IFilter } from "./IFilter.js";
import { IMatch } from "./IMatch.js";
import { ITeam } from "./ITeam.js";
import { Match } from "./Match.js";
import { Result } from "./Result.js";
import { TransactionResolverUtility } from "./TransactionResolverUtility.js";

export class MatchesIndexedDbRepository implements IAsyncInitializable, ICrudRepository<IMatch> {
    #version: number
    #name: string
    #database: IDBDatabase
    #initialized: boolean = false
    #isNewDb : boolean = false;
    #tableName: string = 'matches';
    #teamsRepository: ICrudRepository<ITeam>

    get isNewDb(): boolean{
        return this.#isNewDb;
    }     

    constructor(name: string, version: number, teamsRepository: ICrudRepository<ITeam>) {
        this.#name = name;
        this.#version = version;
        this.#teamsRepository = teamsRepository;
    }
    
    async putAsync(entity: IMatch, transaction?: IDBTransaction): Promise<IMatch> {
        const autoCommit = transaction ? false : true;
        transaction = transaction || this.getTransaction();
        if (entity.id){
            const storedEntity = await this.getByQueryAsync((r) => r.id == entity.id);
            entity.uid = entity.uid || storedEntity.uid;         
        }
        if (entity.uid){
            const storedEntity = await this.getByQueryAsync((r) => r.uid == entity.uid);
            if (storedEntity){
                entity.id = storedEntity.id;         
            }                        
        }
        const result = await this.createAsync(entity, transaction);
        return TransactionResolverUtility.resolveTransaction(transaction, autoCommit, result);
    }

    getByQueryAsync(filter: IFilter<IMatch>, transaction?: IDBTransaction): Promise<IMatch|null> {
        transaction = transaction || this.getTransaction();
        const objectStore = this.getObjectStore(transaction);
        const cursorRequest = objectStore.openCursor();
        const promise = new Promise<IDBCursor|any>((resolve, reject) =>{
            cursorRequest.addEventListener('success', (e: any) => {
                const cursor = e.target.result; 
                if (cursor) {
                    const row = cursor.value as IMatch; 
                    if (filter(cursor.value)){
                        const team = this.#mapRow(row);
                        return resolve(team);
                    }
                    cursor.continue();
                } else {
                    return resolve(null);
                }
            });
            cursorRequest.addEventListener('error', e => {
                reject(e);
            });
        });
        return promise;        
    }

    async *#getFilteredByCursor(cursorRequest: any, filter: IFilter<IMatch>) {
        let res = null;
        let rej = null;
        let cursor = null;
        cursorRequest.addEventListener('success', (e: any) => {
            const cursor = e.target.result;
            res(cursor);
        });
        cursorRequest.addEventListener('error', e => {
            rej(e);
        });

        const moveNext = () => {
            return new Promise<IDBCursor|any>((resolve, reject) =>{
                res = resolve;
                rej = reject;
                if (cursor){
                    cursor.continue();
                    cursor = null;
                }
            }
        )}; 
        
        const list = [];
        while(cursor = await moveNext()){
            const row = cursor.value as IMatch;
            if (filter(row)) {
                list.push(row); //TODO: this is incefficient workaround because indexedDb experies the transactions
            }
        }
        for (const r of list){
            const m = await this.#mapRow(r);
            yield m;
        }
    }

    async getAllFilteredAsync(filter: IFilter<IMatch>, transaction?: IDBTransaction): Promise<AsyncIterable<IMatch>> {
        transaction = transaction || this.getTransaction();
        const objectStore = this.getObjectStore(transaction);
        const cursorRequest = objectStore.openCursor();
        return this.#getFilteredByCursor(cursorRequest, filter);
    }



    async #mapRow(row: any) : Promise<IMatch> {
        const match = new Match();
        match.id = row.id;
        match.uid = row.uid;   
        match.timestamp = row.timestamp;
        match.result = new Result();
        match.result.home = row.homeResult;
        match.result.away = row.awayResult;
        const homeTeam = await this.#teamsRepository.getByQueryAsync((el) => el.id === row.homeTeamId); 
        match.homeTeam = homeTeam;
        const awayTeam = await this.#teamsRepository.getByQueryAsync((el) => el.id === row.awayTeamId); 
        match.awayTeam = awayTeam;
        return match;
    }

    async createAsync(entity: IMatch, transaction?: IDBTransaction): Promise<IMatch> {
        const autoCommit = transaction ? false : true;
        transaction = transaction || this.getTransaction();

        if (entity.awayTeam){
            entity.awayTeam = await this.#teamsRepository.putAsync(entity.awayTeam);
        }
        if (entity.homeTeam){
            entity.homeTeam = await this.#teamsRepository.putAsync(entity.homeTeam);
        }

        const promise = new Promise<number>((resolve, reject) => {
            const transaction = this.getTransaction();
            const objectStore = this.getObjectStore(transaction);
            const obj = {                
                uid: entity.uid,
                homeResult: entity.result.home,
                awayResult: entity.result.away,                
                homeTeamId: entity.homeTeamId,
                awayTeamId: entity.awayTeamId,
                timestamp: entity.timestamp
            } as any;
            if (entity.id){
                obj.id = entity.id;
            }
            const putRequest = objectStore.put(obj) ;

            putRequest.addEventListener('success', (e: any) => {
                resolve(e.target.result);
            });
            putRequest.addEventListener('error', (e: any) => {
                reject(e);
            });           
        });
        entity.id = await promise;
        return TransactionResolverUtility.resolveTransaction(transaction, autoCommit, entity);      
    }

    async deleteAsync(id: number, transaction?: IDBTransaction): Promise<void> {
        const autoCommit = transaction ? false : true;
        transaction = transaction || this.getTransaction();
        const promise = new Promise<void>((resolve, reject) => {
            const transaction = this.getTransaction();
            const objectStore = this.getObjectStore(transaction);
            const deleteRequest = objectStore.delete(id);
            deleteRequest.addEventListener('success', (e: any) => {
                resolve();
            });
            deleteRequest.addEventListener('error', (e: any) => {
                reject(e);
            });
        });
        await promise;
        return TransactionResolverUtility.resolveTransaction(transaction, autoCommit, null);
    }

    getAllAsync(): Promise<AsyncIterable<IMatch>> {
        return this.getAllFilteredAsync((el) => true);
    }

   
    getTransaction() :IDBTransaction{
        const trans = this.#database.transaction([this.#tableName], "readwrite");
        return trans;
    }

    getObjectStore(transaction: IDBTransaction){
        const objectStore = transaction.objectStore(this.#tableName);
        return objectStore;
    }

    #deleteTables(){
        if (this.#database.objectStoreNames.contains(this.#tableName)) {
            this.#database.deleteObjectStore(this.#tableName);
        }
    }
    
    #createTables(){
        if (!this.#database.objectStoreNames.contains(this.#tableName)){
            this.#database.createObjectStore(this.#tableName, {
                keyPath: 'id',
                autoIncrement: true
            });
            this.#isNewDb = true;
        }        
    }

    async initializeAsync(): Promise<void> {
        const self = this;
        if (this.#initialized){
            throw Error('Already initialized');
        }

        const promise = new Promise<void>((resolve, reject) => {
            const dBOpenRequest = window.indexedDB.open(this.#name, this.#version);
            dBOpenRequest.addEventListener('error', (e) => {
                reject(e);
            });
            dBOpenRequest.addEventListener('upgradeneeded', (e: any) => {
                self.#initialized = true;
                self.#database = e.target.result;
                self.#deleteTables();
                self.#createTables();
                resolve();
            });
            dBOpenRequest.addEventListener('success', (e: any) => {
                self.#initialized = true;
                self.#database = e.target.result;
                self.#createTables();
                resolve();
            });
        });
        return promise;        
    }
} 