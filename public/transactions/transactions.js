wame = document.getElementById("wame")
wid = document.getElementById("wid")
wid2 = document.getElementById("wid2")
bal = document.getElementById("bal")
transdata = document.getElementById("transdata")
walletbutton = document.getElementById("walletbutton")

walletbutton.onclick = function(){
    window.location.replace("https://monkeywallet.web.app/dashboard/home-dashboard.html");
}

lgb = document.getElementById("lgb")

lgb.onclick = function(){
  window.location.replace("https://monkeywallet.web.app/index.html");
}

addw = document.getElementById("addw")

addw.onclick = function(){
  window.location.replace("https://monkeywallet.web.app/add-wallet/dashboard-add-wallet.html");
}

var options = {
    method: 'GET',
    url: 'https://us-central1-monkeywallet.cloudfunctions.net/getData',
    params: {email: sessionStorage.getItem("email"),
            },   
    header: {"Access-Control-Allow-Origin": "*"}

};
gateway.onclick = function(){
    window.location.replace("https://monkeywallet.web.app/paymentgate/wallet-payment-gateway.html");
}
axios.request(options).then(function (response) {

    wame.innerHTML = response.data.walletName + " - Transactions"

    web3 = new Web3(window.ethereum) //instantiate web3

// get eth balance
  const promise1 = Promise.resolve(web3.eth.getBalance(response.data.publicKey))
        
  promise1.then((value) => {
    balance = Web3.utils.fromWei(value, "ether")
    bal.innerHTML = (balance) + " ETH"
  })


  const partOne = (response.data.publicKey).slice(0, (response.data.publicKey).length / 2)
  const partTwo = (response.data.publicKey).slice((response.data.publicKey).length/ 2, (response.data.publicKey).length)
    wid.innerHTML = partOne
    wid2.innerHTML = partTwo


    class TransactionChecker {
        constructor(address) {
            this.address = address.toLowerCase();
            this.web3 = new Web3(window.ethereum);
    }
    
    async checkBlock() {
        var transactionarray = []
        let x = await this.web3.eth.getBlock('latest');
        let number = x.number;
     
        //console.log('Search Block: ' + transactions);
        for (let i = number; i>=0;i--) {
            let block = await this.web3.eth.getBlock(i)
            if (block != null && block.transactions != null) {
                for (let txHash of block.transactions) {
                    let tx = await this.web3.eth.getTransaction(txHash);
                    console.log("looping")
                    if (this.address == tx.to.toLowerCase() || this.address == tx.from.toLowerCase()) {
                        console.log({sender:tx.from, receiver:tx.to, amount:Web3.utils.fromWei(tx.value, "ether")})
                        transactionarray.push({sender:tx.from, receiver:tx.to, amount:Web3.utils.fromWei(tx.value, "ether")});
                    }
                }
        }




            
            console.log(transactionarray)
            var transactionString = ""
            for (let i = 0; i<transactionarray.length;i++){
                if (transactionarray[i].sender == response.data.publicKey){
                    transactionarray[i].sender = "You"
                } else if (transactionarray[i].receiver == response.data.publicKey) {
                    transactionarray[i].receiver = "You"
                }

                transactionString+= ("Sender: " + transactionarray[i].sender + "\n" + "Receiver: " + transactionarray[i].receiver +   "\n" + "Amount: " +transactionarray[i].amount + " ether")
                transactionString+="\n\n\n\n"
            }
            
            transdata.innerHTML = transactionString
        }
    }
    }

    var transactionChecker = new  TransactionChecker(response.data.publicKey);
    transactionChecker.checkBlock();

  })





