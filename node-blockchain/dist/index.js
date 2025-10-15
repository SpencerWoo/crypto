// import * as crypto from 'crypto';
import { Chain, Wallet } from './blockchain.js';
// Example usage
const satoshi = new Wallet();
const bob = new Wallet();
const alice = new Wallet();
satoshi.sendMoney(50, bob.publicKey);
bob.sendMoney(23, alice.publicKey);
alice.sendMoney(5, bob.publicKey);
console.log(Chain.instance);
//# sourceMappingURL=index.js.map