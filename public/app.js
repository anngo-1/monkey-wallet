
auth0.createAuth0Client({
  domain: "dev-5vqonws1hu6hwakc.us.auth0.com",
  clientId: "jtDMMBFaCX1oKOTMlWByC2SZxnLEb0sz",
  authorizationParams: {
    redirect_uri: window.location.origin
  }
  
  
}).then(async (auth0Client) => {

  const loginButton = document.getElementById("login");
  const loginText = document.getElementById("logintext")
  const continueButton = document.getElementById("continue")
  function loginRedirect(){
    auth0Client.loginWithRedirect();
  }
  loginButton.onclick = loginRedirect
  


  if (location.search.includes("state=") && 
      (location.search.includes("code=") || 
      location.search.includes("error="))) {
    await auth0Client.handleRedirectCallback();
    window.history.replaceState({}, document.title, "/");
  }


  const isAuthenticated = await auth0Client.isAuthenticated();
  const userProfile = await auth0Client.getUser();
  
  if (isAuthenticated) {
    loginButton.onclick = function(){
      location.href = "/dashboard/home-dashboard.html"
    }
    console.log(userProfile)
    sessionStorage.setItem("email", userProfile.email)
    if (userProfile.given_name == undefined){
      loginText.innerHTML = "Welcome, " + userProfile.nickname;
    }
    loginText.innerHTML = "Welcome, " + userProfile.given_name
 
    


    /*http request!
    */
    var options = {
      method: 'POST',
      url: 'https://us-central1-monkeywallet.cloudfunctions.net/createAccount',
      params: {email: userProfile.email},   
      header: {"Access-Control-Allow-Origin": "*"}
   
    };
    
    axios.request(options).then(function (response) {
      console.log(response.data);
    }).catch(function (error) {
      console.error(error);
    });


  }
 
  
});