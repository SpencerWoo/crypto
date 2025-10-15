export declare class Wallet {
    publicKey: string;
    privateKey: string;
    constructor();
    sendMoney(amount: number, payeePublicKey: string): void;
}
declare class Transaction {
    amount: number;
    payer: string;
    payee: string;
    constructor(amount: number, payer: string, // public key
    payee: string);
    toString(): string;
}
declare class Block {
    prevHash: string;
    transaction: Transaction;
    ts: number;
    nonce: number;
    constructor(prevHash: string, transaction: Transaction, ts?: number);
    get hash(): string;
}
export declare class Chain {
    static instance: Chain;
    chain: Block[];
    constructor();
    get lastBlock(): Block | undefined;
    mine(nonce: number): number;
    addBlock(transaction: Transaction, senderPublicKey: string, signature: Buffer): void;
}
export {};
//# sourceMappingURL=blockchain.d.ts.map