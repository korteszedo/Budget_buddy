export declare function getBalanceByUserId(userId: number): Promise<any>;
export declare function getTransactionList(userId: number): Promise<any>;
export declare function updateTransactionForRole2(userId: number, transactionId: number, osszeg?: number, tipus?: string, datum?: string): Promise<any>;
export declare function deleteTransactionForRole2(userId: number, transactionId: number): Promise<any>;
export declare function getExpenseSumsByCategory(userId: number): Promise<any>;
export declare function getExpensesByCategory(userId: number): Promise<any>;
