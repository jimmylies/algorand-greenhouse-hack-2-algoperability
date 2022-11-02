const algosdk = require('algosdk');

async function firstTransaction() {
    try {
        let myAccount = algosdk.mnemonicToSecretKey("movie check flavor ice plunge idea during process imitate guitar year taxi embody earth scatter hamster depend cigar planet sweet raven outer horror abandon pistol")

        // Connect your client
        const algodToken = '';
        const algodServer = 'https://testnet-api.algonode.cloud/';
        const algodPort = 0;
        let algodClient = new algosdk.Algodv2(algodToken, algodServer, algodPort);

        //Check your balance
        let accountInfo = await algodClient.accountInformation(myAccount.addr).do();
        console.log("Account balance: %d microAlgos", accountInfo.amount);

        // Construct the transaction
        let params = await algodClient.getTransactionParams().do();

        // receiver defined as TestNet faucet address
        const receiver = "HZ57J3K46JIJXILONBBZOHX6BKPXEM2VVXNRFSUED6DKFD5ZD24PMJ3MVA";
        const enc = new TextEncoder();
        const note = enc.encode("Hello");
        let amount = 100;
        let sender = myAccount.addr;
        let txn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
            from: sender,
            to: receiver,
            amount: amount,
            note: note,
            suggestedParams: params
        });

        // Sign the transaction
        let signedTxn = txn.signTxn(myAccount.sk);
        let txId = txn.txID().toString();
        console.log("Signed transaction with txID: %s", txId);

        // Submit the transaction
        await algodClient.sendRawTransaction(signedTxn).do();

        // Wait for confirmation
        let confirmedTxn = await algosdk.waitForConfirmation(algodClient, txId, 4);
        //Get the completed Transaction
        console.log("Transaction " + txId + " confirmed in round " + confirmedTxn["confirmed-round"]);
        let string = new TextDecoder().decode(confirmedTxn.txn.txn.note);
        console.log("Note field: ", string);
        accountInfo = await algodClient.accountInformation(myAccount.addr).do();
        console.log("Transaction Amount: %d microAlgos", confirmedTxn.txn.txn.amt);
        console.log("Transaction Fee: %d microAlgos", confirmedTxn.txn.txn.fee);

        console.log("Account balance: %d microAlgos", accountInfo.amount);
    } catch (err) {
        console.log("err", err);
    }
    process.exit?.(1);
};

export default firstTransaction;