//analyze.js by Daniel Mcdonough & Surya Vadivazhagu


var copyofDB;//array of users
var user; //define a user
var thisuser_data;
var latitude;
var hostname;
var browser;
var longitude;
var city;
var ip;


//get the data of the user
function parseData(){
  function getTableinfo(){
    for(var i=0;i<copyofDB.length;i++){
      if(copyofDB[i].id == user){
       // console.log("USER ID: "+copyofDB[i].id+" IP: "+ copyofDB[i].ipstacktrace[0].ip  +" City: "+ copyofDB[i].ipstacktrace[0].city);
        thisuser_data = copyofDB[i];
       // console.log(copyofDB[i]);
        latitude = thisuser_data.ipstacktrace[0].latitude;
        longitude = thisuser_data.ipstacktrace[0].longitude;
        city = thisuser_data.ipstacktrace[0].city;
        hostname = thisuser_data.ipstacktrace[0].hostname;
        browser = thisuser_data.browser;
        ip = thisuser_data.ipstacktrace[0].ip;
        console.log(latitude, longitude, city, hostname, browser, ip);
        //document.write to the fields in dashboard.html
        document.getElementById("city").innerText = city;
        document.getElementById("hostname").innerText = hostname;
        document.getElementById("browser").innerText = browser;
        document.getElementById("ip").innerText = ip;
        break;
      }
    }
  }
  getTableinfo();
}


/*Setting a cookie session*/

checkCookie();
//check if cookie exists, set it if it doesnt
function checkCookie() {
   user = getCookie("userid");
    if (user != "") {
       // alert("Welcome again: " + user);
       console.log(user)
    } else {
        setCookie("userid", makeid(), 5);
    }
}

//set a cookie based of a random ID
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

//get a cookie
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

//makes a 12char id
function makeid() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 12; i++){
     text += possible.charAt(Math.floor(Math.random() * possible.length));
   }
  return text;
}

function getData(){

    var xml = new XMLHttpRequest();
    xml.open("POST", "/getIndexes");
    xml.onreadystatechange = handle_res_post;
    xml.send();
  }

  //Handle return data from get data
  function handle_res_post() {
    //console.log("TOuch handle_res");
    switch(this.readyState){
      case 1:
          console.log("Opened Query MSG");
          break;
      case 2:
          console.log("Reading Query HEADER");
          break;
      case 3:
          console.log("Loading Query Data");
          break;
      case 4:
          if (this.status == 200) {
            //console.log(this.responseText)
            var myArr = JSON.parse(this.responseText);
            console.log(myArr);
            copyofDB = (myArr.response);
          //  console.log(copyofDB)
            parseData();
            //CHECK IF response was an update response!
    }
  }
}

getData();


//
window.onload = function() {





}
