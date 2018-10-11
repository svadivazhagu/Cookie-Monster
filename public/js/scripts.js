//Scripts.js by Daniel McDonough and Surya Vadivazhagu

/*
Six-Pack Based Script

  Store a cookie/sessionID

  IP & Network Info

  Track Browser & Windo information

  Track Refferers

  Track Keystrokes & Mouse movements

  Button Clicks

*/

//ON DOCUMENT READY...


/*Setting a cookie session*/
var user; //define a user
checkCookie();
//check if cookie exists, set it if it doesnt
function checkCookie() {
   user = getCookie("userid");
    if (user != "") {
       // alert("Welcome again: " + user);
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

var staticdata = {
        id:user,
        userinfo: {}
}; //
//Get static info...

//Get the Referer URL the User clicked to get her
var referrer = function(){
  if(document.referrer==''){
    return "Direct Link";
  }
  return document.referrer;
}
console.log(referrer());

staticdata.userinfo.referrer=referrer();

//Get the User's Browser
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
console.log(browser());

staticdata.userinfo.browser=browser();

var w = window.outerWidth;
var h = window.outerHeight;

staticdata.userinfo.screen={"width":w,"height":h};
//Obtain info on the IP address
var API_CALL = "http://api.ipstack.com/check?access_key=890a6742c955390a7e8678ce0f6bde5a&hostname=1";
var ipstackResponse;
//staticdata.userinfo.ipstacktrace=ipTrack();

//console.log(staticdata);

//send static data from DB HERE
//send data to the DB
function sendstaticData(){
  var xml = new XMLHttpRequest();
  xml.open("POST", "/static");
  //xml.onreadystatechange = handle_res_post;

  xml.send(JSON.stringify(staticdata));
}

function ipTrack(){
var responseArray = [];
fetch(API_CALL)
    .then(res => res.json())
    .then(data => ipstackResponse = data)
    .then(() => responseArray.push(ipstackResponse))
    .then(()=> staticdata.userinfo.ipstacktrace = responseArray)
    .then(()=> sendstaticData())
return responseArray
}

//console.log();
ipTrack();



//********************************************

//this is a cache of session data that is sent to the db for storage periodicaly
var sessiondata = {
    id:user,
    session : {},
}

//some global vars because its easy to use
var keylogger = []; //key logger array
var timespent = 0; //time spent on site
var buttoninfo = []; //button click info
var heatmap_data; //mouse tracking info


window.onload = function() {

        //update the timerevery second (1000 ms)
        var updateTimer = setInterval(myTimer, 1000);

        function myTimer() {
            timespent+=1000;
            console.log("You have been one this site for "+ timespent/1000 + " seconds");
        }

      //keep track of the users key presses
      document.onkeypress=function(e){
        keylogger.push(e.key);
      }


      //function that sets dynamic listeners
      function setButtonListeners(){
        var buttons = document.getElementsByClassName("clickcounter");
        for(var i=0; i< buttons.length; i++) {
            buttons[i].addEventListener("click", bindClick(i));
            buttoninfo.push({"clicks":0, "time":"Never"});
          }
      }

        function bindClick(i) {
           return function(){
                    buttoninfo[i].clicks+=1; //incriment clicks
                    buttoninfo[i].time=timespent; //update the time button was clicked
                    //console.log(buttoninfo);
                    //console.log("you clicked region number " + i + ",  "+ buttoninfo[i]+ " times! At time: "+timespent/1000+" seconds");
                  };
        }

      setButtonListeners();

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
      console.log(heatmap_data);
      heatmapContainer.onmousemove = heatmapContainer.ontouchmove = function(e) {
        // we need preventDefault for the touchmove
        e.preventDefault();
        e.stopImmediatePropagation();
        var x = e.layerX+document.body.scrollLeft;
        var y = e.layerY+document.body.scrollTop;
        if (e.touches) {
          x = e.touches[0].pageX+document.body.scrollLeft;
          y = e.touches[0].pageY+document.body.scrollTop;
        }

        heatmap.addData({ x: x, y: y, value: 1 });
        //mousedata.push({"xy":x+","+y,value:1+getvalue()});

        heatmap_data = heatmap.getData();
        console.log(heatmap_data);
      };

      //make heatmap invisible
      var y = document.getElementsByClassName('heatmap-canvas');
      for(var i =0, il = y.length;i<il;i++){
        y[i].style.display = "none";
      }

      var updatesessiondata = setInterval(cachedata,5000); //every 5 seconds update the local data

      //update session data with the current data
      function cachedata(){
        sessiondata.session.keylog = keylogger;
        sessiondata.session.heatmap = heatmap_data;
        sessiondata.session.buttoninfo = buttoninfo;
        sessiondata.session.timespent = timespent;
      }

      var sendsessiondata = setInterval(sendData,10000); //every 10 seconds send user data to the database
      //send data to the DB
      function sendData(){
        var xml = new XMLHttpRequest();
        xml.open("POST", "/session");
        //xml.onreadystatechange = handle_res_post;
        xml.send(JSON.stringify(sessiondata));
      }



    };
