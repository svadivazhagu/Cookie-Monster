// var info={

//     timeOpened:new Date(),
//     timezone:(new Date()).getTimezoneOffset()/60,

//     pageon(){return window.location.pathname},
//     referrer(){return document.referrer},
//     previousSites(){return history.length},

//     browserName(){return navigator.appName},
//     browserEngine(){return navigator.product},
//     browserVersion1a(){return navigator.appVersion},
//     browserVersion1b(){return navigator.userAgent},
//     browserLanguage(){return navigator.language},
//     browserOnline(){return navigator.onLine},
//     browserPlatform(){return navigator.platform},
//     javaEnabled(){return navigator.javaEnabled()},
//     dataCookiesEnabled(){return navigator.cookieEnabled},
//     dataCookies1(){return document.cookie},
//     dataCookies2(){return decodeURIComponent(document.cookie.split(";"))},
//     dataStorage(){return localStorage},

//     sizeScreenW(){return screen.width},
//     sizeScreenH(){return screen.height},
//     sizeDocW(){return document.clientWidth},
//     sizeDocH(){return document.clientHeight},
//     sizeInW(){return innerWidth},
//     sizeInH(){return innerHeight},
//     sizeAvailW(){return screen.availWidth},
//     sizeAvailH(){return screen.availHeight},
//     scrColorDepth(){return screen.colorDepth},
//     scrPixelDepth(){return screen.pixelDepth},


//     latitude(){return position.coords.latitude},
//     longitude(){return position.coords.longitude},
//     accuracy(){return position.coords.accuracy},
//     altitude(){return position.coords.altitude},
//     altitudeAccuracy(){return position.coords.altitudeAccuracy},
//     heading(){return position.coords.heading},
//     speed(){return position.coords.speed},
//     timestamp(){return position.timestamp},
//     };

    // console.log(info)

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