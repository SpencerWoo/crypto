// import * as crypto from 'crypto';
import { Chain, Wallet } from './blockchain.js'

// Example usage

const satoshi = new Wallet();
const bob = new Wallet();
const alice = new Wallet();

satoshi.sendMoney(50, bob.publicKey);
bob.sendMoney(23, alice.publicKey);
alice.sendMoney(5, bob.publicKey);

console.log(Chain.instance)



// const senderWallet = Wallet.instance; // The wallet used to sign
// const recipientAddress = walletB.publicKey;
// const amountToSend = 100;
// const chain = Chain.instance;

// // --- 🛑 BALANCE CHECK IMPLEMENTATION 🛑 ---

// // 1. Check the sender's current balance
// const senderBalance = chain.getBalance(senderWallet.publicKey);

// if (senderBalance < amountToSend) {
//     console.log(`❌ Transaction Failed: Sender (Wallet ${senderWallet.publicKey.slice(0, 4)}...) has insufficient funds.`);
//     console.log(`   Current Balance: ${senderBalance}, Attempted to send: ${amountToSend}`);
    
//     // IMPORTANT: Stop the process here!
// } else {
//     // 2. If funds are sufficient, create the transaction
//     const transaction = new Transaction(senderWallet.publicKey, recipientAddress, amountToSend);
    
//     // 3. Sign the transaction
//     transaction.sign(senderWallet.privateKey);

//     // 4. Add the block
//     chain.addBlock([transaction]);
//     console.log(`✅ Block added. New balance for sender: ${senderBalance - amountToSend}`);
// }