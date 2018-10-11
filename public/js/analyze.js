//analyze.js by Daniel Mcdonough & Surya Vadivazhagu





//
window.onload = function() {
  var copyofDB;//array of users
  var user; //define a user cookie
  var thisuser_data; //the index of the user data
  checkCookie();
  //get the data of the user
  function parseData(){
    function getTableinfo(){
      for(var i=0;i<copyofDB.length;i++){
        if(copyofDB[i].id == user){
          console.log("USER ID: "+copyofDB[i].id+" IP: "+ copyofDB[i].ipstacktrace[0].ip  +" City: "+ copyofDB[i].ipstacktrace[0].city);
          thisuser_data = i;

            console.log(thisuser_data)
          //console.log(thisuser_data)
          break;
        }
      }

    }
    getTableinfo();
    console.log(thisuser_data)
  }




  /*Setting a cookie session*/


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

  function getsidebardata(){
    console.log(thisuser_data)
    document.getElementById("loc").innerHTML= "<i class='fa fa-map-marker mr-3'></i>"+copyofDB[thisuser_data].ipstacktrace[0].city;
    document.getElementById("browser").innerHTML= "  <i class='fa fa-chrome mr-3'></i>"+ copyofDB[thisuser_data].browser
  document.getElementById("host").innerHTML= "<i class='fa fa-desktop mr-3'></i>"+copyofDB[thisuser_data].ipstacktrace[0].hostname;
    document.getElementById("ip").innerHTML= "<i class='fa fa-user mr-3'></i>"+copyofDB[thisuser_data].ipstacktrace[0].ip;
  }
  getsidebardata();

}
