
const add = document.getElementById("walletadd")
const temp = document.getElementById("template")
const wame = document.getElementById("walletname")
const desc = document.getElementById("walletdesc")
var hasaccount = false
const bal = document.getElementById("balance")

walletbutton = document.getElementById("walletbutton")

lgb = document.getElementById("lgb")

lgb.onclick = function(){
  window.location.replace("https://monkeywallet.web.app/index.html");
}

walletadd = document.getElementById("walletadd")

walletadd.onclick = function(){
  window.location.replace("https://monkeywallet.web.app/dashboard/home-dashboard.html");
}
/*get access token
*/
window.onload = function(){
  console.log(sessionStorage.getItem("email"))


  //get data
  var options = {
    method: 'GET',
    url: 'https://us-central1-monkeywallet.cloudfunctions.net/getData',
    params: {email: sessionStorage.getItem("email"),
            },   
    header: {"Access-Control-Allow-Origin": "*"}

};

axios.request(options).then(function (response) {
  if (Object.keys(response.data).length == 5) { // if there are 5 keys 
    hasaccount = true
    wame.innerHTML = response.data.walletName
    desc.innerHTML = response.data.walletOwners + "'s " + response.data.walletType + " wallet"
    template.style.display = "flex";

    // this if statement only runs if user has an account
    if (typeof window.ethereum !== 'undefined') {
      // Instance web3 with the provided information
      web3 = new Web3(window.ethereum);
    try {
      // Request account access
      window.ethereum.enable();
      
    } catch(e) {
      // User denied access
      console.log("User Denied access")
    }
  }

// get eth balance
  const promise1 = Promise.resolve(web3.eth.getBalance(response.data.publicKey))
        
  promise1.then((value) => {
    balance = Web3.utils.fromWei(value, "ether")
    bal.innerHTML = Math.round(balance) + " ETH"
  })


  }















}).catch(function (error) {
    console.error(error);
});


}




add.onclick = function(){
  window.location.replace("https://monkeywallet.web.app/add-wallet/dashboard-add-wallet.html");
}
const currentboxes = Array.from(document.getElementsByClassName('home-dashboard-wallet-template card'));

  currentboxes.forEach(cbox => {
    cbox.onclick = function() {
      window.location.replace("https://monkeywallet.web.app/wallet-dashboard/dashboard-wallet.html");
    }
  })
