wame = document.getElementById("wame")
wid = document.getElementById("wid")
wid2 = document.getElementById("wid2")
bal = document.getElementById("bal")
viewtransactions = document.getElementById("tran")
viewtransactions.onclick = function(){
    window.location.replace("https://monkeywallet.web.app/transactions/wallet-transactions.html");
}

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


tran = document.getElementById("tran")
tran.onclick = function(){
  window.location.replace("https://monkeywallet.web.app/transactions/wallet-transactions.html");
}


var options = {
    method: 'GET',
    url: 'https://us-central1-monkeywallet.cloudfunctions.net/getData',
    params: {email: sessionStorage.getItem("email"),
            },   
    header: {"Access-Control-Allow-Origin": "*"}
    
    };
    
    axios.request(options).then(function (response) {
    
        wame.innerHTML = response.data.walletName + " - Payment Gateway"
    
    // get eth balance
      web3 = new Web3(window.ethereum);
      const promise1 = Promise.resolve(web3.eth.getBalance(response.data.publicKey))
            
      promise1.then((value) => {
        console.log("working")
        balance = Web3.utils.fromWei(value, "ether")
        bal.innerHTML = (balance) + " ETH"
      })
      const partOne = (response.data.publicKey).slice(0, (response.data.publicKey).length / 2)
      const partTwo = (response.data.publicKey).slice((response.data.publicKey).length/ 2, (response.data.publicKey).length)
        console.log(partOne)
        console.log(partTwo)
        wid.innerHTML = partOne
        wid2.innerHTML = partTwo
    
    
    }    )