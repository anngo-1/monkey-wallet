//get data and fill page

bal = document.getElementById("bal")
ctx = document.getElementById("volume").getContext('2d');
ctx2 = document.getElementById("income").getContext('2d');
ctx3 = document.getElementById("newcust").getContext('2d');
wame = document.getElementById("wame")
wid = document.getElementById("wid")
wid2 = document.getElementById("wid2")
walletbutton = document.getElementById("walletbutton")

walletbutton.onclick = function(){
  window.location.replace("https://monkeywallet.web.app/dashboard/home-dashboard.html");
}

lgb = document.getElementById("lgb")

const logout = async () => {
    try {
      console.log("Logging out");
      await auth0Client.logout({
        logoutParams: {
          returnTo: window.location.origin
        }
      });
    } catch (err) {
      console.log("Log out failed", err);
    }
  };
  
lgb.onclick = function(){
//   window.location.replace("https://monkeywallet.web.app/index.html");
    logout()
}

addw = document.getElementById("addw")

addw.onclick = function(){
  window.location.replace("https://monkeywallet.web.app/add-wallet/dashboard-add-wallet.html");
}


trans = document.getElementById("trans")
trans.onclick = function(){
  window.location.replace("https://monkeywallet.web.app/add-wallet/dashboard-add-wallet.html");
}

viewtransactions = document.getElementById("tran")
paygate = document.getElementById("paygate")

paygate.onclick = function(){
    window.location.replace("https://monkeywallet.web.app/paymentgate/wallet-payment-gateway.html");
}



var day = 0
var transactionvolume = 0
var income = 0

window.addEventListener('storage',function(e){
    if(e.storageArea===sessionStorage){
        
      addData(volume, 0, 0)
      addData(volume, 0, 2)
    } 
    // else, event is caused by an update to localStorage, ignore it
 });

var options = {
method: 'GET',
url: 'https://us-central1-monkeywallet.cloudfunctions.net/getData',
params: {email: sessionStorage.getItem("email"),
        },   
header: {"Access-Control-Allow-Origin": "*"}

};

axios.request(options).then(function (response) {

    wame.innerHTML = response.data.walletName

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




class TransactionChecker {
    constructor(address) {
        this.address = address.toLowerCase();
        this.web3 = new Web3(window.ethereum);
}

async checkBlock() {
    var transactionarray = []
    let block = await this.web3.eth.getBlock('latest');
    let number = block.number;
    let transactions = block.transactions;
    //console.log('Search Block: ' + transactions);

    if (block != null && block.transactions != null) {
        for (let txHash of block.transactions) {
            let tx = await this.web3.eth.getTransaction(txHash);
            if (this.address == tx.to.toLowerCase()) {
                transactionarray.push({sender:tx.from.toLowerCase(), receiver:tx.to.toLowerCase(), amount:Web3.utils.fromWei(tx.value, "ether")})
                
            }
        }
        let fullincome = 0
        for (var i = 0; i<transactionarray.length;i++){
            fullincome += transactionarray[i].amount
        }
        addData(volume, 0, 0)
        addData(volume, 0, transactionarray.length)
        addData(income, 0, 0)
        addData(income, 0, fullincome)
        addData(newcustomers, 0, 0)
        addData(newcustomers, 0, 1)
        sessionStorage.setItem("transactions", transactionarray)
    }
}
}

var transactionChecker = new  TransactionChecker(response.data.publicKey);
     transactionChecker.checkBlock();


viewtransactions.onclick = function(){
    window.location.replace("https://monkeywallet.web.app/transactions/wallet-transactions.html")
}





var volume = new Chart(ctx, {
    type:"line",
    data: {
      labels: day,
      datasets: [
        {
          label: "Transaction Volume",
          data: transactionvolume,
          backgroundColor: "white",
          borderColor: "green",
          borderWidth: 3,
          lineTension:  0.4,
        
        }
      ]
      
    
    }, //chart options 
            options: {
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                y: { //create ticks 
                  ticks: {
                    color: "black",
                     callback: function(value, index, values) {
                          return value;
                     }
                }
              },
                x: {
                  ticks: {
                         color: "black",
                         callback: function(value, index, values) {
                          return 'Day ' + index;
                     }
                  }
                }
          }
            }
   
  });

  var  newcustomers= new Chart(ctx3, {
    type:"line",
    data: {
      labels: day,
      datasets: [
        {
          label: "Customers",
          data: transactionvolume,
          backgroundColor: "grey",
          borderColor: "green",
          borderWidth: 3,
          lineTension:  0.4,
        
        }
      ]
      
    
    }, //chart options 
            options: {
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                y: { //create ticks 
                  ticks: {
                    color: "black",
                     callback: function(value, index, values) {
                        if (Math.floor(value) === value) {
                            return value;
                        }
                     }
                }
              },
                x: {
                  ticks: {
                        color: "black",
                         callback: function(value, index, values) {
                          return 'Day ' + index;
                     }
                  }
                }
          }
            }
   
  });

  var  income = new Chart(ctx2, {
    type:"line",
    data: {
      labels: day,
      datasets: [
        {
          label: "Income",
          data: transactionvolume,
    
          backgroundColor: "grey",
          borderColor: "green",
          borderWidth: 3,
          lineTension:  0.4,
        
        }
      ]
      
    
    }, //chart options 
            options: {
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                y: { //create ticks 
                  ticks: {
                    color: "black",
                     callback: function(value, index, values) {
                        if (Math.floor(value) === value) {
                            return value;
                        }
                     }
                }
              },
                x: {
                  ticks: {
                        color: "black",
                         callback: function(value, index, values) {
                          return 'Day ' + index;
                     }
                  }
                }
          }
            }
   
  });

//update graphs
  function addData(chart, label, data) {
    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset) => {
        dataset.data.push(data);
    });
    chart.update();
}










})
