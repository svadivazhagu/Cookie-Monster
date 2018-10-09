/*Setting a cookie session*/
var cookie = getCookie();
//if cookie is null make one
var userid;
if(typeof cookie == undefined ){
  userid = makeid(); //make a random id
  //make an experation date
  var d = new Date();
  d.setTime(d.getTime() + (5*24*60*60*1000));
  var expires = d.toUTCString();
  document.cookie = "userid="+userid+"; expires="+expires+"; path=/; cookiename=cookiemonster";
}

console.log("My user ID is: "+ cookie);

//This function gets a cookie and sees returns the users session id
function getCookie() {
    var id = "userid=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(id) == 0) {
            return c.substring(id.length, c.length);
        }
    }
    return "";//nocookie was set
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




    var jsonObj = {
            userInfo:
                {
                    screenInfo:
                        {
                            width: (window.outerWidth),
                            height: (window.outerHeight)
                        },
                    locInfo:
                        {
                            latitude: "add this",
                            longitude: "add this2"
                        }
                }
    }

    function myFunction() {
        var w = window.outerWidth;
        var h = window.outerHeight;
        jsonObj.userInfo.screenInfo["width"] = JSON.parse(w)
        jsonObj.userInfo.screenInfo["height"] = JSON.parse(h)
    }


    var x = document.getElementById("loc");

    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            x.innerHTML = "Geolocation is not supported by this browser.";
        }
    }

    function showPosition(position) {
        jsonObj.userInfo.locInfo.latitude = JSON.parse(position.coords.latitude)
        jsonObj.userInfo.locInfo.longitude = JSON.parse(position.coords.longitude)
        // x.innerHTML = "Latitude: " + position.coords.latitude +
        // "<br>Longitude: " + position.coords.longitude;
    }

    console.log(jsonObj)
