export class TransactionResolverUtility {
    static async resolveTransaction<Result>(transaction: IDBTransaction, autoCommit: boolean, result: Result):Promise<Result>{
        if (!autoCommit){
            return result; 
        } else {
            const promise = new Promise<Result>((resolve, reject) =>{
                transaction.addEventListener('complete', e => {
                    resolve(result);
                });
                transaction.addEventListener('abort',  e => {
                    reject(e);
                })
                transaction.addEventListener('error', e => {
                    reject(e);
                });
            });
            try{
                transaction.commit();
                await promise;
                return result;
            } catch(e){
                return result; //TODO: handle autocommit transactions
            }
        }
    }
}