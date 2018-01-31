

var objectUrl;

$("#audio").on("canplaythrough", function(e){
    console.log("calculating duration");
    var seconds = e.currentTarget.duration;
    var duration = moment.duration(seconds, "seconds");

    var time = "";
    var hours = duration.hours();
    if (hours > 0) { time = hours + ":" ; }

    time = time + duration.minutes() + ":" + duration.seconds();
    $("#duration").text(time);

    URL.revokeObjectURL(objectUrl);
});



function isAppLoaded(mySound, url){
      console.log("ffffffffff");
      var seconds = mySound.duration
      console.log(seconds)
}


$("#file").change(function(e){
    console.log("function");
    var file = e.currentTarget.files[0];
    var songs = e.currentTarget.files;
    var length = songs.length;

    console.log(songs);
//    console.log(length);

    //get maxlength of filename
    var maxlen = 0;
    for(i = 0; i < length; i++){
      if(maxlen < songs[i].name.length){
        maxlen = songs[i].name.length
      }
    }
//    console.log("maxlen:",maxlen)
  var count = 1;
    var tl = "<br>";
    for(i = 0; i < length; i++){
        var filename = songs[i].name;
        var n = 0
        n = songs[i].name.lastIndexOf(".")
        filename = filename.substr(0, filename.lastIndexOf("."))
        var current_len = filename.length;
        tl = tl + filename
        //fill in space to match up times
  //      console.log("current len:", current_len, " | maxlen: ", maxlen)
        while(current_len < maxlen){                                          //fix making ti look nice
    //      console.log("adding x, current_len = ", current_len)
          tl = tl + "_"
          current_len = current_len + 1
        }
        var seconds;


        objectURL = URL.createObjectURL(songs[i]);
        mySound = new Audio([objectURL])

        mySound.addEventListener('loadedmetadata', function()  { //, false);

          seconds = mySound.duration;
          console.log("playing["+i+"] "+ seconds)

            tl = tl + seconds
        });




        tl = tl + seconds

        tl = tl + "<br>"
    }


    $("#filename").text(file.name);
    $("#filetype").text(file.type);
    $("#filesize").text(file.size);

//    var tl = "<br> 1. bungo - 0:00 - 8:52";
//    tl = tl + "<br>"
//    tl = tl + "2. tungi";
    $("#tracklist").html(tl);
//  $("#tracklist").text(tl);


    objectUrl = URL.createObjectURL(file);
    $("#audio").prop("src", objectUrl);
        console.log("end of file.change");
});
