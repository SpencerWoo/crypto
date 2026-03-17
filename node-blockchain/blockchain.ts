// let crypto = require('crypto');
import * as crypto from 'crypto';

// Wallet gives a user a public/private keypair
export class Wallet {
  public publicKey: string;
  public privateKey: string;
  public amount: number;

  constructor(amount: number) {
    const keypair = crypto.generateKeyPairSync('rsa', {
      modulusLength: 2048,
      publicKeyEncoding: { type: 'spki', format: 'pem' },
      privateKeyEncoding: { type: 'pkcs8', format: 'pem' },
    });

    this.privateKey = keypair.privateKey;
    this.publicKey = keypair.publicKey;
    this.amount = amount
  }

  sendMoney(amount: number, payeePublicKey: string) {
    if (amount > this.amount) {
      return false;
    }

    const transaction = new Transaction(amount, this.publicKey, payeePublicKey);

    const sign = crypto.createSign('SHA256');
    sign.update(transaction.toString()).end();

    const signature = sign.sign(this.privateKey); 
    Chain.instance.addBlock(transaction, this.publicKey, signature);
    this.amount -= amount;


    return true;
  }


  // getMoney()
}


// Transfer of funds between two wallets
class Transaction {
  constructor(
    public amount: number, 
    public payer: string, // public key
    public payee: string // public key
  ) {}

  toString() {
    return JSON.stringify(this);
  }

  getAmount() {
    return this.amount;
  }

}

// Individual block on the chain
class Block {

  public nonce = Math.round(Math.random() * 999999999);

  constructor(
    public prevHash: string, 
    public transaction: Transaction, 
    public ts = Date.now()
  ) {}

  get hash() {
    const str = JSON.stringify(this);
    const hash = crypto.createHash('SHA256');
    hash.update(str).end();
    return hash.digest('hex');
  }
}

// The blockchain
export class Chain {
  // Singleton instance
  public static instance = new Chain();

  chain: Block[];

  constructor() {
    this.chain = [
      // Genesis block
      new Block('', new Transaction(100, 'genesis', 'satoshi'))
    ];
  }

  // Most recent block
  get lastBlock() {
    return this.chain[this.chain.length - 1];
  }

  validateTransaction(transaction: Transaction) {

  }

  /**
   * Calculates the total balance for a given public key (wallet address).
   */
  public getBalance(publicKey: string): number {
      let balance = 0;

      // Iterate through all blocks (excluding the Genesis block, 
      // which usually has a special/empty transaction)
      for (const block of this.chain) {
          // Iterate through all transactions in the block
          for (const t of block.data) {
              
              // NOTE: The 'Transaction' type should be used here,
              // but the Fireship tutorial uses 'data' as the Transaction object.
              
              // Funds SENT from this public key
              if (t.sender === publicKey) {
                  balance -= t.amount;
              }

              // Funds RECEIVED by this public key
              if (t.receiver === publicKey) {
                  balance += t.amount;
              }
          }
      }
      
      return balance;
  }

  // Proof of work system
  mine(nonce: number, transaction: Transaction) {
    let solution = 1;
    console.log('⛏️  mining...')

    while(true) {

      const hash = crypto.createHash('MD5');
      hash.update((nonce + solution).toString()).end();

      const attempt = hash.digest('hex');

      if(attempt.substr(0,4) === '0000'){
        console.log(`Solved: ${solution}`);

        // validate transaction

        return solution;
      }

      solution += 1;
    }
  }


  transfer()

  // Add a new block to the chain if valid signature & proof of work is complete
  addBlock(transaction: Transaction, senderPublicKey: string, signature: Buffer) {
    const verify = crypto.createVerify('SHA256');
    verify.update(transaction.toString());

    const isValid = verify.verify(senderPublicKey, signature);

    if (isValid) {
      // const newBlock = new Block(this.lastBlock?.hash ?? '0', transaction);
      const newBlock = new Block(this.lastBlock!.hash, transaction);
      this.mine(newBlock.nonce, transaction);
      this.chain.push(newBlock);
    }
  }

}