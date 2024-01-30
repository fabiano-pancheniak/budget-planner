/*export interface Wallet {
    wallet: {
        _id: string,
        user: string,
        balance: number,
        incomes: [{
            amount: number,
            date: Date,
            _id: string
        }],
        expenses: [{
            amount: number,
            date: Date,
            _id: string
        }]
    }     
}
*/

export interface Wallet {
    wallet: {
        _id: string;
        user: string;
        balance: number;
        incomes: Income[];
        expenses: Expense[];
    }
}
  
export interface Income {
    amount: number;
    date: string;
    _id: string;
}
  
export interface Expense {
    amount: number;
    date: string;
    _id: string;
}
