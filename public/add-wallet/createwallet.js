const walletName = document.getElementById("walletName")
const walletType = document.getElementById("walletType")
const walletCurrency = document.getElementById("Currency")
const walletOwners = document.getElementById("Co-Owners")
const submittext = document.getElementById("submittext")
const submit = document.getElementById("submit")
const pubfield = document.getElementById('publickeyfield')
const privfield = document.getElementById("privatekeyfield")
list = [walletName, walletCurrency, walletOwners, walletType]

walletbutton = document.getElementById("walletbutton")

walletbutton.onclick = function(){
    window.location.replace("https://monkeywallet.web.app/dashboard/home-dashboard.html");
}

lgb = document.getElementById("lgb")

lgb.onclick = function(){
  window.location.replace("https://monkeywallet.web.app/index.html");
}

submit.onclick = senddata
function redirect(){
    window.location.replace("https://monkeywallet.web.app/dashboard/home-dashboard.html");
} 
function senddata(){
    inputted = true
    for (var i = 0; i<list.length;i++){
        if (list[i].value == "") {
            inputted = false;
            alert("There is a missing field.")
            break;
        } 
    }

    if (inputted) {
    /*http request!
    */




        var options = {
            method: 'GET',
            url: 'https://us-central1-monkeywallet.cloudfunctions.net/sendData',
            params: {email: sessionStorage.getItem("email"),
                    walletName: walletName.value,
                    walletType: walletType.value,
                    walletOwners: walletOwners.value,
                    },   
            header: {"Access-Control-Allow-Origin": "*"}
        
        };
        
        axios.request(options).then(function (response) {
            console.log(response.data);
            pubfield.innerHTML = "Public Key: " + response.data.publickey
            privfield.innerHTML = "Private Key: " + response.data.privatekey
        
            submittext.innerHTML = "Finish"
            submit.onclick = redirect

        }).catch(function (error) {
            console.error(error);
        });
    


    
        }

    

}
 

