//Scripts.js by Daniel McDonough and Surya Vadivazhagu


/*Setting a cookie session*/
var cookie = getCookieID();
var API_CALL = "http://api.ipstack.com/check?access_key=890a6742c955390a7e8678ce0f6bde5a"
//if cookie is null make one
var userid;
if(typeof cookie == undefined || cookie == ''){
  userid = makeid(); //make a random id
  //make an experation date
  var d = new Date();
  d.setTime(d.getTime() + (5*24*60*60*1000));
  var expires = d.toUTCString();
  document.cookie = "userid="+userid+", expires="+expires;
  cookie = getCookieID(document.cookie);
}

var referrer = document.referrer;
if(referrer==''){
  referrer = "Direct Link";
}
console.log(referrer);


var myVar = setInterval(myTimer, 1000);
var timespent = 0;
function myTimer() {
    timespent+=1000;
    console.log("You have been one this site for "+ timespent/1000 + " seconds");
}

console.log("My user ID is: "+ cookie);

var keylogger = []
document.onkeypress=function(e){
console.log(keylogger);    //do the required work;
keylogger.push(e.key);
}
//This function gets a cookie and sees returns the users session id
function getCookieID() {
    var id = "userid=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split('=');
    //console.log(ca[1]);
    return ca[1];
    //return "";//nocookie was set
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


var browser = function() {
    //detects what browser a user is on.
    if (browser.prototype._cachedResult)
        return browser.prototype._cachedResult;

    // Opera
    var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;

    // Firefox
    var isFirefox = typeof InstallTrigger !== 'undefined';

    // Safari
    var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || safari.pushNotification);

    // Internet Explorer
    var isIE = /*@cc_on!@*/false || !!document.documentMode;

    // Edge
    var isEdge = !isIE && !!window.StyleMedia;

    // Chrome
    var isChrome = !!window.chrome && !!window.chrome.webstore;

    // Blink engine detection
    var isBlink = (isChrome || isOpera) && !!window.CSS;

    return browser.prototype._cachedResult =
        isOpera ? 'Opera' :
        isFirefox ? 'Firefox' :
        isSafari ? 'Safari' :
        isChrome ? 'Chrome' :
        isIE ? 'IE' :
        isEdge ? 'Edge' :
        isBlink ? 'Blink' :
        "Don't know";
};

var buttonclicks = [];
//function that sets dynamic listeners
function setButtonListeners(){
  var buttons = document.getElementsByClassName("clickcounter");
  for(var i=0; i< buttons.length; i++) {
      buttons[i].addEventListener("click", bindClick(i));
      buttonclicks.push(0);
    }
}

  function bindClick(i) {
     return function(){
       buttonclicks[i]+=1;
              console.log("you clicked region number " + i + ",  "+ buttonclicks[i]+ " times! ");
              //console.log();
            };
  }

setButtonListeners();







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
                        },
                    ipstackResponse:

                        ipTrack()
                    ,
                    browser:
                    {
                        browser: browser()
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

var ipstackResponse;
    function ipTrack(){
    var responseArray = []
    fetch('http://api.ipstack.com/check?access_key=890a6742c955390a7e8678ce0f6bde5a')
  .then(res => res.json())
  .then(data => ipstackResponse = data)
  .then(() => responseArray.push(ipstackResponse))
  .then(() => console.log(ipstackResponse))
    return responseArray
    };


    console.log(jsonObj)



    window.onload = function() {


      //create a heatmap instance
      var heatmap = h337.create({
        container: document.getElementById('monster_container'),
        // maxOpacity: 0,
        // minOpacity:0,
        // gradient: { },
        radius: 10,
        blur: 0.9,
        // backgroundColor with alpha so you can see through it
        //backgroundColor: 'rgba(0, 0, 58, 1)'
      });
      var heatmapContainer = document.getElementById('monster_container');

      heatmapContainer.onmousemove = heatmapContainer.ontouchmove = function(e) {
        // we need preventDefault for the touchmove
        e.preventDefault();
        var x = e.layerX+document.body.scrollLeft;
        var y = e.layerY+document.body.scrollTop;
        if (e.touches) {
          x = e.touches[0].pageX+document.body.scrollLeft;
          y = e.touches[0].pageY+document.body.scrollTop;
        }

        heatmap.addData({ x: x, y: y, value: 1 });
        //mousedata.push({"xy":x+","+y,value:1+getvalue()});
        console.log(heatmap.getData());
      };


      var y = document.getElementsByClassName('heatmap-canvas');
      for(var i =0, il = y.length;i<il;i++){
        y[i].style.display = "none";
      }

    };
