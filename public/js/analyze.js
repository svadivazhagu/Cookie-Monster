//analyze.js by Daniel Mcdonough & Surya Vadivazhagu

var copyofDB;//array of users
window.onload = function() {
  getData();
  function getData(){
    //  var get = {"data":data}
    //console.log("heoll>");
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
              copyofDB = myArr.response;
              //CHECK IF response was an update response!
      }
    }
  }
  getData();

  function getTableinfo(){
    //var obj =
    for(var i=0;i<copyofDB.length;i++){
      console.log("USER ID: "+copyofDB.id+" IP:");
    }
  }




}
