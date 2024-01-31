export interface Wallet {
    wallet: {
        _id: string;
        user: string;
        balance: number;
        operations: {
            type: string,
            amount: number,
            date: Date
        }[];
    }
}
  